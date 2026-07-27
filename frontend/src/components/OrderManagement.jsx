import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  ShoppingCart, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Loader2,
  DollarSign,
  Package,
  Calendar
} from 'lucide-react';
import { motion } from 'framer-motion';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://purchase-point.jenili.in/api/admin/orders', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-50 text-green-600 border-green-100';
      case 'processing': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'pending': return 'bg-orange-50 text-orange-600 border-orange-100';
      case 'cancelled': return 'bg-red-50 text-red-600 border-red-100';
      default: return 'bg-gray-50 text-gray-600 border-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle size={14} />;
      case 'processing': return <Clock size={14} />;
      case 'pending': return <Clock size={14} />;
      case 'cancelled': return <XCircle size={14} />;
      default: return null;
    }
  };

  if (loading) return (
    <div className="p-8 lg:ml-64 min-h-[calc(100vh-80px)] flex flex-col items-center justify-center space-y-4">
      <Loader2 className="w-12 h-12 text-upwork-green animate-spin" />
      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Synchronizing Orders...</p>
    </div>
  );

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`https://purchase-point.jenili.in/api/admin/order/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
    } catch (err) {
      console.error('Update failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to terminate this transaction node?')) return;
    try {
      const token = localStorage.getItem('token');
      await fetch(`https://purchase-point.jenili.in/api/admin/order/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setOrders(orders.filter(o => o.id !== id));
    } catch (err) {
      console.error('Delete failed');
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-8 lg:ml-64 min-h-[calc(100vh-80px)] bg-gray-50/50 transition-all">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-black text-upwork-dark tracking-tight uppercase leading-tight">Order Intelligence</h1>
          <p className="text-gray-500 font-medium text-sm md:text-base">Monitoring global transaction flow and fulfillment nodes.</p>
        </div>
        <div className="flex gap-3 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text"
              placeholder="Search by ID or Status..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-xl text-sm font-medium focus:border-upwork-green/30 outline-none transition-all shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="p-3 bg-white border border-gray-100 rounded-xl text-upwork-dark hover:bg-gray-50 transition-all shadow-sm">
            <Filter size={18} />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Order ID</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Status Phase</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Allocation</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Deployment Date</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {orders.map((order) => (
                <motion.tr 
                  key={order.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50 transition-all group"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-upwork-light-gray flex items-center justify-center text-upwork-dark">
                        <ShoppingCart size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-black text-upwork-dark tracking-tight uppercase">#{order.id.toString().padStart(6, '0')}</p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Industrial Unit</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <select 
                      value={order.status}
                      onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[10px] font-black uppercase tracking-widest outline-none cursor-pointer ${getStatusColor(order.status)}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-sm font-black text-upwork-dark">${parseFloat(order.totalAmount).toLocaleString()}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Global Currency</p>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-gray-500">
                      <Calendar size={14} className="text-gray-300" />
                      <span className="text-xs font-bold">{new Date(order.createdAt).toLocaleDateString()}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex gap-2">
                       <button 
                        onClick={() => handleDelete(order.id)}
                        className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                       >
                         <XCircle size={18} />
                       </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-8 py-20 text-center">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.3em]">No transaction nodes detected in current cycle.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;

