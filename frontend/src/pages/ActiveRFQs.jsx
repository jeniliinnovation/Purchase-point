import React from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Clock, MapPin, Settings, BarChart3, ChevronRight, Activity } from 'lucide-react';

const ActiveRFQs = () => {
  const rfqs = [
    { id: 'RFQ-8921', title: 'CNC Machined Aluminum Enclosures', tags: ['Machining', 'Aluminum 6061', '1k units'], due: '2 days left', budget: '$15k - $25k', status: 'Active' },
    { id: 'RFQ-8922', title: 'Injection Molded Plastic Bezels', tags: ['Molding', 'ABS', '10k units'], due: '5 days left', budget: '$5k - $10k', status: 'Verified' },
    { id: 'RFQ-8923', title: 'Custom PCB Assembly (Turnkey)', tags: ['PCBA', 'SMT/THT', '500 units'], due: '12 hours left', budget: 'Negotiable', status: 'Urgent' },
    { id: 'RFQ-8924', title: 'Sheet Metal Stamping - Brackets', tags: ['Stamping', 'SS 304', '5k units'], due: '1 week left', budget: '$4k - $8k', status: 'Active' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-['Inter']">
      <section className="bg-white border-b border-gray-100 pt-20 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-end gap-10 sm:gap-12">
           <div className="space-y-6">
              <div className="flex items-center gap-2 px-3 py-1 bg-upwork-green/10 rounded-lg text-upwork-green text-[10px] font-black uppercase tracking-[0.2em] w-fit">
                 <Activity size={12} className="animate-spin-slow" /> Live Market Index
              </div>
              <h1 className="text-4xl sm:text-7xl lg:text-8xl font-black text-upwork-dark tracking-tight uppercase leading-[0.95] !leading-[0.85] mb-4">
                 Market <br/>Disruptions.
              </h1>
              <p className="text-base sm:text-lg text-gray-400 font-medium max-w-xl">Browse active technical specifications and bid on high-integrity industrial projects.</p>
           </div>
           
           <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-80 group">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-upwork-green transition-colors" size={18} />
                 <input type="text" placeholder="Protocol Keyword..." className="w-full pl-12 pr-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 outline-none focus:bg-white focus:border-upwork-green transition-all font-bold text-sm" />
              </div>
              <button className="px-6 py-4 bg-upwork-dark text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-upwork-green hover:text-white transition-all">
                 <Filter size={16} /> Filters
              </button>
           </div>
        </div>
      </section>

      {/* RFQ List Section */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 py-12">
        <div className="grid lg:grid-cols-4 gap-12">
           {/* Left: Stats/Filters */}
           <div className="lg:col-span-1 space-y-6">
              <div className="p-6 sm:p-8 bg-upwork-dark rounded-[2.5rem] text-white space-y-6">
                 <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Market Depth</p>
                    <div className="text-3xl sm:text-4xl font-black text-upwork-green">$42.4M</div>
                 </div>
                 <div className="h-px bg-white/10" />
                 <div className="space-y-4">
                    <div className="flex justify-between items-center text-xs font-bold tracking-tight">
                       <span className="text-gray-400 uppercase">Active Bids</span>
                       <span>842 Units</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-bold tracking-tight">
                       <span className="text-gray-400 uppercase">Avg Yield</span>
                       <span className="text-upwork-green">+12.4%</span>
                    </div>
                 </div>
              </div>

              <div className="p-6 sm:p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
                 <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-upwork-dark">Domain Filter</h4>
                 <div className="space-y-3">
                    {['Machining', 'Electronics', 'Fabrication', 'Logistics'].map(cat => (
                      <div key={cat} className="flex justify-between items-center group cursor-pointer">
                         <span className="text-sm font-bold text-gray-500 group-hover:text-upwork-green transition-colors">{cat}</span>
                         <div className="w-2 h-2 rounded-full bg-gray-100 group-hover:bg-upwork-green transition-colors" />
                      </div>
                    ))}
                 </div>
              </div>
           </div>

           {/* Right: RFQ Feed */}
           <div className="lg:col-span-3 space-y-4">
              {rfqs.map((rfq, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="p-6 sm:p-8 bg-white border border-gray-100 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                     <div className="flex-1 space-y-4">
                        <div className="flex items-center gap-4">
                           <span className="font-mono text-[10px] font-black text-upwork-green bg-upwork-green/5 px-3 py-1 rounded-md border border-upwork-green/20">{rfq.id}</span>
                           <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-amber-500">
                              <Clock size={12} /> {rfq.due}
                           </div>
                           <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-md border ${rfq.status === 'Urgent' ? 'bg-red-50 text-red-500 border-red-100' : 'bg-blue-50 text-blue-500 border-blue-100'}`}>
                              {rfq.status}
                           </span>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-black text-upwork-dark uppercase tracking-tight group-hover:text-upwork-green transition-colors leading-tight">
                           {rfq.title}
                        </h2>
                        <div className="flex flex-wrap gap-2 pt-2">
                           {rfq.tags.map(t => (
                             <span key={t} className="px-3 py-1 bg-gray-50 rounded-lg text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-1.5 whitespace-nowrap">
                                <Settings size={10} /> {t}
                             </span>
                           ))}
                        </div>
                     </div>
                     <div className="flex flex-col md:items-end gap-6 md:min-w-[220px] w-full md:w-auto pt-6 md:pt-0 border-t md:border-t-0 md:border-l border-gray-50 md:pl-8">
                        <div className="text-center md:text-right">
                           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Target Budget</p>
                           <p className="text-2xl font-black text-upwork-dark tracking-tighter">{rfq.budget}</p>
                        </div>
                        <button className="w-full py-4 bg-upwork-green text-upwork-dark rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-lg shadow-upwork-green/10 hover:scale-105 active:scale-95 transition-all">
                           Deploy Bid
                        </button>
                     </div>
                  </div>
                </motion.div>
              ))}

              <div className="pt-8 text-center">
                 <button className="px-10 py-5 bg-white border border-gray-100 rounded-[2rem] text-xs font-black uppercase tracking-[0.3em] text-gray-400 hover:text-upwork-dark hover:border-upwork-dark transition-all">
                    Load More Spec Files
                 </button>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default ActiveRFQs;
