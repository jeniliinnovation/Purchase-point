import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Activity, Target, CheckCircle, Send, FileText, Loader2, Plus,
  Clock, DollarSign, TrendingUp, ArrowRight, Tag, ArrowUpRight, Zap,
  BarChart2
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const StatCard = ({ label, value, icon: Icon, gradient, delay }) => (
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
      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
    </div>
    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.25em] mb-1.5">{label}</p>
    <p className="text-2xl font-black text-gray-900 tracking-tight">{value}</p>
    <div className="mt-3 h-1 w-full bg-gray-50 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${Math.min((parseInt(value) || 0) * 10 + 30, 90)}%` }}
        transition={{ delay: delay + 0.3, duration: 0.8 }}
        className={`h-full rounded-full ${gradient}`}
      />
    </div>
  </motion.div>
);

const statusBadge = (s) => {
  if (s === 'accepted') return 'bg-[#14a800]/10 text-[#14a800] border border-[#14a800]/20';
  if (s === 'rejected') return 'bg-red-50 text-red-500 border border-red-100';
  return 'bg-orange-50 text-orange-500 border border-orange-100';
};


const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-100 rounded-2xl px-4 py-3 shadow-2xl">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</p>
        <p className="text-base font-black text-gray-900">{payload[0].value} bids</p>
      </div>
    );
  }
  return null;
};

