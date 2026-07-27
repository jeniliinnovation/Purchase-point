import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, CheckCircle, Clock, DollarSign, Loader2, ArrowRight, Printer, Trash2 } from 'lucide-react';
import SingleInvoiceView from './SingleInvoiceView';

const BuyerInvoicingView = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);

  const fetchInvoices = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/buyer/invoices`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await response.json();
      setInvoices(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Fetch invoices failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (!window.confirm('WARNING: Confirm decommission of this financial node? Data loss is permanent.')) return;
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/buyer/invoice/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (response.ok) {
        setInvoices(invoices.filter(inv => inv.id !== id));
      }
    } catch (err) {
      console.error('Delete failed');
    }
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'Date', 'Amount', 'Status'];
    const rows = invoices.map(inv => [inv.id, new Date(inv.createdAt).toLocaleDateString(), inv.totalAmount, inv.status]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "industrial_ledger_export.csv");
    document.body.appendChild(link);
    link.click();
  };

  if (selectedInvoiceId !== null) return <SingleInvoiceView invoiceId={selectedInvoiceId} onBack={() => setSelectedInvoiceId(null)} />;

  if (loading) return (
    <div className="p-8 lg:ml-64 h-[calc(100vh-80px)] flex flex-col items-center justify-center space-y-4">
      <Loader2 className="w-8 h-8 text-upwork-green animate-spin" />
      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Loading Billing Ledger...</p>
    </div>
  );

  return (
    <div className="p-8 space-y-8 lg:ml-64 min-h-[calc(100vh-80px)] bg-gray-50/50">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-upwork-dark tracking-tight uppercase">Invoicing & Ledger</h1>
          <p className="text-gray-500 font-medium">Tracking industrial purchase orders and financial settlements.</p>
        </div>
        <button 
          onClick={handleExportCSV}
          className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-upwork-dark hover:bg-gray-50 hover:shadow-lg transition-all"
        >
          <Download size={16} /> Batch Export CSV
        </button>
      </div>

      <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50/50 border-b border-gray-50">
            <tr>
              <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Invoice Identity</th>
              <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Creation Date</th>
              <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Financial Payload</th>
              <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Settlement Phase</th>
              <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {invoices.map((inv, i) => (
              <motion.tr 
                key={inv.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelectedInvoiceId(inv.id)}
                className="hover:bg-gray-50 transition-colors group cursor-pointer"
              >
                <td className="px-10 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-upwork-dark shadow-sm group-hover:bg-upwork-green group-hover:text-white transition-all">
                      <FileText size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-black text-upwork-dark tracking-tight uppercase">#INV-{inv.id.toString().padStart(6, '0')}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">PO REF: {inv.po_number || 'Internal Node'}</p>
                    </div>
                  </div>
                </td>
                <td className="px-10 py-6">
                  <p className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2">
                    <Clock size={12} className="text-gray-300" /> {new Date(inv.createdAt).toLocaleDateString()}
                  </p>
                </td>
                <td className="px-10 py-6">
                  <p className="text-sm font-black text-upwork-dark">${parseFloat(inv.totalAmount).toLocaleString()}</p>
                  <p className="text-[9px] text-[#14a800] font-black uppercase tracking-tighter italic">Secured Transaction</p>
                </td>
                <td className="px-10 py-6">
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border ${
                    inv.status === 'completed' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                  }`}>
                    {inv.status === 'completed' ? <CheckCircle size={10} /> : <Clock size={10} />}
                    {inv.status}
                  </div>
                </td>
                <td className="px-10 py-6 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={(e) => handleDelete(e, inv.id)}
                      className="p-2.5 text-gray-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setSelectedInvoiceId(inv.id); }}
                      className="px-4 py-2 bg-upwork-green/10 text-upwork-green rounded-xl hover:bg-upwork-green hover:text-white transition-all flex items-center gap-2 text-[10px] font-black uppercase tracking-widest"
                    >
                      <ArrowRight size={14} /> Detail
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
        {invoices.length === 0 && (
          <div className="py-24 text-center">
            <DollarSign size={48} className="mx-auto text-gray-100 mb-4" />
            <p className="text-xs text-gray-400 font-black uppercase tracking-[0.3em]">No billing records detected</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyerInvoicingView;

