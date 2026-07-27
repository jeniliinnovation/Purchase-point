import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  FileText, 
  Clock, 
  Tag, 
  Calendar, 
  Layers, 
  CheckCircle,
  AlertCircle,
  FileCheck,
  ShieldCheck,
  Loader2
} from 'lucide-react';

const RFQDetailView = ({ rfq, onBack }) => {
  const [loading, setLoading] = useState(false); // Can be used for fetching extra bids

  if (!rfq) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="p-8 space-y-8 lg:ml-64 min-h-[calc(100vh-80px)] bg-gray-50/50"
    >
      <div className="flex justify-between items-center bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 text-gray-500 hover:bg-upwork-green hover:text-white transition-all shadow-sm"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-black text-upwork-dark tracking-tight uppercase">
                {rfq.title}
              </h1>
              <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                rfq.status === 'open' ? 'bg-upwork-green/10 text-upwork-green border border-upwork-green/20' :
                rfq.status === 'awarded' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                rfq.status === 'closed' ? 'bg-gray-100 text-gray-500 border border-gray-200' :
                'bg-red-50 text-red-600 border border-red-100'
              }`}>
                {rfq.status}
              </span>
            </div>
            <p className="text-gray-400 font-bold text-[11px] uppercase tracking-widest mt-1">
              Internal Ref: {rfq.rfq_number || `PP-RFQ-${rfq.id}`}
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex items-center gap-2 px-6 py-3 bg-gray-50 border border-gray-100 rounded-xl text-xs font-black uppercase tracking-widest text-gray-500 shadow-sm">
             <Clock size={16} /> Created: {new Date(rfq.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Details */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <h3 className="text-sm font-black text-upwork-dark uppercase tracking-widest border-b border-gray-50 pb-4 mb-6 flex items-center gap-2">
               <FileText size={18} className="text-upwork-green" /> Product Specifications
            </h3>
            
            <div className="space-y-6">
               <div>
                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Technical Description</p>
                 <p className="text-sm font-medium text-gray-700 leading-relaxed bg-gray-50 p-6 rounded-2xl border border-transparent">
                   {rfq.description || 'No detailed technical documentation was provided for this asset.'}
                 </p>
               </div>
               
               <div className="grid grid-cols-2 gap-4">
                 <div className="bg-gray-50 p-4 rounded-2xl">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 flex items-center gap-1"><Tag size={12}/> Primary Category</p>
                    <p className="text-lg font-black text-upwork-dark uppercase">{rfq.category || 'Unclassified'}</p>
                 </div>
                 <div className="bg-upwork-green/5 p-4 rounded-2xl border border-upwork-green/10">
                    <p className="text-[10px] font-bold text-upwork-green uppercase tracking-widest mb-1 flex items-center gap-1"><Calendar size={12}/> Deadline Target</p>
                    <p className="text-lg font-black text-upwork-dark uppercase">{rfq.deadline ? new Date(rfq.deadline).toLocaleDateString() : 'Continuous'}</p>
                 </div>
               </div>
            </div>
          </div>

          {/* Dummy Bids/Quotations Section */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
             <div className="flex justify-between items-center border-b border-gray-50 pb-4 mb-6">
                <h3 className="text-sm font-black text-upwork-dark uppercase tracking-widest flex items-center gap-2">
                   <Layers size={18} className="text-blue-500" /> Quotation Tenders
                </h3>
                <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-lg text-[10px] font-black uppercase tracking-widest">0 Active</span>
             </div>
             <div className="py-12 border-2 border-dashed border-gray-100 rounded-3xl flex flex-col items-center justify-center bg-gray-50/30">
               <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-gray-300 shadow-sm mb-4">
                 <AlertCircle size={28} />
               </div>
               <p className="text-xs font-black text-upwork-dark uppercase tracking-widest">No Benders Registered</p>
               <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2 max-w-sm text-center">Bids will automatically populate here once suppliers submit their pricing propositions.</p>
             </div>
          </div>
        </div>

        {/* Right Column - Secondary Specs */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
             <h3 className="text-sm font-black text-upwork-dark uppercase tracking-widest border-b border-gray-50 pb-4 mb-6 flex items-center gap-2">
                <ShieldCheck size={18} className="text-purple-500" /> Compliance Protocols
             </h3>
             <ul className="space-y-4">
               <li className="flex items-start gap-3">
                 <CheckCircle size={16} className="text-upwork-green mt-0.5" />
                 <div>
                   <p className="text-xs font-black text-upwork-dark uppercase">ISO 9001:2015</p>
                   <p className="text-[10px] text-gray-400 font-bold mt-0.5">Quality Management System Required</p>
                 </div>
               </li>
               <li className="flex items-start gap-3">
                 <CheckCircle size={16} className="text-upwork-green mt-0.5" />
                 <div>
                   <p className="text-xs font-black text-upwork-dark uppercase">Tier 1 Supplier</p>
                   <p className="text-[10px] text-gray-400 font-bold mt-0.5">Primary Manufacturing Verification</p>
                 </div>
               </li>
             </ul>
          </div>

          <div className="bg-upwork-dark p-8 rounded-[2.5rem] shadow-xl text-white relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110 duration-500"></div>
             <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                <FileCheck size={18} className="text-upwork-green" /> Contract Actions
             </h3>
             <p className="text-xs text-gray-400 font-bold leading-relaxed mb-6">Administrators can award or suspend this RFQ directly from the registry grid.</p>
             <button className="w-full py-4 border border-white/20 hover:border-upwork-green hover:bg-upwork-green hover:text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all text-white/70">
                Cancel Tender
             </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RFQDetailView;

