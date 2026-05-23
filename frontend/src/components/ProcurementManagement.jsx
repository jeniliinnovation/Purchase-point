import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ShoppingCart, Calendar, CheckCircle, XCircle, MoreVertical, DollarSign, Loader2, FileText, User } from 'lucide-react';

const ProcurementManagement = () => {
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchQuotations = async () => {
    try {
      const response = await fetch('https://pp-backend-5mni.onrender.com/api/admin/quotations', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await response.json();
      setQuotations(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Fetch failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotations();
  }, []);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const response = await fetch(`https://pp-backend-5mni.onrender.com/api/admin/quotation/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (response.ok) {
        fetchQuotations();
      }
    } catch (err) {
      console.error('Update failed');
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'accepted': return 'bg-upwork-green text-white';
      case 'rejected': return 'bg-red-500 text-white';
      case 'pending': return 'bg-amber-400 text-white';
      default: return 'bg-gray-400 text-white';
    }
  };

  const filteredQuotations = quotations.filter(q => 
    q.id.toString().includes(searchTerm) || 
    q.status.includes(searchTerm.toLowerCase()) ||
    q.RFQ?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.seller?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading && quotations.length === 0) {
    return (
      <div className="p-8 lg:ml-64 h-[calc(100vh-80px)] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-8 h-8 text-upwork-green animate-spin" />
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Synchronizing Procurement Nodes...</p>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8 lg:ml-64 min-h-[calc(100vh-80px)] bg-gray-50/50">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-upwork-dark tracking-tight uppercase">Procurement Registry</h1>
          <p className="text-gray-500 font-medium italic">Managing industrial bid allocations and vendor lifecycle.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text"
              placeholder="Search Bid ID, Vendor, or RFQ..."
              className="bg-white border border-gray-100 rounded-xl py-2.5 pl-12 pr-4 text-xs font-medium outline-none focus:ring-2 focus:ring-upwork-green/20 min-w-[320px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Registry Table */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-50">
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Quotation Identity</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Sourcing RFQ</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Financial Node</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Phase</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <AnimatePresence mode="popLayout">
                {filteredQuotations.map((q, i) => (
                  <motion.tr 
                    key={q.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="hover:bg-gray-50/80 transition-all group"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-upwork-dark shadow-sm">
                          <FileText size={18} />
                        </div>
                        <div>
                          <p className="text-sm font-black text-upwork-dark uppercase tracking-tight">#Q-{q.id.toString().padStart(6, '0')}</p>
                          <div className="flex items-center gap-1 mt-0.5">
                            <User size={10} className="text-gray-400" />
                            <p className="text-[10px] text-gray-400 font-bold uppercase">{q.seller?.name || 'Partner Entity'}</p>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                       <div className="max-w-[200px]">
                          <p className="text-xs font-black text-gray-600 uppercase tracking-tight truncate">{q.RFQ?.title || 'Standalone Bid'}</p>
                          <p className="text-[10px] text-gray-400 font-medium italic">Ref: {q.RFQ?.rfq_number || 'N/A'}</p>
                       </div>
                    </td>
                    <td className="px-8 py-6">
                       <div className="flex flex-col">
                          <span className="text-sm font-black text-upwork-dark">${parseFloat(q.unit_price).toLocaleString()}</span>
                          <span className="text-[9px] text-[#14a800] font-black uppercase tracking-tighter">{q.delivery_days} Day Delivery</span>
                       </div>
                    </td>
                    <td className="px-8 py-6">
                       <div className="flex items-center gap-2">
                          <div className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${getStatusStyle(q.status)}`}>
                             {q.status}
                          </div>
                       </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {q.status === 'pending' && (
                          <>
                            <button 
                              onClick={() => handleStatusUpdate(q.id, 'accepted')}
                              className="p-2 bg-green-50 text-[#14a800] rounded-lg hover:bg-green-100 transition-colors"
                              title="Award Contract"
                            >
                              <CheckCircle size={16} />
                            </button>
                            <button 
                              onClick={() => handleStatusUpdate(q.id, 'rejected')}
                              className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors"
                              title="Decline Bid"
                            >
                              <XCircle size={16} />
                            </button>
                          </>
                        )}
                        <button className="p-2 text-gray-300 hover:text-upwork-dark transition-colors">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          {filteredQuotations.length === 0 && !loading && (
            <div className="p-20 text-center">
              <ShoppingCart size={48} className="mx-auto text-gray-100 mb-4" />
              <p className="text-xs text-gray-400 font-black uppercase tracking-[0.3em]">No procurement entries detected</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProcurementManagement;
