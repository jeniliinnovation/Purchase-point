import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, XCircle, DollarSign, Loader2, Calendar, ChevronRight } from 'lucide-react';
import BidDetailView from './BidDetailView';

const statusStyle = (s) => {
  switch (s) {
    case 'accepted': return 'bg-upwork-green/10 text-upwork-green border-upwork-green/20';
    case 'rejected': return 'bg-red-50 text-red-600 border-red-100';
    default: return 'bg-orange-50 text-orange-500 border-orange-100';
  }
};

const statusIcon = (s) => {
  if (s === 'accepted') return <CheckCircle size={14} />;
  if (s === 'rejected') return <XCircle size={14} />;
  return <Clock size={14} />;
};

const MyBidsView = () => {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBid, setSelectedBid] = useState(null);

  useEffect(() => {
    let id;
    const fetchBids = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${import.meta.env.VITE_API_URL}/seller/bids`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) setBids(await res.json());
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    };
    fetchBids();
    id = setInterval(fetchBids, 5000);
    return () => clearInterval(id);
  }, []);

  if (loading) return (
    <div className="p-8 lg:ml-64 min-h-[calc(100vh-80px)] flex items-center justify-center gap-4">
      <Loader2 className="w-10 h-10 text-upwork-green animate-spin" />
    </div>
  );

  if (selectedBid) {
    return <BidDetailView bid={selectedBid} onBack={() => setSelectedBid(null)} />;
  }

  return (
    <div className="p-8 space-y-8 lg:ml-64 min-h-[calc(100vh-80px)] bg-gray-50/50">
      <div>
        <h1 className="text-3xl font-black text-upwork-dark tracking-tight uppercase">My Bids</h1>
        <p className="text-gray-500 font-medium">Track all your submitted quotations. Click any bid to inspect details.</p>
      </div>

      <div className="space-y-4">
        {bids.map((bid, i) => (
          <motion.div
            key={bid.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => setSelectedBid(bid)}
            className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-lg hover:border-upwork-green/20 transition-all cursor-pointer group"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="space-y-1 flex-1">
                <p className="text-[10px] font-black text-upwork-green uppercase tracking-widest">{bid.RFQ?.rfq_number || `RFQ-${bid.RFQId}`}</p>
                <h3 className="text-lg font-black text-upwork-dark uppercase tracking-tight group-hover:text-upwork-green transition-colors">{bid.RFQ?.title || 'Industrial Specification'}</h3>
                <div className="flex flex-wrap gap-3 mt-2">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase">
                    <DollarSign size={12} /> Unit Price: <span className="text-upwork-dark">${Number(bid.unit_price).toFixed(2)}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase">
                    <Clock size={12} /> Delivery: <span className="text-upwork-dark">{bid.delivery_days} days</span>
                  </div>
                  {bid.nre_cost > 0 && (
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase">
                      NRE: <span className="text-upwork-dark">${Number(bid.nre_cost).toFixed(2)}</span>
                    </div>
                  )}
                </div>
                {bid.terms && <p className="text-xs text-gray-400 font-medium mt-2 line-clamp-1">{bid.terms}</p>}
              </div>

              <div className="flex items-center gap-4">
                <div className="flex flex-col items-end gap-3">
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-[10px] font-black uppercase tracking-widest ${statusStyle(bid.status)}`}>
                    {statusIcon(bid.status)} {bid.status}
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase">
                    <Calendar size={12} /> {new Date(bid.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <ChevronRight size={20} className="text-gray-300 group-hover:text-upwork-green transition-colors" />
              </div>
            </div>
          </motion.div>
        ))}

        {bids.length === 0 && (
          <div className="py-24 text-center bg-white rounded-[3rem] border border-dashed border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.3em]">No bids placed yet. Browse Open RFQs and submit your first bid.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBidsView;