const SellerDashboardHome = ({ setActiveTab }) => {
  const [stats, setStats] = useState(null);
  const [recentBids, setRecentBids] = useState([]);
  const [matches, setMatches] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 17) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');

    let id;
    const fetch_data = async () => {
      try {
        const stored = JSON.parse(localStorage.getItem('user') || '{}');
        setUser(stored);
        const token = localStorage.getItem('token');
        const [dashRes, anaRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/seller/dashboard`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`${import.meta.env.VITE_API_URL}/seller/analytics`, { headers: { Authorization: `Bearer ${token}` } })
        ]);
        
        if (dashRes.ok) {
          const d = await dashRes.json();
          setStats(d.stats);
          setRecentBids(d.recentBids || []);
          setMatches(d.matches || []);
        }
        if (anaRes.ok) {
          const a = await anaRes.json();
          const activity = a.monthlyActivity || [];
          setChartData(activity.map(m => ({ name: m.month, bids: m.bids })));
        }
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    };
    fetch_data();
    id = setInterval(fetch_data, 10000);
    return () => clearInterval(id);
  }, []);

  if (loading) return (
    <div className="p-8 lg:ml-64 h-[calc(100vh-80px)] flex flex-col items-center justify-center space-y-4">
      <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-gray-900 to-gray-700 flex items-center justify-center shadow-xl">
        <Loader2 className="w-8 h-8 text-[#14a800] animate-spin" />
      </div>
      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Initializing Supplier Terminal...</p>
    </div>
  );

  const winRate = stats?.totalBids > 0
    ? Math.round((stats.acceptedBids / stats.totalBids) * 100)
    : 0;

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
            <Activity size={12} className="animate-pulse" /> Supplier Terminal Active
          </div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            {greeting}, <span className="text-[#14a800]">{user?.name || 'Supplier'}!</span>
          </h1>
          <p className="text-gray-500 font-medium mt-1 text-sm">Your bid operations at a glance.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setActiveTab && setActiveTab('open_rfqs')}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-black uppercase tracking-widest text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
          >
            <FileText size={15} /> Browse RFQs
          </button>
          <button
            onClick={() => setActiveTab && setActiveTab('submit_bid')}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#14a800] to-emerald-500 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:from-[#108a00] hover:to-emerald-600 transition-all shadow-lg shadow-[#14a800]/25"
          >
            <Plus size={15} /> Submit Bid
          </button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard label="Open RFQs" value={stats?.openRFQs ?? 0} icon={FileText} gradient="bg-gradient-to-tr from-blue-500 to-blue-400" delay={0.05} />
        <StatCard label="Total Bids" value={stats?.totalBids ?? 0} icon={Send} gradient="bg-gradient-to-tr from-[#14a800] to-emerald-400" delay={0.1} />
        <StatCard label="Pending" value={stats?.pendingBids ?? 0} icon={Target} gradient="bg-gradient-to-tr from-orange-500 to-amber-400" delay={0.15} />
        <StatCard label="Accepted" value={stats?.acceptedBids ?? 0} icon={CheckCircle} gradient="bg-gradient-to-tr from-purple-500 to-violet-400" delay={0.2} />
      </div>

      {/* Win Rate Banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-6 flex items-center justify-between gap-6 overflow-hidden relative"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_50%,rgba(20,168,0,0.15),transparent)]" />
        <div className="relative z-10 flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-[#14a800]/20 border border-[#14a800]/30 flex items-center justify-center">
            <BarChart2 size={28} className="text-[#14a800]" />
          </div>
          <div>
            <p className="text-[10px] text-[#14a800] font-black uppercase tracking-widest mb-1">Your Performance</p>
            <h2 className="text-2xl font-black text-white">{winRate}% Win Rate</h2>
            <p className="text-xs text-gray-400 font-medium mt-0.5">{stats?.acceptedBids ?? 0} of {stats?.totalBids ?? 0} bids accepted</p>
          </div>
        </div>
        <div className="relative z-10 hidden md:flex items-center gap-6">
          {[
            { label: 'Response Rate', val: '98%' },
            { label: 'Avg Delivery', val: `${stats?.avgDeliveryDays ?? 14}d` },
            { label: 'Active Contracts', val: stats?.acceptedBids ?? 0 },
          ].map((m, i) => (
            <div key={i} className="text-center">
              <p className="text-xl font-black text-white">{m.val}</p>
              <p className="text-[9px] text-gray-500 font-bold uppercase tracking-wider mt-0.5">{m.label}</p>
            </div>
          ))}
        </div>
        <button
          onClick={() => setActiveTab && setActiveTab('analytics')}
          className="relative z-10 flex-shrink-0 flex items-center gap-2 px-5 py-2.5 bg-[#14a800] text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-emerald-500 transition-all shadow-xl"
        >
          Analytics <ArrowRight size={14} />
        </button>
      </motion.div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* Recent Bids */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden"
        >
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
              <Send size={15} className="text-[#14a800]" /> Recent Bids
            </h3>
            <button 
              onClick={() => setActiveTab && setActiveTab('my_bids')}
              className="text-[10px] font-black uppercase tracking-widest text-[#14a800] hover:text-emerald-700 transition-all flex items-center gap-1"
            >
              View All <ArrowRight size={12} />
            </button>
          </div>

          {recentBids.length > 0 ? (
            <div className="divide-y divide-gray-50">
              {recentBids.map((bid) => (
                <div key={bid.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50/50 transition-colors group cursor-pointer">
                  <div className="flex-1 space-y-1 min-w-0">
                    <p className="text-[10px] font-black text-[#14a800] uppercase tracking-widest">{bid.RFQ?.rfq_number || 'N/A'}</p>
                    <p className="text-sm font-black text-gray-900 uppercase tracking-tight group-hover:text-[#14a800] transition-colors truncate">{bid.RFQ?.title || 'Unknown RFQ'}</p>
                    <div className="flex gap-4 text-[10px] font-bold text-gray-400 uppercase">
                      <span className="flex items-center gap-1"><DollarSign size={10} />${bid.unit_price}</span>
                      <span className="flex items-center gap-1"><Clock size={10} />{bid.delivery_days} days</span>
                      <span>{new Date(bid.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <span className={`flex-shrink-0 ml-4 px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest ${statusBadge(bid.status)}`}>
                    {bid.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-16 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-gray-50 rounded-3xl flex items-center justify-center mb-3">
                <Send size={24} className="text-gray-200" />
              </div>
              <p className="text-xs text-gray-400 font-black uppercase tracking-widest">No bids submitted yet</p>
              <button
                onClick={() => setActiveTab && setActiveTab('submit_bid')}
                className="mt-4 flex items-center gap-1.5 text-[10px] font-black text-[#14a800] uppercase tracking-widest hover:text-emerald-700 transition-colors"
              >
                <Plus size={12} /> Submit Your First Bid
              </button>
            </div>
          )}
        </motion.div>

        {/* Right Column */}
        <div className="space-y-5">
          {/* Bid Activity Mini Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6"
          >
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight flex items-center gap-2 mb-4">
              <TrendingUp size={15} className="text-blue-500" /> Bid Activity
            </h3>
            <div className="h-[140px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="sellerBidGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#14a800" stopOpacity={0.25}/>
                      <stop offset="95%" stopColor="#14a800" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 700, fill: '#9ca3af' }} dy={8} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 700, fill: '#9ca3af' }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="bids" stroke="#14a800" strokeWidth={2} fillOpacity={1} fill="url(#sellerBidGrad)" dot={false} activeDot={{ r: 5, fill: '#14a800', stroke: '#fff', strokeWidth: 2 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* New Matches */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.55 }}
            className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden"
          >
            <div className="p-5 border-b border-gray-50 flex justify-between items-center">
              <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                <Zap size={14} className="text-amber-500" /> New Matches
              </h3>
              <button
                onClick={() => setActiveTab && setActiveTab('open_rfqs')}
                className="text-[10px] font-black uppercase tracking-widest text-[#14a800] hover:text-emerald-700 transition-all flex items-center gap-1"
              >
                All <ArrowRight size={11} />
              </button>
            </div>
            <div className="divide-y divide-gray-50">
              {matches.length > 0 ? matches.slice(0, 3).map(rfq => (
                <div key={rfq.id} className="px-5 py-4 hover:bg-gray-50/50 transition-colors group cursor-pointer">
                  <p className="text-[10px] font-black text-[#14a800] uppercase tracking-widest">{rfq.rfq_number}</p>
                  <p className="text-xs font-black text-gray-900 uppercase tracking-tight group-hover:text-[#14a800] transition-colors mt-0.5 line-clamp-1">{rfq.title}</p>
                  <div className="flex gap-3 mt-1.5">
                    <span className="flex items-center gap-1 text-[9px] font-bold text-gray-400 uppercase"><Tag size={9} />{rfq.category}</span>
                    <span className="flex items-center gap-1 text-[9px] font-bold text-orange-400 uppercase"><Clock size={9} />{new Date(rfq.deadline).toLocaleDateString()}</span>
                  </div>
                </div>
              )) : (
                <div className="p-10 text-center">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">No fresh matches</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-3xl text-white relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(20,168,0,0.2),transparent)]" />
            <div className="relative z-10 space-y-3">
              <p className="text-[10px] text-[#14a800] font-black uppercase tracking-widest">Quick Action</p>
              <h2 className="text-base font-black uppercase tracking-tight leading-tight">Find Open RFQs<br/>& Submit Bids</h2>
              <button
                onClick={() => setActiveTab && setActiveTab('open_rfqs')}
                className="w-full py-3 bg-[#14a800] text-white rounded-2xl font-black text-xs uppercase tracking-[0.15em] hover:bg-emerald-500 transition-all shadow-xl"
              >
                Browse Open RFQs
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboardHome;
