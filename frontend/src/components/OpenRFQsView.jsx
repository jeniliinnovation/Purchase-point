import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Tag, Calendar, Loader2, Send, CheckCircle } from 'lucide-react';

const OpenRFQsView = ({ setActiveTab, setSelectedRFQ }) => {
  const [rfqs, setRfqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submittedIds, setSubmittedIds] = useState(new Set());

  useEffect(() => {
    let id;
    const fetchRFQs = async () => {
      try {
        const token = localStorage.getItem('token');
        const [rfqRes, bidRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/seller/rfqs`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`${import.meta.env.VITE_API_URL}/seller/bids`, { headers: { Authorization: `Bearer ${token}` } })
        ]);
        if (rfqRes.ok) setRfqs(await rfqRes.json());
        if (bidRes.ok) {
          const bids = await bidRes.json();
          setSubmittedIds(new Set(bids.map(b => b.RFQId)));
        }
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    };
    fetchRFQs();
    id = setInterval(fetchRFQs, 5000);
    return () => clearInterval(id);
  }, []);

  const handleBidClick = (rfq) => {
    setSelectedRFQ && setSelectedRFQ(rfq);
    setActiveTab && setActiveTab('submit_bid');
  };

  if (loading) return (
    <div className="p-8 lg:ml-64 min-h-[calc(100vh-80px)] flex items-center justify-center gap-4">
      <Loader2 className="w-10 h-10 text-upwork-green animate-spin" />
      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Fetching Open Contracts...</p>
    </div>
  );

  const getStatusColor = (s) => s === 'open' ? 'bg-upwork-green/10 text-upwork-green border-upwork-green/20' : 'bg-gray-100 text-gray-400 border-gray-200';

  return (
    <div className="p-8 space-y-8 lg:ml-64 min-h-[calc(100vh-80px)] bg-gray-50/50">
      <div>
        <h1 className="text-3xl font-black text-upwork-dark tracking-tight uppercase">Open RFQ Contracts</h1>
        <p className="text-gray-500 font-medium">All active contracts available for bidding. Submit your best price.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rfqs.map((rfq, i) => (
          <motion.div
            key={rfq.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-upwork-dark group-hover:bg-upwork-dark group-hover:text-white transition-all">
                <FileText size={22} />
              </div>
              <span className={`px-3 py-1 rounded-lg border text-[8px] font-black uppercase tracking-widest ${getStatusColor(rfq.status)}`}>
                {rfq.status}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-black text-upwork-green uppercase tracking-widest">{rfq.rfq_number || `PP-RFQ-${rfq.id}`}</p>
                <h3 className="text-xl font-black text-upwork-dark uppercase tracking-tight group-hover:text-upwork-green transition-colors leading-tight mt-1">{rfq.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-50 rounded-lg text-[9px] font-bold text-gray-500 uppercase">
                  <Tag size={12} /> {rfq.category || 'General'}
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-50 rounded-lg text-[9px] font-bold text-gray-500 uppercase">
                  <Calendar size={12} /> {rfq.deadline ? new Date(rfq.deadline).toLocaleDateString() : 'Open Ended'}
                </div>
              </div>

              {rfq.description && (
                <p className="text-xs text-gray-400 font-medium leading-relaxed line-clamp-2">{rfq.description}</p>
              )}

              <div className="pt-4 border-t border-gray-50">
                {submittedIds.has(rfq.id) ? (
                  <div className="flex items-center gap-2 text-upwork-green text-[10px] font-black uppercase tracking-widest">
                    <CheckCircle size={16} /> Bid Submitted
                  </div>
                ) : (
                  <button
                    onClick={() => handleBidClick(rfq)}
                    className="w-full py-3 bg-upwork-dark text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-upwork-green transition-all"
                  >
                    <Send size={14} className="inline mr-2" />Place Bid
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}

        {rfqs.length === 0 && (
          <div className="col-span-3 py-24 text-center bg-white rounded-[3rem] border border-dashed border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.3em]">No open contracts available right now.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OpenRFQsView;
