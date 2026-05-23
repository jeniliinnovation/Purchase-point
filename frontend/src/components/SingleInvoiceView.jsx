import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Download, 
  Printer, 
  Share2, 
  ShieldCheck, 
  Building2, 
  User, 
  Mail, 
  Phone, 
  Loader2, 
  FileText,
  DollarSign,
  Calendar,
  Layers
} from 'lucide-react';

const SingleInvoiceView = ({ invoiceId, onBack }) => {
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/buyer/invoice/${invoiceId}`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
        const data = await response.json();
        setInvoice(data);
      } catch (err) {
        console.error('Fetch invoice failed:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchInvoice();
  }, [invoiceId]);

  if (loading) return (
    <div className="p-8 lg:ml-64 h-[calc(100vh-80px)] flex flex-col items-center justify-center space-y-4 bg-white">
      <Loader2 className="w-12 h-12 text-upwork-green animate-spin" />
      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Authenticating Ledger Node...</p>
    </div>
  );

  if (error) return (
    <div className="p-8 lg:ml-64 h-[calc(100vh-80px)] flex flex-col items-center justify-center space-y-4 bg-white">
      <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-500">
        <FileText size={32} />
      </div>
      <h3 className="text-sm font-black text-upwork-dark uppercase">Data Retrieval Failure</h3>
      <p className="text-xs text-gray-400 font-medium">{error}</p>
      <button onClick={onBack} className="mt-4 px-6 py-2 bg-upwork-dark text-white rounded-xl text-[10px] font-black uppercase tracking-widest">Back to Ledger</button>
    </div>
  );

  if (!invoice) return <div>Invoicing Node Not Found</div>;

  const items = typeof invoice.items === 'string' ? JSON.parse(invoice.items) : invoice.items;
  const subtotal = parseFloat(invoice.totalAmount);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  return (
    <div className="p-8 space-y-8 lg:ml-64 min-h-[calc(100vh-80px)] bg-gray-50/50 print:m-0 print:p-0 print:ml-0 print:bg-white">
      <style>
        {`
          @media print {
            .no-print { display: none !important; }
            .print-only { display: block !important; }
            body * { visibility: hidden; }
            .invoice-sheet, .invoice-sheet * { visibility: visible; }
            .invoice-sheet { 
              position: absolute; 
              left: 0; 
              top: 0; 
              width: 100% !important; 
              margin: 0 !important; 
              padding: 0 !important;
              box-shadow: none !important;
              border: none !important;
            }
          }
        `}
      </style>
      {/* Header Actions */}
      <div className="flex justify-between items-center bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm no-print">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-upwork-dark transition-all"
        >
          <ArrowLeft size={16} /> Return to Ledger
        </button>
        <div className="flex gap-3">
          <button className="p-2.5 bg-gray-50 text-gray-400 rounded-xl hover:bg-upwork-dark hover:text-white transition-all">
            <Share2 size={18} />
          </button>
          <button 
            onClick={() => window.print()}
            className="p-2.5 bg-gray-50 text-gray-400 rounded-xl hover:bg-upwork-dark hover:text-white transition-all"
          >
            <Printer size={18} />
          </button>
          <button 
            onClick={() => window.print()}
            className="flex items-center gap-2 px-6 py-2.5 bg-upwork-green text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-upwork-dark transition-all shadow-lg shadow-upwork-green/20"
          >
            <Download size={16} /> Download PDF
          </button>
        </div>
      </div>

      {/* Main Invoice Sheet */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[3rem] border border-gray-100 shadow-2xl overflow-hidden max-w-5xl mx-auto invoice-sheet"
      >
        {/* Top Banner */}
        <div className="bg-upwork-dark p-12 text-white flex justify-between items-start">
          <div className="space-y-4">
            <div className="w-16 h-16 bg-upwork-green rounded-2xl flex items-center justify-center text-upwork-dark">
              <ShieldCheck size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-black uppercase tracking-tighter leading-none">Tax Invoice</h1>
              <p className="text-xs font-black text-upwork-green uppercase tracking-[0.3em] mt-2">Verified Ledger Node</p>
            </div>
          </div>
          <div className="text-right space-y-2">
            <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Internal Hash</p>
            <p className="text-sm font-black uppercase tracking-tight">#INV-{invoice.id.toString().padStart(8, '0')}</p>
            <div className="pt-4">
              <span className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border ${
                invoice.status === 'completed' ? 'bg-upwork-green text-upwork-dark border-upwork-green' : 'bg-white/10 text-white border-white/20'
              }`}>
                Settlement: {invoice.status}
              </span>
            </div>
          </div>
        </div>

        {/* Party Details */}
        <div className="grid grid-cols-2 gap-12 p-12 border-b border-gray-50">
          <div className="space-y-6">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-2">Facility Operator (Buyer)</p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Building2 size={16} className="text-upwork-green" />
                <p className="text-lg font-black text-upwork-dark uppercase">{invoice.User?.Organization?.organization_name || 'Global Logistics Node'}</p>
              </div>
              <div className="space-y-1 pl-7">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-tight">{invoice.User?.name}</p>
                <p className="text-xs font-medium text-gray-400 flex items-center gap-2">
                  <Mail size={12} /> {invoice.User?.email}
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-2">Fulfillment Node (Seller)</p>
            <div className="space-y-4 text-right">
              <div className="flex items-center gap-3 justify-end">
                <p className="text-lg font-black text-upwork-dark uppercase">Industrial Partners Corp</p>
                <Building2 size={16} className="text-gray-300" />
              </div>
              <div className="space-y-1 pr-7">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-tight">Main Distribution Node</p>
                <p className="text-xs font-medium text-gray-400 flex items-center justify-end gap-2">
                  billing@industrial.net <Mail size={12} />
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Invoice Meta */}
        <div className="grid grid-cols-4 gap-8 p-12 bg-gray-50/50">
          <div>
            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Deployment Date</p>
            <div className="flex items-center gap-2 text-upwork-dark font-black text-xs uppercase">
              <Calendar size={14} className="text-gray-300" /> {new Date(invoice.createdAt).toLocaleDateString()}
            </div>
          </div>
          <div>
            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Payment Method</p>
            <div className="flex items-center gap-2 text-upwork-dark font-black text-xs uppercase">
              <Layers size={14} className="text-gray-300" /> Corporate ESCROW
            </div>
          </div>
          <div>
            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Currency</p>
            <div className="flex items-center gap-2 text-upwork-dark font-black text-xs uppercase">
              <DollarSign size={14} className="text-gray-300" /> USD (United States)
            </div>
          </div>
          <div>
            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Compliance Node</p>
            <div className="flex items-center gap-2 text-upwork-green font-black text-xs uppercase">
              <ShieldCheck size={14} /> SECURE-L2
            </div>
          </div>
        </div>

        {/* Table Content */}
        <div className="p-12">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b-2 border-upwork-dark/5">
                <th className="py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Component Description</th>
                <th className="py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Qty</th>
                <th className="py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Unit Price</th>
                <th className="py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Total Node</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {items.map((item, index) => (
                <tr key={index}>
                  <td className="py-6">
                    <p className="text-sm font-black text-upwork-dark uppercase tracking-tight">{item.name}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase mt-0.5">Specifications: Standard Industrial Node</p>
                  </td>
                  <td className="py-6 text-center text-sm font-black text-gray-600">{item.qty || item.quantity}</td>
                  <td className="py-6 text-right text-sm font-black text-gray-600">${parseFloat(item.price || (subtotal / (item.qty || item.quantity))).toLocaleString()}</td>
                  <td className="py-6 text-right text-sm font-black text-upwork-dark">
                    ${( (parseFloat(item.price || (subtotal / (item.qty || item.quantity)))) * (item.qty || item.quantity) ).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className="mt-12 flex justify-end">
            <div className="w-80 space-y-3 bg-gray-50 p-8 rounded-3xl">
              <div className="flex justify-between items-center text-xs font-bold text-gray-400 uppercase tracking-widest">
                <span>Subtotal</span>
                <span className="text-gray-900">${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-xs font-bold text-gray-400 uppercase tracking-widest">
                <span>Network Tax (5%)</span>
                <span className="text-gray-900">${tax.toLocaleString()}</span>
              </div>
              <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
                <span className="text-[10px] font-black text-upwork-dark uppercase tracking-widest">Total Settlement</span>
                <span className="text-2xl font-black text-upwork-dark tracking-tighter">${total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Footer Terms */}
          <div className="mt-20 pt-10 border-t border-gray-50 text-[10px] font-medium text-gray-400 leading-relaxed max-w-2xl">
            <p className="font-black text-upwork-dark uppercase tracking-widest mb-2">Terms & Compliance Node</p>
            <p>1. This invoice is generated automatically by the Purchase Point Industrial OS. All data is synchronized across secure ledger nodes. 2. Payment was executed via Corporate ESCROW and is protected by site-wide compliance protocols. 3. For component disputes, please reference the Internal Hash #INV-{invoice.id.toString().padStart(8, '0')}.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SingleInvoiceView;
