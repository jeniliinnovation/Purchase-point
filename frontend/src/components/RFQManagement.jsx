import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  Tag,
  Calendar,
  Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import RFQDetailView from './RFQDetailView';

const RFQManagement = () => {
  const [rfqs, setRfqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRfq, setSelectedRfq] = useState(null);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`${import.meta.env.VITE_API_URL}/admin/rfq/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      setRfqs(rfqs.map(r => r.id === id ? { ...r, status: newStatus } : r));
    } catch (err) {
      console.error('Update failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to decommission this RFQ block?')) return;
    try {
      const token = localStorage.getItem('token');
      await fetch(`${import.meta.env.VITE_API_URL}/admin/rfq/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setRfqs(rfqs.filter(r => r.id !== id));
    } catch (err) {
      console.error('Delete failed');
    }
  };

  useEffect(() => {
    let intervalId;
    const fetchRfqs = async () => {
      try {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const role = user.role || 'admin';
        const response = await fetch(`${import.meta.env.VITE_API_URL}/${role}/rfqs`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setRfqs(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error('Error fetching RFQs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRfqs();
    // Real-time polling every 5 seconds
    intervalId = setInterval(fetchRfqs, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'bg-upwork-green/10 text-upwork-green border-upwork-green/20';
      case 'awarded': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'closed': return 'bg-gray-100 text-gray-500 border-gray-200';
      case 'cancelled': return 'bg-red-50 text-red-600 border-red-100';
      default: return 'bg-gray-50 text-gray-600 border-gray-100';
    }
  };

  if (loading) return (
    <div className="p-8 lg:ml-64 min-h-[calc(100vh-80px)] flex flex-col items-center justify-center space-y-4">
      <Loader2 className="w-12 h-12 text-upwork-green animate-spin" />
      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Scanning RFQ Registry...</p>
    </div>
  );

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const role = user.role || 'admin';

  if (selectedRfq) {
    return <RFQDetailView rfq={selectedRfq} onBack={() => setSelectedRfq(null)} />;
  }

  return (
    <div className="p-4 md:p-8 space-y-8 lg:ml-64 min-h-[calc(100vh-80px)] bg-gray-50/50 transition-all">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-black text-upwork-dark tracking-tight uppercase leading-tight">
            {role === 'buyer' ? 'My RFQs' : 'RFQ Registry'}
          </h1>
          <p className="text-gray-500 font-medium text-sm md:text-base">
            {role === 'buyer' ? 'Overview of your industrial requirements.' : 'Mapping of global industrial requirements.'}
          </p>
        </div>
        <div className="flex gap-3 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text"
              placeholder="Search ID or Category..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-xl text-sm font-medium focus:border-upwork-green/30 outline-none transition-all shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="p-3 bg-white border border-gray-100 rounded-xl text-upwork-dark hover:bg-gray-50 transition-all shadow-sm active:scale-95">
            <Filter size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rfqs.map((rfq) => (
          <motion.div 
            key={rfq.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-upwork-dark group-hover:bg-upwork-dark group-hover:text-white transition-all">
                <FileText size={22} />
              </div>
              <div className="flex flex-col items-end gap-2">
                <select 
                  value={rfq.status}
                  onChange={(e) => handleStatusUpdate(rfq.id, e.target.value)}
                  className={`px-3 py-1.5 rounded-lg border text-[8px] font-black uppercase tracking-widest outline-none cursor-pointer ${getStatusColor(rfq.status)}`}
                >
                  <option value="open">Open</option>
                  <option value="awarded">Awarded</option>
                  <option value="closed">Closed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <button 
                  onClick={() => handleDelete(rfq.id)}
                  className="p-1.5 text-gray-300 hover:text-red-500 transition-colors"
                >
                  <AlertCircle size={14} />
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-[10px] font-black text-upwork-green uppercase tracking-widest">{rfq.rfq_number || `RFQ-TEMP-${rfq.id}`}</p>
                <h3 className="text-xl font-black text-upwork-dark uppercase tracking-tight group-hover:text-upwork-green transition-colors leading-tight">
                  {rfq.title}
                </h3>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-50 rounded-lg text-[9px] font-bold text-gray-500 uppercase">
                  <Tag size={12} /> {rfq.category || 'N/A'}
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-50 rounded-lg text-[9px] font-bold text-gray-500 uppercase">
                  <Calendar size={12} /> {rfq.deadline ? new Date(rfq.deadline).toLocaleDateString() : 'No Date'}
                </div>
              </div>

              <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-upwork-green/10 flex items-center justify-center">
                    <Layers size={12} className="text-upwork-green" />
                  </div>
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Global Protocol</span>
                </div>
                <button 
                  onClick={() => setSelectedRfq(rfq)}
                  className="text-[10px] font-black uppercase tracking-widest text-upwork-dark hover:text-upwork-green transition-all"
                >
                  Inspect Spec
                </button>
              </div>
            </div>
          </motion.div>
        ))}
        {rfqs.length === 0 && (
          <div className="lg:col-span-3 py-20 text-center bg-white rounded-[3rem] border border-gray-100 border-dashed">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.3em]">No RFQ nodes synchronized.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RFQManagement;


