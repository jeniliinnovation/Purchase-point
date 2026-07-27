import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Package, 
  Trophy, 
  DollarSign, 
  Clock, 
  CheckCircle,
  Plus,
  Download,
  Loader2,
  ArrowUpRight,
  ArrowRight,
  FileText,
  Zap,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
      {trend && (
        <div className="flex items-center gap-1 bg-green-50 px-2.5 py-1 rounded-full">
          <ArrowUpRight size={11} className="text-green-600" />
          <span className="text-[10px] font-black text-green-600 uppercase tracking-widest">{trend}</span>
        </div>
      )}
    </div>
    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.25em] mb-1.5">{label}</p>
    <p className="text-2xl font-black text-gray-900 tracking-tight">{value}</p>
  </motion.div>
);



const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-100 rounded-2xl px-4 py-3 shadow-2xl">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</p>
          <p className="text-base font-black text-gray-900">${Number(payload[0].value).toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

const BuyerDashboardHome = ({ setActiveTab }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 17) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');

    let intervalId;
    const fetchBuyerStats = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        setUser(storedUser);
        const token = localStorage.getItem('token');
        const response = await fetch(`${import.meta.env.VITE_API_URL}/buyer/dashboard`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (err) {
        console.error('Failed to fetch buyer stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBuyerStats();
    intervalId = setInterval(fetchBuyerStats, 5000);
    return () => clearInterval(intervalId);
  }, []);

  if (loading) return (
    <div className="p-8 lg:ml-64 h-[calc(100vh-80px)] flex flex-col items-center justify-center space-y-4">
      <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-[#14a800] to-emerald-400 flex items-center justify-center shadow-xl shadow-[#14a800]/30">
        <Loader2 className="w-8 h-8 text-white animate-spin" />
      </div>
      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Synchronizing Nodes...</p>
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
            <Activity size={12} className="animate-pulse" /> Sourcing Terminal Active
          </div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            {greeting}, <span className="text-[#14a800]">{user?.name || 'Buyer'}!</span>
          </h1>
          <p className="text-gray-500 font-medium mt-1 text-sm">Overview of your industrial procurement operations.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-black uppercase tracking-widest text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
            <Download size={15} /> Reports
          </button>
          <button 
            onClick={() => setActiveTab && setActiveTab('rfq_generator')} 
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#14a800] to-emerald-500 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:from-[#108a00] hover:to-emerald-600 transition-all shadow-lg shadow-[#14a800]/25"
          >
            <Plus size={15} /> New RFQ
          </button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-5">
        <StatCard label="Industrial Site" value={user?.location || 'Central Node'} icon={Activity} gradient="bg-gradient-to-tr from-blue-500 to-blue-400" delay={0.05} />
        <StatCard label="Active RFQs" value={stats?.total_rfqs || '0'} icon={FileText} gradient="bg-gradient-to-tr from-[#14a800] to-emerald-400" trend="+5" delay={0.1} />
        <StatCard label="Bids Received" value={stats?.total_bids || '0'} icon={Trophy} gradient="bg-gradient-to-tr from-orange-500 to-amber-400" trend="+8" delay={0.15} />
        <StatCard label="Total Spend" value={stats?.total_spend || '$0'} icon={DollarSign} gradient="bg-gradient-to-tr from-purple-500 to-violet-400" trend="+12%" delay={0.2} />
        <StatCard label="Overdue" value={stats?.overdue_quotes || '0'} icon={AlertCircle} gradient="bg-gradient-to-tr from-rose-500 to-red-400" delay={0.25} />
        <StatCard label="Delivered" value={stats?.delivered_orders || '0'} icon={CheckCircle} gradient="bg-gradient-to-tr from-teal-500 to-cyan-400" trend="+3" delay={0.3} />
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Procurement Trends Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm"
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">Procurement Trends</h3>
              <p className="text-xs text-gray-400 font-medium mt-0.5">Weekly spend analysis</p>
            </div>
            <select className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-500 outline-none cursor-pointer focus:ring-2 focus:ring-[#14a800]/20">
              <option value="7">Last 7 Days</option>
              <option value="30">Last 30 Days</option>
            </select>
          </div>

          {/* Quick Summary */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { label: 'Total Spend', val: stats?.total_spend || '$27.3K' },
              { label: 'Pending Bids', val: stats?.total_bids || '0' },
              { label: 'On-Time Rate', val: '94%' },
            ].map((s, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-3.5">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-wider mb-1">{s.label}</p>
                <p className="text-base font-black text-gray-900">{s.val}</p>
              </div>
            ))}
          </div>

          <div className="h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats?.chartData || []} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="buyerSpendGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#14a800" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#14a800" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#9ca3af' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#9ca3af' }} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="spend" stroke="#14a800" strokeWidth={2.5} fillOpacity={1} fill="url(#buyerSpendGrad)" dot={false} activeDot={{ r: 6, fill: '#14a800', stroke: '#fff', strokeWidth: 3 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Recent RFQs */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight flex items-center gap-2">
              <FileText size={15} className="text-[#14a800]" /> Recent RFQs
            </h3>
            <button 
              onClick={() => setActiveTab && setActiveTab('rfq')}
              className="text-[10px] font-black uppercase tracking-widest text-[#14a800] hover:text-emerald-700 transition-all flex items-center gap-1"
            >
              All <ArrowRight size={11} />
            </button>
          </div>

          <div className="space-y-3 flex-1 overflow-y-auto max-h-[380px] pr-1">
            {(stats?.recent_rfqs || []).map((rfq, i) => (
              <div key={rfq.id || i} className="p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-gray-50 hover:border-gray-100 group cursor-pointer">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-xs font-black text-gray-900 uppercase tracking-tight group-hover:text-[#14a800] transition-colors line-clamp-1">{rfq.title || 'Machining Specs'}</p>
                  <span className={`flex-shrink-0 ml-2 px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${
                    rfq.status === 'open' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-500'
                  }`}>
                    {rfq.status}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[10px] text-gray-400 font-bold">
                    <Trophy size={9} />
                    <span>{rfq.bid_count || 0} bids</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-orange-400 font-bold">
                    <Clock size={9} />
                    <span>{rfq.deadline ? new Date(rfq.deadline).toLocaleDateString() : 'No deadline'}</span>
                  </div>
                </div>
              </div>
            ))}
            {(!stats?.recent_rfqs || stats?.recent_rfqs.length === 0) && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-3xl flex items-center justify-center mb-3">
                  <Package size={24} className="text-gray-200" />
                </div>
                <p className="text-xs text-gray-400 font-black uppercase tracking-widest">No Active RFQs</p>
                <button 
                  onClick={() => setActiveTab && setActiveTab('rfq_generator')}
                  className="mt-4 flex items-center gap-1.5 text-[10px] font-black text-[#14a800] uppercase tracking-widest hover:text-emerald-700 transition-colors"
                >
                  <Plus size={12} /> Create First RFQ
                </button>
              </div>
            )}
          </div>
          <button 
            onClick={() => setActiveTab && setActiveTab('rfq')}
            className="mt-6 w-full py-3.5 border border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[#14a800] hover:border-[#14a800]/30 hover:bg-[#14a800]/5 transition-all"
          >
            View All RFQs
          </button>
        </motion.div>
      </div>

      {/* Quick Actions Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {[
          { icon: FileText, label: 'Generate RFQ', desc: 'Create a new procurement request', tab: 'rfq_generator', gradient: 'from-[#14a800] to-emerald-500' },
          { icon: Package, label: 'Browse Catalog', desc: 'Explore supplier product listings', tab: 'catalog', gradient: 'from-blue-500 to-blue-400' },
          { icon: TrendingUp, label: 'View Analytics', desc: 'Deep-dive into your spend data', tab: 'analytics', gradient: 'from-purple-500 to-violet-400' },
        ].map((action, i) => (
          <button
            key={i}
            onClick={() => setActiveTab && setActiveTab(action.tab)}
            className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all group text-left"
          >
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${action.gradient} flex items-center justify-center shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform`}>
              <action.icon size={20} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-black text-gray-900 uppercase tracking-tight">{action.label}</p>
              <p className="text-[10px] text-gray-400 font-medium mt-0.5">{action.desc}</p>
            </div>
            <ArrowRight size={16} className="text-gray-300 group-hover:text-gray-500 transition-colors flex-shrink-0" />
          </button>
        ))}
      </motion.div>
    </div>
  );
};

export default BuyerDashboardHome;

