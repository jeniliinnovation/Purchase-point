import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Mail, User, Clock, Trash2, Shield, Inbox as InboxIcon } from 'lucide-react';

const InboxView = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const rolePath = user.role === 'admin' ? 'admin' : (user.role === 'buyer' ? 'buyer' : 'seller');
        const response = await fetch(`${import.meta.env.VITE_API_URL}/${rolePath}/inbox`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        const data = await response.json();
        setMessages(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Fetch failed');
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this communication node?')) return;
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const rolePath = user.role === 'admin' ? 'admin' : (user.role === 'buyer' ? 'buyer' : 'seller');
      await fetch(`${import.meta.env.VITE_API_URL}/${rolePath}/message/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      setMessages(messages.filter(m => m.id !== id));
      if (selectedMessage?.id === id) setSelectedMessage(null);
    } catch (err) {
      console.error('Delete failed');
    }
  };

  return (
    <div className="p-4 md:p-8 lg:ml-64 min-h-[calc(100vh-80px)] bg-gray-50/50 flex flex-col gap-8 transition-all">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-upwork-dark tracking-tight uppercase">System Inbox</h1>
          <p className="text-gray-500 font-medium text-sm">Global communication and notification logs.</p>
        </div>
        <div className="flex gap-4 w-full sm:w-auto">
           <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-upwork-dark hover:bg-gray-50 transition-all shadow-sm">
             <Shield size={16} /> Broadcast
           </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 h-auto lg:h-[650px]">
        {/* List */}
        <div className={`w-full lg:w-1/2 bg-white rounded-[2rem] md:rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col ${selectedMessage ? 'hidden lg:flex' : 'flex'}`}>
          <div className="p-6 border-b border-gray-50">
             <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input className="w-full bg-gray-50 border-none rounded-xl py-2 pl-10 pr-4 text-xs font-medium outline-none" placeholder="Search communications..." />
             </div>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-gray-50 max-h-[500px] lg:max-h-none">
            {messages.map((m, i) => (
              <div 
                key={m.id || i}
                onClick={() => setSelectedMessage(m)}
                className={`p-6 cursor-pointer transition-all hover:bg-gray-50 flex gap-4 ${selectedMessage?.id === m.id ? 'bg-upwork-green/5 border-l-4 border-upwork-green' : ''}`}
              >
                <div className={`w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center ${m.type === 'system' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'}`}>
                   {m.type === 'system' ? <Shield size={20} /> : <User size={20} />}
                </div>
                <div className="flex-1 min-w-0">
                   <div className="flex justify-between items-start">
                      <p className="text-sm font-black text-upwork-dark uppercase tracking-tight truncate">{m.subject}</p>
                      <span className="text-[10px] font-bold text-gray-400 flex-shrink-0">{new Date(m.createdAt).toLocaleDateString()}</span>
                   </div>
                   <p className="text-xs text-gray-400 truncate mt-1">{m.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View */}
        <div className={`w-full lg:w-1/2 bg-white rounded-[2rem] md:rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col min-h-[400px] lg:min-h-0 ${!selectedMessage ? 'hidden lg:flex' : 'flex'}`}>
           {selectedMessage ? (
             <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               className="p-6 md:p-10 flex flex-col h-full"
             >
                <div className="flex justify-between items-start mb-6 md:mb-10">
                   <div className="flex gap-4">
                      <div className="w-12 h-12 md:w-14 md:h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-upwork-dark flex-shrink-0">
                         <User size={24} />
                      </div>
                      <div className="min-w-0">
                         <p className="text-base md:text-lg font-black text-upwork-dark uppercase truncate">{selectedMessage.sender_id}</p>
                         <p className="text-[10px] font-black text-upwork-green uppercase tracking-widest truncate">To: {selectedMessage.receiver_id}</p>
                      </div>
                   </div>
                   <div className="flex gap-2">
                     <button 
                      onClick={() => setSelectedMessage(null)}
                      className="lg:hidden p-3 bg-gray-50 text-gray-500 rounded-xl"
                     >
                       <Mail size={20} />
                     </button>
                     <button 
                      onClick={() => handleDelete(selectedMessage.id)}
                      className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-all"
                     >
                        <Trash2 size={20} />
                     </button>
                   </div>
                </div>
                <div className="flex-1">
                   <h2 className="text-xl md:text-2xl font-black text-upwork-dark uppercase tracking-tight mb-4">{selectedMessage.subject}</h2>
                   <div className="prose prose-sm text-gray-500 font-medium leading-relaxed max-w-none">
                      {selectedMessage.content}
                   </div>
                </div>
                <div className="pt-8 border-t border-gray-50 mt-auto flex items-center gap-2 text-gray-400">
                   <Clock size={14} />
                   <span className="text-[10px] font-bold uppercase tracking-widest">Logged at {new Date(selectedMessage.createdAt).toLocaleTimeString()}</span>
                </div>
             </motion.div>
           ) : (
             <div className="h-full flex flex-col items-center justify-center p-12 text-center gap-4">
                <div className="w-20 h-20 bg-gray-50 rounded-[2rem] flex items-center justify-center text-gray-200">
                   <InboxIcon size={40} />
                </div>
                <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Select a communication node to inspect.</p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default InboxView;
