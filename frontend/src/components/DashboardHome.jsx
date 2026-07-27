import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Download, 
  TrendingUp, 
  Package, 
  Users, 
  DollarSign,
  ShoppingCart,
  Star,
  Loader2,
  ArrowUpRight,
  Activity,
  Zap
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const StatCard = ({ label, value, icon: Icon, gradient, trend, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, type: 'spring', stiffness: 100 }}
    className="relative bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group overflow-hidden"
  >
    <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 ${gradient}`} />
    <div className="flex justify-between items-start mb-5">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${gradient} shadow-lg`}>
        <Icon size={22} className="text-white" />
      </div>
      <div className="flex items-center gap-1 bg-green-50 px-2.5 py-1 rounded-full">
        <ArrowUpRight size={11} className="text-green-600" />
        <span className="text-[10px] font-black text-green-600 uppercase tracking-widest">{trend || '+12%'}</span>
      </div>
    </div>
    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.25em] mb-1.5">{label}</p>
    <p className="text-2xl font-black text-gray-900 tracking-tight">{value}</p>
    <div className="mt-3 h-1 w-full bg-gray-50 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: '65%' }}
        transition={{ delay: delay + 0.3, duration: 0.8 }}
        className={`h-full rounded-full ${gradient}`} 
      />
    </div>
  </motion.div>
);


