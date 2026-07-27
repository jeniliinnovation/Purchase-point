import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area
} from 'recharts';
import { 
  ArrowLeft, Package, DollarSign, Layers, 
  TrendingUp, Activity, ShieldCheck, Warehouse,
  AlertTriangle, CheckCircle2, MoreVertical, Edit3,
  History, Users
} from 'lucide-react';

const SingleProductView = ({ productId, onBack }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock data for analytics
  const priceHistory = [
    { month: 'Jan', price: 1200 },
    { month: 'Feb', price: 1150 },
    { month: 'Mar', price: 1300 },
    { month: 'Apr', price: 1250 },
    { month: 'May', price: 1280 },
    { month: 'Jun', price: 1250 }
  ];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://purchase-point.jenili.in/api/products/${productId}`);
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        console.error('Fetch failed');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  if (loading) return (
    <div className="p-8 lg:ml-64 h-[calc(100vh-80px)] flex items-center justify-center">
      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Loading Product Intelligence Hub...</p>
    </div>
  );

  if (!product) return null;

  return (
    <div className="p-8 lg:ml-64 min-h-[calc(100vh-80px)] bg-gray-50/50 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-upwork-dark transition-all font-bold uppercase text-[10px] tracking-widest group"
        >
          <div className="p-2 bg-white rounded-lg shadow-sm group-hover:bg-upwork-green/10 group-hover:text-upwork-green transition-all">
            <ArrowLeft size={16} />
          </div>
          Global Registry catalog
        </button>
        <div className="flex gap-4">
           <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-upwork-dark hover:bg-gray-50 transition-all">
             <Edit3 size={16} /> Modify Specs
           </button>
           <button className="flex items-center gap-2 px-6 py-3 bg-upwork-dark text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-upwork-green transition-all shadow-xl">
             Inventory Release
           </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left: Product Info Card */}
        <div className="lg:col-span-1 space-y-8">
           <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-8">
              <div className="w-full aspect-square bg-gray-50 rounded-[2.5rem] flex items-center justify-center relative overflow-hidden group">
                 <Package size={80} className="text-gray-200 group-hover:scale-110 transition-transform duration-500" />
                 <div className="absolute top-6 right-6">
                    <span className="px-4 py-1.5 bg-upwork-green text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">In Stock</span>
                 </div>
              </div>
              <div className="space-y-2">
                 <p className="text-[10px] font-black text-upwork-green uppercase tracking-[0.3em]">SKU: PP-UNIT-{product.id}</p>
                 <h1 className="text-3xl font-black text-upwork-dark uppercase tracking-tight leading-tight">{product.name}</h1>
                 <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">{product.category} Series</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="p-6 bg-gray-50 rounded-2xl">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Unit Price</p>
                    <p className="text-xl font-black text-upwork-dark">${product.price}</p>
                 </div>
                 <div className="p-6 bg-gray-50 rounded-2xl">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Current Stock</p>
                    <p className="text-xl font-black text-upwork-dark">{product.stock}</p>
                 </div>
              </div>
           </div>

           {/* Quick Analytics Graph */}
           <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                 <h3 className="text-xs font-black text-upwork-dark uppercase tracking-widest flex items-center gap-2">
                   <History size={16} className="text-upwork-green" /> Price Trend
                 </h3>
              </div>
              <div className="h-[150px]">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={priceHistory}>
                       <defs>
                          <linearGradient id="popPrice" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#14a800" stopOpacity={0.2}/>
                             <stop offset="95%" stopColor="#14a800" stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <Area type="monotone" dataKey="price" stroke="#14a800" fill="url(#popPrice)" strokeWidth={3} />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>
           </div>
        </div>

        {/* Right: Technical Details & Metrics */}
        <div className="lg:col-span-2 space-y-8">
           {/* Summary Stats */}
           <div className="grid md:grid-cols-3 gap-6">
              {[
                { label: 'Demand Index', value: 'High', icon: TrendingUp, color: 'emerald' },
                { label: 'Quality Score', value: '98.5%', icon: ShieldCheck, color: 'blue' },
                { label: 'Avg Lead Time', value: '4 Days', icon: Activity, color: 'indigo' }
              ].map((stat, i) => (
                <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center gap-6">
                   <div className={`w-12 h-12 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center shrink-0`}>
                      <stat.icon size={22} />
                   </div>
                   <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">{stat.label}</p>
                      <p className="text-lg font-black text-upwork-dark">{stat.value}</p>
                   </div>
                </div>
              ))}
           </div>

           {/* Description */}
           <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-6">
              <h3 className="text-xl font-black text-upwork-dark uppercase tracking-tight border-b border-gray-50 pb-6 flex items-center gap-3">
                <Layers size={20} className="text-upwork-green" /> Technical Specifications
              </h3>
              <p className="text-gray-500 font-medium leading-relaxed">
                {product.description || "This industrial-grade component is localized for high-performance deployment across global manufacturing matrices. Engineered with precision standards to ensure interoperability and operational excellence."}
              </p>
              <div className="grid md:grid-cols-2 gap-8 pt-4">
                 <div className="flex gap-4 items-start">
                    <Warehouse className="text-gray-300 mt-1" size={20} />
                    <div>
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Stock Node</p>
                       <p className="text-sm font-bold text-upwork-dark">Central Distribution Matrix A1</p>
                    </div>
                 </div>
                 <div className="flex gap-4 items-start">
                    <CheckCircle2 className="text-gray-300 mt-1" size={20} />
                    <div>
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Certification</p>
                       <p className="text-sm font-bold text-upwork-dark">ISO-9001 Industrial Standard</p>
                    </div>
                 </div>
              </div>
           </div>

           {/* Supplier Performance for this product */}
           <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-8">
              <div className="flex justify-between items-center">
                 <h3 className="text-xl font-black text-upwork-dark uppercase tracking-tight flex items-center gap-3">
                   <Users size={20} className="text-blue-500" /> Supplier Benchmarking
                 </h3>
                 <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Live Competitive Data</span>
              </div>
              <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead>
                       <tr className="border-b border-gray-50">
                          <th className="pb-4 text-[10px] font-black text-gray-300 uppercase tracking-widest">Supplier Entity</th>
                          <th className="pb-4 text-[10px] font-black text-gray-300 uppercase tracking-widest">Unit Price</th>
                          <th className="pb-4 text-[10px] font-black text-gray-300 uppercase tracking-widest">Delivery</th>
                          <th className="pb-4 text-[10px] font-black text-gray-300 uppercase tracking-widest text-right">Rating</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                       {[
                         { name: 'Industrial Global', price: '$1,150', time: '3 Days', score: '4.9/5' },
                         { name: 'Matrix Logistics', price: '$1,210', time: '5 Days', score: '4.7/5' },
                         { name: 'Core Parts Inc', price: '$1,190', time: '4 Days', score: '4.8/5' }
                       ].map((s, i) => (
                         <tr key={i} className="group">
                            <td className="py-4 text-sm font-black text-upwork-dark uppercase group-hover:text-upwork-green transition-colors">{s.name}</td>
                            <td className="py-4 text-sm font-bold text-gray-500">{s.price}</td>
                            <td className="py-4 text-sm font-bold text-gray-500">{s.time}</td>
                            <td className="py-4 text-sm font-black text-upwork-dark text-right">{s.score}</td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductView;

