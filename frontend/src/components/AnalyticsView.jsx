import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell 
} from 'recharts';
import { 
  TrendingUp, TrendingDown, DollarSign, FileText, Users, 
  ArrowUpRight, Target, Zap, ShieldCheck 
} from 'lucide-react';

const AnalyticsView = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ timeRange: 'all', category: 'all' });

  useEffect(() => {
    let intervalId;
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const role = user.role || 'admin';
        
        const params = new URLSearchParams(filters).toString();
        const response = await fetch(`${import.meta.env.VITE_API_URL}/${role}/analytics?${params}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (response.ok) {
          const result = await response.json();
          setData(result);
        }
      } catch (err) {
        console.error('Analytics fetch failed');
      } finally {
        setLoading(false);
      }
    };
    
    fetchAnalytics();
    intervalId = setInterval(fetchAnalytics, 15000); // Increased interval
    return () => clearInterval(intervalId);
  }, [filters]);

  if (loading) return (
    <div className="p-8 lg:ml-64 h-[calc(100vh-80px)] flex items-center justify-center">
      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Processing Big Data Nodes...</p>
    </div>
  );

  const COLORS = ['#14a800', '#95dfaa', '#001e00', '#2dd4bf'];

  return (
    <div className="p-4 md:p-8 lg:ml-64 min-h-[calc(100vh-80px)] bg-gray-50/50 space-y-10 transition-all">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-black text-upwork-dark tracking-tight uppercase leading-tight">High-Performance Analytics</h1>
          <p className="text-gray-500 font-medium text-sm md:text-base">Strategic procurement intelligence and variance monitoring.</p>
        </div>
        <div className="flex flex-wrap gap-4 w-full lg:w-auto">
          <select 
            value={filters.timeRange}
            onChange={(e) => setFilters({ ...filters, timeRange: e.target.value })}
            className="flex-1 lg:flex-none px-4 py-3 bg-white border border-gray-200 rounded-xl text-[10px] font-black uppercase tracking-widest outline-none shadow-sm"
          >
            <option value="all">Historical Data</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="ytd">Year to Date</option>
          </select>
          <select 
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            className="flex-1 lg:flex-none px-4 py-3 bg-white border border-gray-200 rounded-xl text-[10px] font-black uppercase tracking-widest outline-none shadow-sm"
          >
            <option value="all">All Categories</option>
            {data?.filters?.categories?.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <button className="w-full lg:w-auto px-6 py-3 bg-upwork-dark text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl active:scale-95 transition-transform">
             Generate Report
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total RFQ Node', value: data?.summary?.totalRFQs, icon: FileText, color: 'emerald' },
          { label: 'Potential Savings', value: data?.summary?.totalPotentialSavings, icon: DollarSign, color: 'blue' },
          { label: 'Award Rate', value: '68%', icon: ShieldCheck, color: 'indigo' },
          { label: 'Efficiency Score', value: data?.summary?.efficiencyScore, icon: Zap, color: 'amber' }
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm"
          >
            <div className={`w-12 h-12 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center mb-6`}>
              <stat.icon size={22} />
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <h2 className="text-2xl font-black text-upwork-dark">{stat.value}</h2>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Savings Variance */}
        <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-8">
           <div className="flex justify-between items-center">
              <h3 className="text-xl font-black text-upwork-dark uppercase tracking-tight">Savings Variance</h3>
              <TrendingUp className="text-upwork-green" size={24} />
           </div>
           <div className="h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={data?.partAnalysis}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                 <XAxis dataKey="part_number" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: '800' }} />
                 <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: '800' }} />
                 <Tooltip 
                    contentStyle={{ borderRadius: '1.5rem', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                    itemStyle={{ fontSize: '12px', fontWeight: '900' }}
                 />
                 <Bar dataKey="total_savings" fill="#14a800" radius={[10, 10, 0, 0]} barSize={40} />
               </BarChart>
             </ResponsiveContainer>
           </div>
        </div>

        {/* Pricing Comparison */}
        <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-8">
           <div className="flex justify-between items-center">
              <h3 className="text-xl font-black text-upwork-dark uppercase tracking-tight">Market Benchmark</h3>
              <Target className="text-blue-500" size={24} />
           </div>
           <div className="h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={data?.partAnalysis}>
                 <defs>
                   <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#14a800" stopOpacity={0.1}/>
                     <stop offset="95%" stopColor="#14a800" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <XAxis dataKey="part_number" hide />
                 <Tooltip />
                 <Area type="monotone" dataKey="comparison_price" stroke="#3b82f6" fill="transparent" strokeWidth={3} dot={{ r: 4 }} />
                 <Area type="monotone" dataKey="best_price" stroke="#14a800" fillOpacity={1} fill="url(#colorPrice)" strokeWidth={3} dot={{ r: 4 }} />
               </AreaChart>
             </ResponsiveContainer>
           </div>
        </div>
      </div>

      {/* Detail Analysis Table (from Excel) */}
      <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-10 border-b border-gray-50">
           <h3 className="text-xl font-black text-upwork-dark uppercase tracking-tight">Granular Node Analysis</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Part Number</th>
                <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Target Price</th>
                <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Comparison</th>
                <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Best Quote</th>
                <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Variance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {data?.partAnalysis?.map((part, i) => {
                const cp = Number(part.comparison_price);
                const bp = Number(part.best_price);
                const variance = (((cp - bp) / cp) * 100).toFixed(1);
                return (
                  <tr key={i} className="hover:bg-gray-50 transition-all">
                    <td className="px-10 py-6 text-sm font-black text-upwork-dark uppercase">{part.part_number}</td>
                    <td className="px-10 py-6 text-sm font-bold text-gray-500">${Number(part.best_price).toFixed(2)}</td>
                    <td className="px-10 py-6 text-sm font-bold text-gray-500">${Number(part.comparison_price).toFixed(2)}</td>
                    <td className="px-10 py-6 text-sm font-black text-upwork-green">${Number(part.best_price).toFixed(2)}</td>
                    <td className="px-10 py-6">
                       <span className="flex items-center gap-1 text-upwork-green text-xs font-black uppercase">
                         <ArrowUpRight size={14} /> {variance}%
                       </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;
