import React from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  BarChart3, 
  ShieldCheck, 
  Zap, 
  Globe, 
  Settings,
  ArrowRight
} from 'lucide-react';

const Solutions = () => {
  const categories = [
    {
      title: 'Strategic Sourcing',
      icon: <Zap />,
      desc: 'Connect with verified manufacturers using our proprietary vetting algorithm that balances cost, quality, and lead time.',
      status: 'Operational'
    },
    {
      title: 'Precision RFQ Lifecycle',
      icon: <Cpu />,
      desc: 'Transform ambiguous requirements into high-fidelity technical specs that global suppliers can bid on with 100% accuracy.',
      status: 'High Performance'
    },
    {
      title: 'Market Analytics',
      icon: <BarChart3 />,
      desc: 'Real-time benchmarking of industrial material costs and facility utilization rates across the global registry.',
      status: 'Live Sync'
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-20 sm:pt-24 pb-16 sm:pb-32 font-['Inter'] selection:bg-upwork-green selection:text-white">
      {/* Narrative Hero - Replicating the "Perfect" Spacing & Font Stack */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 mb-16 sm:mb-32 pt-10 sm:pt-16">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-upwork-green/10 text-upwork-green rounded-full text-[10px] font-black uppercase tracking-[0.2em]"
            >
              <Settings size={12} className="animate-spin-slow" /> System Solutions v4.0
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-7xl lg:text-8xl font-black text-upwork-dark tracking-tight leading-[0.95] uppercase"
            >
              Industrial <br/>Scale. <br/><span className="text-upwork-green">Smarter.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 font-medium leading-relaxed max-w-xl"
            >
              We provide the digital infrastructure for the world's most complex supply chains, bridging the gap between local production and global demand.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button className="px-10 py-5 bg-upwork-dark text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-upwork-green transition-all shadow-xl shadow-gray-200">
                Explore Protocol
              </button>
              <button className="px-10 py-5 border-2 border-upwork-dark text-upwork-dark rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-50 transition-all">
                Case Studies
              </button>
            </motion.div>
          </div>
          
          <div className="relative">
            <div className="aspect-[4/5] bg-gray-50 rounded-[2.5rem] sm:rounded-[4rem] border border-gray-100 overflow-hidden shadow-2xl relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-upwork-green/5 to-transparent opacity-50" />
              <div className="absolute top-8 left-8 sm:top-12 sm:left-12 space-y-2">
                 <div className="w-12 h-1.5 bg-upwork-green rounded-full" />
                 <div className="w-8 h-1.5 bg-upwork-green/30 rounded-full" />
              </div>
              <div className="p-8 sm:p-16 flex flex-col justify-end h-full relative z-10">
                 <h2 className="text-2xl sm:text-4xl font-black text-upwork-dark uppercase tracking-tight mb-4">The Unified <br/>Registry Hub</h2>
                 <p className="text-xs sm:text-sm font-medium text-gray-400 max-w-xs leading-relaxed">Connecting 14,000+ verified production nodes into a single strategic source.</p>
              </div>
               {/* Decorative Grid */}
               <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(#e5e7eb 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
            </div>
            {/* Float Card */}
            <motion.div 
               animate={{ y: [0, -10, 0] }}
               transition={{ duration: 4, repeat: Infinity }}
               className="absolute -right-8 top-1/2 -translate-y-1/2 p-8 bg-white rounded-3xl shadow-2xl border border-gray-100 max-w-[240px] hidden xl:block"
            >
               <ShieldCheck className="text-upwork-green mb-4" size={32} />
               <p className="text-xs font-black text-upwork-dark uppercase tracking-widest mb-2">Security Node</p>
               <p className="text-[10px] text-gray-400 font-medium leading-relaxed">All transaction payloads are encrypted using enterprise-grade SSL and ISO/IEC 27001 standards.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="bg-gray-50 py-16 sm:py-32 px-4 sm:px-6">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 sm:mb-24 gap-8 sm:gap-12">
            <div className="space-y-4">
               <h2 className="text-[10px] font-black text-upwork-green uppercase tracking-[0.4em]">Core Capabilities</h2>
               <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-upwork-dark uppercase tracking-tighter leading-[0.9] !leading-none">Engineered for <br/>Certainty.</h3>
            </div>
            <p className="text-sm sm:text-base md:text-lg text-gray-400 font-medium max-w-sm">Every layer of our stack is designed to reduce the friction of industrial commerce.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {categories.map((c, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="p-8 sm:p-12 bg-white rounded-[2.5rem] sm:rounded-[3.5rem] border border-gray-100 shadow-sm space-y-8 sm:space-y-10 group transition-all hover:shadow-xl"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl bg-gray-50 flex items-center justify-center text-upwork-green group-hover:bg-upwork-dark transition-colors duration-500">
                  {React.cloneElement(c.icon, { size: 24, className: 'sm:w-8 sm:h-8' })}
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-upwork-green" />
                     <span className="text-[9px] font-black text-upwork-green uppercase tracking-widest">{c.status}</span>
                  </div>
                  <h4 className="text-2xl sm:text-3xl font-black text-upwork-dark tracking-tighter uppercase leading-tight">{c.title}</h4>
                  <p className="text-sm sm:text-base text-gray-500 font-medium leading-relaxed">{c.desc}</p>
                </div>
                <button className="flex items-center gap-3 text-[10px] font-black text-upwork-dark uppercase tracking-widest group-hover:text-upwork-green transition-colors">
                  Learn More <ArrowRight size={14} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure CTA */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 mt-16 sm:mt-32">
        <div className="p-8 sm:p-20 bg-upwork-dark rounded-[3rem] sm:rounded-[4rem] text-center space-y-10 relative overflow-hidden">
          <div className="relative z-10">
             <h2 className="text-3xl md:text-5xl lg:text-7xl font-black text-white tracking-tight leading-tight uppercase">Ready to Optimize <br className="hidden sm:block"/>Your Network?</h2>
             <p className="text-white/60 font-medium max-w-xl mx-auto mt-6 text-lg sm:text-xl">Join the elite global registry and start sourcing with technical precision today.</p>
             <div className="flex flex-col sm:flex-row justify-center gap-6 mt-12">
                  <button className="px-12 py-5 bg-upwork-green text-upwork-dark rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">
                    Register Facility
                  </button>
                  <button className="px-12 py-5 bg-white/10 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/20 transition-all">
                    Contact Specialist
                  </button>
               </div>
            </div>
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-upwork-green/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2" />
         </div>
      </section>
    </div>
  );
};

export default Solutions;
