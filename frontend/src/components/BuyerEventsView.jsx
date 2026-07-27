import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Clock, FileText, Package, CheckCircle, ArrowRight, Loader2 } from 'lucide-react';

const BuyerEventsView = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/buyer/events`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        const data = await response.json();
        setEvents(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Fetch events failed');
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) return (
    <div className="p-8 lg:ml-64 h-[calc(100vh-80px)] flex flex-col items-center justify-center space-y-4">
      <Loader2 className="w-8 h-8 text-[#14a800] animate-spin" />
      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Loading Network Logs...</p>
    </div>
  );

  const getIcon = (type) => {
    switch (type) {
      case 'RFQ': return <FileText size={18} className="text-[#14a800]" />;
      case 'ORDER': return <Package size={18} className="text-blue-500" />;
      default: return <Activity size={18} className="text-gray-400" />;
    }
  };

  return (
    <div className="p-8 space-y-8 lg:ml-64 min-h-[calc(100vh-80px)] bg-gray-50/50">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-upwork-dark tracking-tight uppercase">Operational Logs</h1>
          <p className="text-gray-500 font-medium">Real-time pulse of your procurement facility and sourcing nodes.</p>
        </div>
      </div>

      <div className="max-w-4xl space-y-4">
        {events.map((event, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-6 group hover:translate-x-2 transition-all cursor-pointer"
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-gray-50 shadow-sm group-hover:scale-110 transition-transform`}>
              {getIcon(event.type)}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 bg-gray-100 rounded-lg text-gray-500">
                  {event.type} NODE
                </span>
                <span className="text-[10px] font-bold text-gray-400 flex items-center gap-1">
                  <Clock size={10} /> {new Date(event.date).toLocaleString()}
                </span>
              </div>
              <h3 className="text-sm font-black text-upwork-dark uppercase tracking-tight">{event.title}</h3>
            </div>

            <div className="flex items-center gap-4">
               <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                 event.status === 'open' || event.status === 'pending' ? 'bg-amber-50 text-amber-600' : 'bg-green-50 text-green-600'
               }`}>
                 {event.status}
               </div>
               <ArrowRight size={16} className="text-gray-200 group-hover:text-upwork-green transition-colors" />
            </div>
          </motion.div>
        ))}

        {events.length === 0 && (
          <div className="py-20 text-center">
            <Activity size={48} className="mx-auto text-gray-100 mb-4" />
            <p className="text-xs text-gray-400 font-black uppercase tracking-[0.3em]">No operational logs detected</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyerEventsView;

