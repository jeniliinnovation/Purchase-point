import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Star, MapPin, Search, Filter, Cpu, CheckCircle2, ChevronRight, Award } from 'lucide-react';

const Suppliers = () => {
  const topSuppliers = [
    { name: 'Apex Machining Industries', rating: '4.9', reviews: 124, location: 'Chicago, IL', tags: ['CNC Machining', 'ISO 9001:2015', 'AS9100D'], capacity: 'High' },
    { name: 'Global Tech Plastics', rating: '4.8', reviews: 89, location: 'Shenzhen, China', tags: ['Injection Molding', 'Rapid Prototyping', 'IATF 16949'], capacity: 'Medium' },
    { name: 'Pioneer Sheet Metal', rating: '5.0', reviews: 42, location: 'Austin, TX', tags: ['Sheet Metal', 'Welding', 'ISO 9001:2015'], capacity: 'High' },
    { name: 'Advanced PCBA Solutions', rating: '4.9', reviews: 215, location: 'Taipei, Taiwan', tags: ['PCBA', 'SMT/THT', 'UL Certified'], capacity: 'High' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-['Outfit'] tracking-wide">
      <section className="bg-upwork-dark text-white pt-24 sm:pt-32 pb-16 sm:pb-44 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto relative z-10 flex flex-col md:flex-row justify-between items-end gap-12 sm:gap-20">
           <div className="space-y-8">
              <div className="flex items-center gap-3 text-upwork-green text-[10px] font-black uppercase tracking-[0.4em]">
                 <Award size={16} /> Verified Node Registry
              </div>
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight uppercase leading-tight mb-4">
                 Verified <br/><span className="text-upwork-green">Capacity.</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 font-medium max-w-lg leading-relaxed">
                 Direct access to the worlds most advanced manufacturing facilities, audited and integrated into the Purchase Point protocol.
              </p>
           </div>
           <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="p-6 sm:p-8 bg-white/5 border border-white/10 rounded-[2rem] text-center space-y-2 flex-1 min-w-[140px]">
                 <div className="text-2xl sm:text-3xl font-black text-upwork-green">14,200+</div>
                 <div className="text-[10px] font-black uppercase tracking-widest opacity-50">Audited Facilities</div>
              </div>
              <div className="p-6 sm:p-8 bg-white/5 border border-white/10 rounded-[2rem] text-center space-y-2 flex-1 min-w-[140px]">
                 <div className="text-2xl sm:text-3xl font-black text-white">$12.4B</div>
                 <div className="text-[10px] font-black uppercase tracking-widest opacity-50">Available Capacity</div>
              </div>
           </div>
        </div>
        
        {/* Abstract Tech Patterns */}
        <div className="absolute bottom-0 right-0 w-1/3 h-full bg-gradient-to-l from-upwork-green/5 to-transparent pointer-events-none" />
      </section>

      {/* Directory Grid */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 -mt-10 sm:-mt-20 relative z-20">
        <div className="flex flex-col lg:flex-row gap-8 sm:gap-12">
           {/* Sidebar Filter */}
           <aside className="w-full lg:w-72 space-y-8 lg:sticky lg:top-32 h-fit">
              <div className="p-6 sm:p-10 bg-white rounded-[2rem] sm:rounded-[2.5rem] border border-gray-100 shadow-xl space-y-6 sm:space-y-8">
                 <h4 className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-upwork-dark">Filter Registry</h4>
                 <div className="space-y-6">
                    <div className="space-y-3">
                       <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Certification</p>
                       <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
                          {['ISO 9001', 'AS9100D', 'IATF 16949', 'Med-Grade'].map(c => (
                            <label key={c} className="flex items-center gap-3 cursor-pointer group">
                               <input type="checkbox" className="w-4 h-4 rounded border-gray-200 text-upwork-green focus:ring-upwork-green" />
                               <span className="text-xs sm:text-sm font-bold text-gray-500 group-hover:text-upwork-dark transition-colors">{c}</span>
                            </label>
                          ))}
                       </div>
                    </div>
                 </div>
              </div>
           </aside>

           {/* Results Feed */}
           <div className="flex-1 space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 {topSuppliers.map((s, i) => (
                   <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="p-6 sm:p-10 bg-white rounded-[2.5rem] sm:rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all group"
                   >
                     <div className="flex justify-between items-start mb-8">
                        <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center text-upwork-dark text-xl font-black group-hover:bg-upwork-dark group-hover:text-white transition-all">
                           {s.name.charAt(0)}
                        </div>
                        <div className="flex flex-col items-end gap-1">
                           <div className="flex items-center gap-1 bg-upwork-green/10 text-upwork-green px-3 py-1 rounded-full text-xs font-black">
                              <Star size={12} fill="currentColor" /> {s.rating}
                           </div>
                           <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Verified Log</span>
                        </div>
                     </div>
                     <div className="space-y-6">
                        <div>
                           <h3 className="text-xl sm:text-2xl font-black text-upwork-dark uppercase tracking-tight mb-2 group-hover:text-upwork-green transition-colors">{s.name}</h3>
                           <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                              <MapPin size={12} /> {s.location}
                           </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                           {s.tags.map(t => (
                             <span key={t} className="px-3 py-1 bg-gray-50 border border-gray-100 rounded-lg text-[10px] font-black uppercase tracking-tight text-gray-500">{t}</span>
                           ))}
                        </div>

                        <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                           <div className="space-y-1">
                              <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Protocol Capacity</p>
                              <p className="text-xs font-black uppercase text-upwork-dark flex items-center gap-2">
                                 <CheckCircle2 size={12} className="text-upwork-green" /> {s.capacity} Load
                              </p>
                           </div>
                           <button className="w-12 h-12 rounded-full bg-upwork-dark text-white flex items-center justify-center hover:bg-upwork-green hover:text-white transition-all">
                              <ChevronRight size={20} />
                           </button>
                        </div>
                     </div>
                   </motion.div>
                 ))}
              </div>
           </div>
        </div>
      </section>

    </div>
  );
};

export default Suppliers;

