import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Calendar, DollarSign, Package, Loader2, ArrowRight } from 'lucide-react';

const BuyerAwardsView = () => {
  const [awards, setAwards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAwards = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/buyer/awards`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        const data = await response.json();
        setAwards(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Fetch awards failed');
      } finally {
        setLoading(false);
      }
    };
    fetchAwards();
  }, []);

  if (loading) return (
    <div className="p-8 lg:ml-64 h-[calc(100vh-80px)] flex flex-col items-center justify-center space-y-4">
      <Loader2 className="w-8 h-8 text-upwork-green animate-spin" />
      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Fetching Winning Bids...</p>
    </div>
  );

  return (
    <div className="p-8 space-y-8 lg:ml-64 min-h-[calc(100vh-80px)] bg-gray-50/50">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-upwork-dark tracking-tight uppercase">Awards & Bids</h1>
          <p className="text-gray-500 font-medium">Tracking your awarded contracts and successful vendor engagements.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence>
          {awards.map((award, i) => (
            <motion.div 
              key={award.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 rounded-2xl bg-upwork-green/10 flex items-center justify-center text-upwork-green">
                  <Trophy size={24} />
                </div>
                <div className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-[9px] font-black uppercase tracking-widest">
                  Confirmed
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Contracted Product</p>
                  <h3 className="text-lg font-black text-upwork-dark uppercase leading-tight group-hover:text-upwork-green transition-colors">{award.RFQ?.title || 'Industrial Supply'}</h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-2xl">
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Unit Price</p>
                    <p className="text-sm font-black text-upwork-dark">${parseFloat(award.unit_price).toLocaleString()}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-2xl">
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Lead Time</p>
                    <p className="text-sm font-black text-upwork-dark">{award.delivery_days} Days</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-4 border-t border-gray-50 text-gray-500">
                  <Package size={14} className="text-gray-300" />
                  <span className="text-xs font-bold uppercase tracking-tight">Vendor: {award.seller?.name || 'Authorized Partner'}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {awards.length === 0 && (
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-[2rem] flex items-center justify-center text-gray-300 mb-6">
            <Trophy size={40} />
          </div>
          <h2 className="text-xl font-black text-upwork-dark uppercase tracking-tight">No Awards Yet</h2>
          <p className="text-gray-500 font-medium max-w-xs mx-auto mt-2 italic">When you accept a bid in the RFQ manager, it will appear here as a secured contract.</p>
        </div>
      )}
    </div>
  );
};

export default BuyerAwardsView;