const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-100 rounded-2xl px-4 py-3 shadow-2xl">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</p>
        <p className="text-base font-black text-gray-900">${payload[0].value?.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

const DashboardHome = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 17) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');

    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/stats`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setStats(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
    const intervalId = setInterval(fetchStats, 10000);
    return () => clearInterval(intervalId);
  }, []);

  const chartData = stats?.chartData?.map(d => ({
    name: new Date(d.date).toLocaleDateString('en-US', { weekday: 'short' }),
    revenue: d.revenue,
    orders: d.count
  })) || [];

  const totalRevFormatted = typeof stats?.summary?.totalRevenue === 'number' 
    ? `$${stats.summary.totalRevenue.toLocaleString()}` 
    : '$0';
  
  const totalAvgPrice = typeof stats?.summary?.avgPrice === 'number'
    ? `$${stats.summary.avgPrice.toLocaleString()}`
    : '$0';

  if (loading && !stats) return (
    <div className="p-8 lg:ml-64 h-[calc(100vh-80px)] flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-[#14a800] to-emerald-400 flex items-center justify-center shadow-xl shadow-[#14a800]/30">
          <Loader2 className="w-8 h-8 text-white animate-spin" />
        </div>
      </div>
      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Loading Intelligence...</p>
    </div>
  );

  return (
    <div className="p-8 space-y-8 lg:ml-64 min-h-[calc(100vh-80px)] bg-gray-50/50">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#14a800]/10 rounded-lg text-[#14a800] text-[10px] font-black uppercase tracking-widest border border-[#14a800]/20 mb-3">
            <Activity size={12} className="animate-pulse" /> Admin Control Panel
          </div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            {greeting}, <span className="text-[#14a800]">Admin!</span>
          </h1>
          <p className="text-gray-500 font-medium mt-1 text-sm">Here's your platform overview for today.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-black uppercase tracking-widest text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
            <Download size={15} /> Export
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#14a800] to-emerald-500 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:from-[#108a00] hover:to-emerald-600 transition-all shadow-lg shadow-[#14a800]/25">
            <Plus size={15} /> Add Vendor
          </button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-5">
        <StatCard label="Total Revenue" value={totalRevFormatted} icon={DollarSign} gradient="bg-gradient-to-tr from-blue-500 to-blue-400" trend="+18%" delay={0.05} />
        <StatCard label="Active Sourcing" value={stats?.summary?.activeSourcing || '0'} icon={Zap} gradient="bg-gradient-to-tr from-[#14a800] to-emerald-400" trend="+12%" delay={0.1} />
        <StatCard label="Total Orders" value={stats?.summary?.totalOrders || '0'} icon={ShoppingCart} gradient="bg-gradient-to-tr from-orange-500 to-amber-400" trend="+8%" delay={0.15} />
        <StatCard label="Partners" value={stats?.summary?.validatedPartners || '0'} icon={Users} gradient="bg-gradient-to-tr from-purple-500 to-violet-400" trend="+5%" delay={0.2} />
        <StatCard label="Avg Price" value={totalAvgPrice} icon={Package} gradient="bg-gradient-to-tr from-amber-500 to-yellow-400" trend="+3%" delay={0.25} />
        <StatCard label="Collections" value={stats?.summary?.collections || '0'} icon={Star} gradient="bg-gradient-to-tr from-rose-500 to-pink-400" trend="+22%" delay={0.3} />
      </div>

      {/* Analytics Section */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm"
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">Revenue Overview</h3>
              <p className="text-xs text-gray-400 font-medium mt-0.5">Platform-wide revenue monitoring</p>
            </div>
            <select className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-500 outline-none cursor-pointer focus:ring-2 focus:ring-[#14a800]/20">
              <option value="7">Last 7 Days</option>
              <option value="30">Last 30 Days</option>
              <option value="90">Last 90 Days</option>
            </select>
          </div>

          {/* Mini Stats Row */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: 'Total Revenue', val: totalRevFormatted, up: true },
              { label: 'Uptime', val: stats?.uptime || '99.9%', up: true },
              { label: 'Efficiency', val: stats?.efficiencyScore || '92%', up: false },
            ].map((s, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-4">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-wider mb-1">{s.label}</p>
                <p className="text-base font-black text-gray-900">{s.val}</p>
              </div>
            ))}
          </div>

          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="adminRevGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#14a800" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#14a800" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#9ca3af' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#9ca3af' }} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="revenue" stroke="#14a800" strokeWidth={2.5} fillOpacity={1} fill="url(#adminRevGrad)" dot={false} activeDot={{ r: 6, fill: '#14a800', stroke: '#fff', strokeWidth: 3 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Activity Feed */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight">Recent Activity</h3>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          </div>
          <div className="space-y-3 flex-1 overflow-y-auto max-h-[400px] pr-1 scrollbar-thin scrollbar-thumb-gray-100">
            {(stats?.recentActivity || []).map((activity, i) => (
              <div key={activity.id ? `activity-${activity.id}` : `activity-idx-${i}`} className="flex gap-3 p-3 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 group cursor-pointer">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#14a800] to-emerald-400 flex-shrink-0 flex items-center justify-center font-black text-white text-sm capitalize shadow-md shadow-[#14a800]/20">
                  {activity.User?.name?.charAt(0) || 'U'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-xs font-black text-gray-900 uppercase tracking-tight truncate">{activity.User?.name || 'Unknown User'}</p>
                    <span className={`flex-shrink-0 px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${
                      activity.status === 'completed' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-500'
                    }`}>
                      {activity.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 font-medium truncate">Order of ${activity.totalAmount}</p>
                  <p className="text-[9px] text-gray-400 font-bold mt-1 lowercase">{new Date(activity.createdAt).toLocaleString()}</p>
                </div>
              </div>
            ))}
            {!stats?.recentActivity?.length && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-3xl flex items-center justify-center mb-3">
                  <Zap size={24} className="text-gray-200" />
                </div>
                <p className="text-xs text-gray-400 font-black uppercase tracking-widest">No recent activity</p>
              </div>
            )}
          </div>
          <button className="mt-6 w-full py-3.5 border border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[#14a800] hover:border-[#14a800]/30 hover:bg-[#14a800]/5 transition-all">
            View All Activity
          </button>
        </motion.div>
      </div>

      {/* Orders Bar Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm"
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">Daily Orders</h3>
            <p className="text-xs text-gray-400 font-medium mt-0.5">Order volume by day of week</p>
          </div>
          <div className="flex items-center gap-2 bg-[#14a800]/10 rounded-xl px-3 py-1.5">
            <TrendingUp size={14} className="text-[#14a800]" />
            <span className="text-xs font-black text-[#14a800] uppercase tracking-wider">+18% vs last week</span>
          </div>
        </div>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} barSize={28} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#9ca3af' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#9ca3af' }} />
              <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', fontSize: '12px', fontWeight: 800 }} />
              <Bar dataKey="orders" fill="#14a800" radius={[8, 8, 0, 0]} background={{ fill: '#f9fafb', radius: [8, 8, 0, 0] }} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardHome;

