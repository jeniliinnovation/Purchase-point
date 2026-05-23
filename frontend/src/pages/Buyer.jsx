import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Target, 
  FileText, 
  CheckCircle, 
  ArrowRight, 
  BarChart, 
  Settings, 
  Mail, 
  RefreshCw, 
  Layers,
  Activity,
  Box
} from 'lucide-react';

const Buyer = () => {
  return (
    <div className="min-h-screen bg-white font-['Inter'] selection:bg-black selection:text-white">
      {/* Hero: The Procurement OS */}
      <section className="relative pt-10 sm:pt-16 pb-16 sm:pb-32 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-12 sm:gap-20">
          <div className="lg:w-1/2 space-y-10 relative z-10">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-upwork-green/10 text-upwork-green rounded-full text-[10px] font-black uppercase tracking-[0.2em]"
            >
              <Activity size={14} className="animate-spin-slow" /> Operational Interface v2.0
            </motion.div>
            <h1 className="text-4xl md:text-7xl lg:text-8xl font-black text-upwork-dark tracking-tight leading-[0.95] uppercase">
              Procurement <br/>Scale <br/><span className="text-upwork-green">Operated.</span>
            </h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-500 font-medium leading-relaxed max-w-xl"
            >
              Eliminate the chaos of custom manufacturing. Track revisions, manage milestones, and secure your supply chain through one high-integrity portal.
            </motion.p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register" className="px-10 py-5 bg-upwork-dark text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-upwork-green transition-all shadow-xl shadow-gray-200">
                Deploy Facility
              </Link>
              <button className="px-10 py-5 border-2 border-upwork-dark text-upwork-dark rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-50 transition-all">
                Talk to Sales
              </button>
            </div>
          </div>
          
          <div className="lg:w-1/2 relative space-y-4">
            <div className="absolute inset-0 bg-upwork-green/5 blur-[120px] rounded-full" />
            
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8 bg-gray-50 rounded-[3rem] sm:rounded-[4rem] border border-gray-100">
              {[
                { icon: BarChart, title: "Analytics", desc: "Track performance easily" },
                { icon: Settings, title: "Settings", desc: "Customize your workflow" },
                { icon: Mail, title: "Communication", desc: "Stay connected with clients" },
                { icon: RefreshCw, title: "Sync", desc: "Real-time updates" }
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    className="p-8 bg-white rounded-3xl shadow-sm border border-gray-100 space-y-4 hover:-translate-y-2 transition-transform cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-upwork-green">
                      <Icon size={24} />
                    </div>

                    <h4 className="text-sm font-black text-upwork-dark uppercase tracking-tight">
                      {item.title}
                    </h4>

                    <p className="text-xs text-gray-500 font-medium leading-relaxed">
                      {item.desc}
                    </p>

                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Feature Schematic */}
      <section className="py-16 sm:py-32 bg-upwork-dark text-white rounded-t-[3rem] sm:rounded-t-[5rem]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-12 mb-24">
             <div className="space-y-6">
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">The Hardware <br/>Control Stack.</h2>
                <div className="w-24 h-2 bg-upwork-green rounded-full" />
             </div>
             <p className="text-xl text-gray-500 font-bold max-w-sm">One unified protocol for engineering drawing management & fulfillment.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-12">
            {[
              { title: 'Revision Sync', desc: 'Auto-broadcast CAD updates to all active bidders instantly.', icon: <RefreshCw /> },
              { title: 'Milestone Trust', desc: 'Capital is released only upon verifiable production completion.', icon: <CheckCircle /> },
              { title: 'Component Log', desc: 'Full traceability from raw materials to final assembly QC.', icon: <Layers /> }
            ].map((f, i) => (
              <div key={i} className="group space-y-6 sm:space-y-8 p-8 sm:p-12 bg-white/5 rounded-[2.5rem] sm:rounded-[3rem] border border-white/10 hover:border-upwork-green transition-all">
                 <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/10 flex items-center justify-center text-upwork-green group-hover:bg-upwork-green group-hover:text-black transition-all">
                   {f.icon}
                 </div>
                 <div className="space-y-4">
                    <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight">{f.title}</h3>
                    <p className="text-sm sm:text-base text-gray-400 font-medium leading-relaxed">{f.desc}</p>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Summary: Different background */}
      <section className="py-16 sm:py-32 bg-gray-50 px-4 sm:px-6">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
           <div className="relative aspect-square max-w-[500px] mx-auto w-full">
              <div className="absolute inset-0 border-[20px] sm:border-[40px] border-upwork-dark/5 rounded-[3rem] sm:rounded-[5rem] animate-pulse" />
              <div className="absolute inset-8 sm:inset-12 bg-white rounded-[2rem] sm:rounded-[4rem] shadow-2xl flex items-center justify-center border border-gray-100">
                 <Box className="w-20 h-20 sm:w-32 sm:h-32 text-gray-100" />
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4 w-full">
                    <div className="px-5 py-1.5 sm:px-6 sm:py-2 bg-upwork-dark text-white text-[8px] sm:text-[10px] font-black uppercase tracking-widest rounded-full">Secure Node</div>
                    <p className="text-[9px] sm:text-xs font-black uppercase tracking-widest text-gray-400 italic">Enterprise Certified</p>
                 </div>
              </div>
           </div>
           <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
              <h2 className="text-4xl sm:text-5xl font-black text-upwork-dark tracking-tighter uppercase leading-none md:!leading-[0.9]">Designed for <br/>Global Scale.</h2>
              <div className="space-y-4 sm:space-y-6 text-left inline-block">
                 {[
                   'Granular Permission Control',
                   'Native ERP Integrations (Coming Soon)',
                   'Instant DFM Compatibility Check',
                   'Multi-Site Fulfillment Support'
                 ].map((t, i) => (
                   <div key={i} className="flex items-center gap-4 group">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-upwork-green group-hover:bg-upwork-green group-hover:text-white transition-all shrink-0">
                        <CheckCircle size={14} className="sm:hidden" />
                        <CheckCircle size={16} className="hidden sm:block" />
                      </div>
                      <span className="text-sm sm:text-base font-bold text-gray-600 tracking-tight">{t}</span>
                   </div>
                 ))}
              </div>
              <div className="pt-4">
                <Link to="/register" className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-widest text-upwork-dark hover:gap-6 transition-all">
                   Explore Registry Details <ArrowRight size={16} className="text-upwork-green" />
                </Link>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Buyer;
