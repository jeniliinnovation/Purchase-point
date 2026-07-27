import React, { useState, useEffect } from 'react';
import { Search, Filter, MoreHorizontal, ArrowRight, Download, Loader2, Trash2, X } from 'lucide-react';
import SingleProductView from './SingleProductView';

const CatalogView = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProductId, setSelectedProductId] = useState(null);
  
  // Add Product State
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', category: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (!window.confirm('Confirm product decommissioning from global registry?')) return;
    try {
      const token = localStorage.getItem('token');
      await fetch(`${import.meta.env.VITE_API_URL}/admin/product/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setProducts(products.filter(p => p.id !== id));
    } catch (err) {
      console.error('Delete failed');
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = searchQuery 
          ? `${import.meta.env.VITE_API_URL}/products?search=${encodeURIComponent(searchQuery)}`
          : `${import.meta.env.VITE_API_URL}/products`;
        
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch catalog');
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchProducts, searchQuery ? 500 : 0);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...newProduct,
          price: parseFloat(newProduct.price) || 0
        })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to add product');
      
      setProducts([data, ...products]);
      setIsAddingProduct(false);
      setNewProduct({ name: '', description: '', price: '', category: '' });
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading && products.length === 0) return (
    <div className="p-8 lg:ml-64 h-[calc(100vh-80px)] flex flex-col items-center justify-center space-y-4">
      <Loader2 className="w-12 h-12 text-upwork-green animate-spin" />
      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Synchronizing Catalog...</p>
    </div>
  );

  if (selectedProductId) {
    return <SingleProductView productId={selectedProductId} onBack={() => setSelectedProductId(null)} />;
  }

  return (
    <div className="p-4 md:p-8 space-y-8 lg:ml-64 min-h-[calc(100vh-80px)] bg-gray-50/50 transition-all">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-black text-upwork-dark tracking-tight uppercase leading-tight">Product Catalog</h1>
          <p className="text-gray-500 font-medium text-sm md:text-base">Manage your product inventory and global requests.</p>
        </div>
        <div className="flex flex-wrap gap-3 w-full lg:w-auto">
          <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-black uppercase tracking-widest text-upwork-dark hover:bg-gray-50 transition-all shadow-sm">
            <Download size={16} /> Export
          </button>
          <button 
            onClick={() => setIsAddingProduct(true)}
            className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-upwork-green text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-upwork-dark transition-all shadow-lg active:scale-95"
          >
            Add Product
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] md:rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 md:p-8 border-b border-gray-50 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
          <div className="flex flex-wrap gap-2 md:gap-4 w-full xl:w-auto">
            <button className="flex-1 xl:flex-none px-6 py-2 bg-upwork-green/10 text-upwork-green rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap">All Items</button>
            <button className="flex-1 xl:flex-none px-6 py-2 text-gray-400 hover:text-upwork-dark transition-colors text-[10px] font-black uppercase tracking-widest whitespace-nowrap">In Request</button>
            <button className="flex-1 xl:flex-none px-6 py-2 text-gray-400 hover:text-upwork-dark transition-colors text-[10px] font-black uppercase tracking-widest whitespace-nowrap">Updated</button>
          </div>
          <div className="flex gap-4 w-full xl:w-auto">
            <div className="relative flex-1 xl:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Lookup product..." 
                className="w-full bg-gray-50 border-none rounded-xl py-2.5 pl-10 pr-4 text-xs font-medium outline-none focus:ring-2 focus:ring-upwork-green/10 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="p-2.5 bg-gray-50 text-gray-500 rounded-xl hover:bg-gray-100 transition-colors active:scale-95">
              <Filter size={20} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Product Details</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Category</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Price</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Updated</th>
                <th className="px-8 py-5 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.map((product) => (
                <tr 
                  key={product.id} 
                  className="hover:bg-gray-50/50 transition-colors group cursor-pointer"
                  onClick={() => setSelectedProductId(product.id)}
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center text-upwork-dark font-black uppercase">
                        {product.name?.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-black text-upwork-dark uppercase tracking-tight">{product.name}</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">SKU: PP-2024-{product.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-xs font-bold text-gray-500">{product.category}</span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-sm font-black text-upwork-dark">${product.price}</span>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-green-50 text-green-600`}>
                      Live
                    </span>
                  </td>
                  <td className="px-8 py-6 text-xs font-bold text-gray-400">{new Date(product.updatedAt).toLocaleDateString()}</td>
                  <td className="px-8 py-6 text-right">
                    <button 
                      onClick={(e) => handleDelete(e, product.id)}
                      className="p-2 text-gray-300 hover:text-red-500 transition-colors mr-2"
                    >
                      <Trash2 size={18} />
                    </button>
                    <button className="p-2 text-upwork-green hover:bg-upwork-green/10 rounded-xl transition-all opacity-0 group-hover:opacity-100">
                      <ArrowRight size={20} />
                    </button>
                  </td>
                </tr>
              ))}
              {!products.length && !loading && (
                <tr>
                  <td colSpan="6" className="px-8 py-20 text-center">
                    <p className="text-sm font-black text-gray-300 uppercase tracking-widest">No products found in the industrial registry.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal Overlay */}
      {isAddingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-xl font-black text-upwork-dark uppercase tracking-tight">Add New Product</h2>
              <button onClick={() => setIsAddingProduct(false)} className="p-2 text-gray-400 hover:text-upwork-dark rounded-full hover:bg-white transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto">
              <form onSubmit={handleAddProduct} className="space-y-5">
                {submitError && (
                  <div className="p-4 bg-red-50 text-red-600 rounded-xl text-xs font-bold border border-red-100">
                    {submitError}
                  </div>
                )}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Product Name</label>
                  <input 
                    type="text" 
                    required 
                    value={newProduct.name}
                    onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                    placeholder="e.g. Industrial Valve X45"
                    className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-upwork-green outline-none font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Category</label>
                  <input 
                    type="text" 
                    required 
                    value={newProduct.category}
                    onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                    placeholder="e.g. Mechanical"
                    className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-upwork-green outline-none font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Price (USD)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    min="0"
                    required 
                    value={newProduct.price}
                    onChange={e => setNewProduct({...newProduct, price: e.target.value})}
                    placeholder="0.00"
                    className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-upwork-green outline-none font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Description</label>
                  <textarea 
                    required 
                    rows="3"
                    value={newProduct.description}
                    onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                    placeholder="Product specifications..."
                    className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-upwork-green outline-none font-medium resize-none"
                  />
                </div>
                <div className="pt-4 border-t border-gray-100 flex gap-3">
                  <button 
                    type="button" 
                    onClick={() => setIsAddingProduct(false)}
                    className="flex-1 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-widest text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="flex-[2] py-3 px-4 rounded-xl text-xs font-black uppercase tracking-widest text-white bg-upwork-dark hover:bg-black transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : 'Create Product'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CatalogView;


