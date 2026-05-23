import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, FileText, Tag, Calendar, DollarSign, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const SubmitBidView = ({ prefillRFQ, setActiveTab }) => {
  const [rfqs, setRfqs] = useState([]);
  const [formData, setFormData] = useState({
    rfq_id: prefillRFQ?.id || '',
    unit_price: '',
    delivery_days: '',
    nre_cost: '',
    terms: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null); // { success: bool, message: string }

  useEffect(() => {
    const fetchOpenRFQs = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${import.meta.env.VITE_API_URL}/seller/rfqs`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) setRfqs(await res.json());
      } catch (e) { console.error(e); }
    };
    fetchOpenRFQs();
  }, []);

  useEffect(() => {
    if (prefillRFQ) {
      setFormData(prev => ({ ...prev, rfq_id: prefillRFQ.id }));
    }
  }, [prefillRFQ]);

  const handleChange = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async () => {
    if (!formData.rfq_id || !formData.unit_price || !formData.delivery_days) {
      setResult({ success: false, message: 'Please fill in RFQ, unit price and delivery days.' });
      return;
    }
    setSubmitting(true);
    setResult(null);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_URL}/seller/bid`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          rfq_id: formData.rfq_id,
          unit_price: parseFloat(formData.unit_price),
          delivery_days: parseInt(formData.delivery_days),
          nre_cost: parseFloat(formData.nre_cost) || 0,
          terms: formData.terms
        })
      });
      const data = await res.json();
      if (res.ok) {
        setResult({ success: true, message: 'Bid submitted successfully! Navigate to My Bids to track status.' });
        setFormData({ rfq_id: '', unit_price: '', delivery_days: '', nre_cost: '', terms: '' });
      } else {
        setResult({ success: false, message: data.error || 'Failed to submit bid.' });
      }
    } catch (e) {
      setResult({ success: false, message: 'Network error. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  const selectedRFQ = rfqs.find(r => r.id == formData.rfq_id);

  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8 lg:ml-64 min-h-[calc(100vh-80px)] bg-gray-50/50 max-w-5xl mx-auto transition-all">
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-upwork-dark tracking-tight uppercase leading-tight">Submit Strategic Bid</h1>
        <p className="text-gray-500 font-medium text-sm md:text-base">Place your quotation on an open contract. Buyers review all submitted nodes.</p>
      </div>

      {result && (
        <div className={`flex items-center gap-3 p-4 rounded-2xl ${result.success ? 'bg-upwork-green/10 border border-upwork-green/20 text-upwork-green' : 'bg-red-50 border border-red-100 text-red-600'}`}>
          {result.success ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          <p className="text-xs font-bold">{result.message}</p>
        </div>
      )}

      <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
        <h3 className="text-sm font-black text-upwork-dark uppercase tracking-widest pb-4 border-b border-gray-50 flex items-center gap-2">
          <FileText size={18} className="text-upwork-green" /> Select RFQ Contract
        </h3>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Choose Open RFQ</label>
          <select
            value={formData.rfq_id}
            onChange={e => handleChange('rfq_id', e.target.value)}
            className="w-full bg-gray-50 border border-transparent rounded-xl px-4 py-3 text-sm font-medium focus:bg-white focus:border-upwork-green/30 outline-none transition-all"
          >
            <option value="">-- Select an RFQ --</option>
            {rfqs.map(rfq => (
              <option key={rfq.id} value={rfq.id}>{rfq.rfq_number || `PP-RFQ-${rfq.id}`} — {rfq.title}</option>
            ))}
          </select>
        </div>

        {selectedRFQ && (
          <div className="p-4 bg-upwork-green/5 rounded-2xl border border-upwork-green/10 space-y-2">
            <div className="flex gap-4 flex-wrap">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-upwork-dark uppercase"><Tag size={12} />{selectedRFQ.category || 'General'}</div>
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-upwork-dark uppercase"><Calendar size={12} />{selectedRFQ.deadline ? new Date(selectedRFQ.deadline).toLocaleDateString() : 'Open-ended'}</div>
            </div>
            {selectedRFQ.description && <p className="text-xs text-gray-500 font-medium">{selectedRFQ.description}</p>}
          </div>
        )}
      </div>

      <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
        <h3 className="text-sm font-black text-upwork-dark uppercase tracking-widest pb-4 border-b border-gray-50 flex items-center gap-2">
          <DollarSign size={18} className="text-blue-500" /> Pricing & Terms
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Unit Price ($) *</label>
            <input
              type="number" min="0" step="0.01"
              placeholder="e.g. 12.50"
              value={formData.unit_price}
              onChange={e => handleChange('unit_price', e.target.value)}
              className="w-full bg-gray-50 border border-transparent rounded-xl px-4 py-3 text-sm font-medium focus:bg-white focus:border-upwork-green/30 outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Delivery Days *</label>
            <input
              type="number" min="1"
              placeholder="e.g. 14"
              value={formData.delivery_days}
              onChange={e => handleChange('delivery_days', e.target.value)}
              className="w-full bg-gray-50 border border-transparent rounded-xl px-4 py-3 text-sm font-medium focus:bg-white focus:border-upwork-green/30 outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">NRE Cost ($)</label>
            <input
              type="number" min="0" step="0.01"
              placeholder="e.g. 500 (optional)"
              value={formData.nre_cost}
              onChange={e => handleChange('nre_cost', e.target.value)}
              className="w-full bg-gray-50 border border-transparent rounded-xl px-4 py-3 text-sm font-medium focus:bg-white focus:border-upwork-green/30 outline-none transition-all"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Terms & Conditions</label>
          <textarea
            rows={4}
            placeholder="Describe payment terms, warranty, packaging standards, etc..."
            value={formData.terms}
            onChange={e => handleChange('terms', e.target.value)}
            className="w-full bg-gray-50 border border-transparent rounded-2xl px-4 py-3 text-sm font-medium focus:bg-white focus:border-upwork-green/30 outline-none transition-all resize-none"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-end gap-4 pb-12">
        <button
          onClick={() => setActiveTab && setActiveTab('open_rfqs')}
          className="order-2 sm:order-1 px-8 py-4 bg-white border border-gray-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-upwork-dark hover:bg-gray-50 transition-all shadow-sm"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className={`order-1 sm:order-2 flex items-center justify-center gap-2 px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-xl text-white ${submitting ? 'bg-gray-400' : 'bg-upwork-green hover:bg-upwork-dark shadow-upwork-green/20'} active:scale-95`}
        >
          <Send size={16} /> {submitting ? 'Submitting...' : 'Submit Bid'}
        </button>
      </div>
    </div>
  );
};

export default SubmitBidView;
