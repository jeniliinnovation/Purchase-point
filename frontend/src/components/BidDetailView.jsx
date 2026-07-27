import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft, DollarSign, Clock, FileText, ShieldCheck,
  CheckCircle, XCircle, AlertCircle, Calendar, Tag, Send, Package
} from 'lucide-react';

const statusConfig = (s) => {
  if (s === 'accepted') return { cls: 'bg-upwork-green/10 text-upwork-green border-upwork-green/20', icon: CheckCircle, label: 'Accepted' };
  if (s === 'rejected') return { cls: 'bg-red-50 text-red-600 border-red-100', icon: XCircle, label: 'Rejected' };
  return { cls: 'bg-orange-50 text-orange-500 border-orange-100', icon: AlertCircle, label: 'Pending Review' };
};

const BidDetailView = ({ bid, onBack }) => {
  if (!bid) return null;
  const sc = statusConfig(bid.status);
  const StatusIcon = sc.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="p-8 space-y-8 lg:ml-64 min-h-[calc(100vh-80px)] bg-gray-50/50"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 text-gray-500 hover:bg-upwork-green hover:text-white transition-all"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-2xl font-black text-upwork-dark tracking-tight uppercase">
              {bid.RFQ?.title || 'Bid Detail'}
            </h1>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">
              Ref: {bid.RFQ?.rfq_number || `RFQ-${bid.RFQId}`} â€¢ Submitted: {new Date(bid.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border text-[10px] font-black uppercase tracking-widest ${sc.cls}`}>
          <StatusIcon size={16} /> {sc.label}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left - Bid Financials */}
        <div className="lg:col-span-2 space-y-8">

          {/* Pricing Breakdown */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <h3 className="text-sm font-black text-upwork-dark uppercase tracking-widest pb-4 border-b border-gray-50 mb-6 flex items-center gap-2">
              <DollarSign size={18} className="text-upwork-green" /> Pricing Breakdown
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-upwork-green/5 border border-upwork-green/10 p-5 rounded-2xl text-center">
                <p className="text-[10px] font-bold text-upwork-green uppercase tracking-widest mb-1">Unit Price</p>
                <p className="text-3xl font-black text-upwork-dark">${Number(bid.unit_price).toFixed(2)}</p>
                <p className="text-[9px] text-gray-400 font-bold uppercase mt-1">Per Unit</p>
              </div>
              <div className="bg-gray-50 p-5 rounded-2xl text-center">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">NRE Cost</p>
                <p className="text-3xl font-black text-upwork-dark">${Number(bid.nre_cost || 0).toFixed(2)}</p>
                <p className="text-[9px] text-gray-400 font-bold uppercase mt-1">One-time Setup</p>
              </div>
              <div className="bg-blue-50 p-5 rounded-2xl text-center">
                <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-1">Delivery</p>
                <p className="text-3xl font-black text-upwork-dark">{bid.delivery_days}</p>
                <p className="text-[9px] text-gray-400 font-bold uppercase mt-1">Days Lead Time</p>
              </div>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <h3 className="text-sm font-black text-upwork-dark uppercase tracking-widest pb-4 border-b border-gray-50 mb-6 flex items-center gap-2">
              <FileText size={18} className="text-blue-500" /> Terms & Conditions
            </h3>
            <p className="text-sm font-medium text-gray-600 leading-relaxed bg-gray-50 p-6 rounded-2xl">
              {bid.terms || 'No specific terms were provided for this bid. Standard industrial procurement terms apply.'}
            </p>
          </div>

          {/* RFQ Spec Summary */}
          {bid.RFQ && (
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
              <h3 className="text-sm font-black text-upwork-dark uppercase tracking-widest pb-4 border-b border-gray-50 mb-6 flex items-center gap-2">
                <Package size={18} className="text-purple-500" /> RFQ Specification
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-2xl">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 flex items-center gap-1"><Tag size={11} /> Category</p>
                  <p className="text-lg font-black text-upwork-dark uppercase">{bid.RFQ.category || 'General'}</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-2xl">
                  <p className="text-[10px] font-bold text-orange-400 uppercase tracking-widest mb-1 flex items-center gap-1"><Calendar size={11} /> Deadline</p>
                  <p className="text-lg font-black text-upwork-dark uppercase">{bid.RFQ.deadline ? new Date(bid.RFQ.deadline).toLocaleDateString() : 'Open-ended'}</p>
                </div>
              </div>
              {bid.RFQ.description && (
                <p className="text-sm text-gray-500 font-medium leading-relaxed mt-4 p-4 bg-gray-50 rounded-2xl">{bid.RFQ.description}</p>
              )}
            </div>
          )}
        </div>

        {/* Right â€” Status Timeline */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <h3 className="text-sm font-black text-upwork-dark uppercase tracking-widest mb-6 flex items-center gap-2">
              <ShieldCheck size={18} className="text-upwork-green" /> Bid Timeline
            </h3>
            <ol className="relative border-l border-gray-100 space-y-6 ml-2">
              <li className="ml-6">
                <div className="absolute -left-2 w-4 h-4 bg-upwork-green rounded-full border-2 border-white shadow" />
                <p className="text-[10px] font-black text-upwork-green uppercase tracking-widest">Submitted</p>
                <p className="text-xs font-bold text-upwork-dark mt-0.5">{new Date(bid.createdAt).toLocaleString()}</p>
              </li>
              <li className="ml-6">
                <div className={`absolute -left-2 w-4 h-4 rounded-full border-2 border-white shadow ${bid.status === 'pending' ? 'bg-orange-400' : bid.status === 'accepted' ? 'bg-upwork-green' : 'bg-red-400'}`} />
                <p className={`text-[10px] font-black uppercase tracking-widest ${bid.status === 'accepted' ? 'text-upwork-green' : bid.status === 'rejected' ? 'text-red-500' : 'text-orange-500'}`}>
                  {sc.label}
                </p>
                <p className="text-xs font-bold text-gray-400 mt-0.5">{new Date(bid.updatedAt || bid.createdAt).toLocaleString()}</p>
              </li>
            </ol>
          </div>

          {bid.status === 'accepted' && (
            <div className="bg-upwork-green p-6 rounded-[2.5rem] text-white">
              <CheckCircle size={28} className="mb-3" />
              <h3 className="text-sm font-black uppercase tracking-widest">Bid Accepted!</h3>
              <p className="text-xs font-medium text-white/80 mt-2 leading-relaxed">Congratulations! The buyer has accepted your quotation. Expect a purchase order soon.</p>
            </div>
          )}

          {bid.status === 'rejected' && (
            <div className="bg-red-50 p-6 rounded-[2.5rem] border border-red-100">
              <XCircle size={28} className="text-red-500 mb-3" />
              <h3 className="text-sm font-black text-red-600 uppercase tracking-widest">Bid Rejected</h3>
              <p className="text-xs font-medium text-gray-500 mt-2 leading-relaxed">The buyer selected another supplier. Review your pricing and try again on the next RFQ.</p>
            </div>
          )}

          {bid.status === 'pending' && (
            <div className="bg-orange-50 p-6 rounded-[2.5rem] border border-orange-100">
              <Clock size={28} className="text-orange-400 mb-3" />
              <h3 className="text-sm font-black text-orange-500 uppercase tracking-widest">Under Review</h3>
              <p className="text-xs font-medium text-gray-500 mt-2 leading-relaxed">Your bid is currently being reviewed. You'll be notified once the buyer makes a decision.</p>
            </div>
          )}

          <div className="bg-upwork-dark p-6 rounded-[2.5rem] text-white">
            <Send size={20} className="text-upwork-green mb-3" />
            <p className="text-[10px] font-black text-upwork-green uppercase tracking-widest mb-1">Quick Action</p>
            <p className="text-sm font-black uppercase mb-4">Place another bid</p>
            <button onClick={onBack} className="w-full py-3 bg-upwork-green text-upwork-dark rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-white transition-all">
              Back to My Bids
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BidDetailView;

