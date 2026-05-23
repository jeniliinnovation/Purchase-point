import React, { useState, useEffect } from 'react';
import { Search, Shield, Check, X, Loader2, UserRound, Mail, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const endpoint = filter === 'pending' ? '/api/admin/pending-users' : '/api/admin/users';
      const response = await fetch(`https://pp-backend-5mni.onrender.com${endpoint}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [filter]);

  const handleAction = async (userId, action) => {
    if (action === 'delete') {
      if (!window.confirm('Are you sure you want to permanently delete this user?')) return;
    }
    try {
      const token = localStorage.getItem('token');
      const method = action === 'delete' ? 'DELETE' : 'PUT';
      const endpoint = action === 'delete' ? `/api/admin/user/${userId}` : `/api/admin/user/${userId}/${action}`;
      
      const res = await fetch(`https://pp-backend-5mni.onrender.com${endpoint}`, {
        method: method,
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading && users.length === 0) {
    return (
      <div className="p-8 lg:ml-64 h-[calc(100vh-80px)] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-8 h-8 text-upwork-green animate-spin" />
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Accessing Participant Registry...</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-8 lg:ml-64 min-h-[calc(100vh-80px)] bg-gray-50/50 transition-all">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-black text-upwork-dark tracking-tight uppercase leading-tight">User Management</h1>
          <p className="text-gray-500 font-medium italic text-sm">Monitoring {users.length} active platform participants across nodes.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="flex-1 lg:flex-none px-4 py-2.5 bg-white border border-gray-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-500 outline-none focus:ring-2 focus:ring-upwork-green/20 cursor-pointer shadow-sm"
          >
            <option value="all">Full Registry</option>
            <option value="pending">Pending Approval</option>
          </select>
          <div className="relative flex-1 lg:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text"
              placeholder="Search ID or Email..."
              className="w-full bg-white border border-gray-100 rounded-xl py-2.5 pl-12 pr-4 text-xs font-medium outline-none focus:ring-2 focus:ring-upwork-green/20"
            />
          </div>
        </div>
      </div>

      {/* Modern Table Console */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-50">
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Participant Node</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Organization</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Role</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Operational Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <AnimatePresence mode="popLayout">
                {users.map((user, i) => (
                  <motion.tr 
                    key={user.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="hover:bg-gray-50/80 transition-all group"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-upwork-dark to-gray-700 flex items-center justify-center text-white text-xs font-black uppercase shadow-sm">
                          {user.name?.charAt(0) || user.email.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-black text-upwork-dark uppercase tracking-tight">{user.name || 'Anonymous Node'}</p>
                          <p className="text-[10px] text-gray-400 font-bold lowercase">{user.email}</p>
                          <p className="text-[9px] text-[#14a800] font-black mt-1 uppercase tracking-tighter">ID: {user.user_id || `PP-TEMP-${user.id}`}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                       <div className="flex flex-col">
                          <span className="text-xs font-black text-gray-600 uppercase tracking-tight">{user.Organization?.organization_name || 'Individual'}</span>
                          <span className="text-[10px] text-gray-400 font-medium italic">{user.Organization?.country || 'N/A'}</span>
                       </div>
                    </td>
                    <td className="px-8 py-6">
                       <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                         user.role === 'admin' ? 'bg-purple-50 text-purple-600' : 
                         user.role === 'buyer' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'
                       }`}>
                         {user.role}
                       </span>
                    </td>
                    <td className="px-8 py-6">
                       <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${
                            user.account_status === 'active' ? 'bg-[#14a800] animate-pulse' : 
                            user.account_status === 'pending_approval' ? 'bg-orange-400' : 'bg-red-400'
                          }`} />
                          <span className="text-[10px] font-black text-gray-900 uppercase tracking-widest">{user.account_status}</span>
                       </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {user.account_status === 'pending_approval' && (
                          <button 
                            onClick={() => handleAction(user.user_id || user.id, 'approve')}
                            className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
                            title="Approve Node"
                          >
                            <Check size={16} />
                          </button>
                        )}
                        {user.account_status === 'active' && (
                          <button 
                            onClick={() => handleAction(user.user_id || user.id, 'suspend')}
                            className="p-2 bg-orange-50 text-orange-500 rounded-lg hover:bg-orange-100 transition-colors"
                            title="Suspend Access"
                          >
                            <Shield size={16} />
                          </button>
                        )}
                        {(user.account_status === 'suspended' || user.account_status === 'rejected') && (
                          <button 
                            onClick={() => handleAction(user.user_id || user.id, 'approve')}
                            className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
                            title="Re-Activate"
                          >
                            <Check size={16} />
                          </button>
                        )}
                        <button 
                          onClick={() => handleAction(user.user_id || user.id, 'delete')}
                          className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors"
                          title="Permanent Decommission"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          {users.length === 0 && !loading && (
            <div className="p-20 text-center">
              <UserRound size={48} className="mx-auto text-gray-100 mb-4" />
              <p className="text-xs text-gray-400 font-black uppercase tracking-[0.3em]">No participants found in registry</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
