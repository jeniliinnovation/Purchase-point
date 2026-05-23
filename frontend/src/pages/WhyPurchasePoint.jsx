import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Cpu, 
  ShieldAlert, 
  BarChart3, 
  Network, 
  Clock, 
  ArrowUpRight,
  Database,
  Layers
} from 'lucide-react';

const WhyPurchasePoint = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-['Inter'] selection:bg-upwork-green selection:text-black">
      {/* Blueprint Hero */}
      <section className="relative min-h-[80vh] sm:h-screen flex items-center overflow-hidden border-b border-white/5 pt-20 sm:pt-0">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a]" />
        
        {/* Animated Background Lines */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-upwork-green to-transparent animate-pulse" />
          <div className="absolute top-2/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-pulse delay-700" />
        </div>

        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10 w-full">
          <div className="grid lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8 space-y-10">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/10 bg-white/5 text-[10px] font-black uppercase tracking-[0.4em] text-upwork-green"
              >
                <div className="w-2 h-2 rounded-full bg-upwork-green animate-ping" />
                Network Architecture v1.02
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight leading-tight uppercase whitespace-normal"
              >
                Why <span className="text-upwork-green">Scale</span> <br/>With Us?
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-base sm:text-lg md:text-xl text-gray-400 font-medium max-w-2xl leading-relaxed"
              >
                Purchase Point isn't just a marketplace. It's an industrial operating system designed to eliminate the inherent risks of global manufacturing procurement.
              </motion.p>
            </div>
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <Link to="/register" className="group relative w-32 h-32 sm:w-44 sm:h-44 rounded-full border border-white/20 flex items-center justify-center hover:border-upwork-green hover:bg-upwork-green transition-all duration-500 overflow-hidden">
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest relative z-10 group-hover:text-black">Join Node</span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The Technical Mosaic */}
      <section className="py-32 max-w-[1440px] mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Data-Heavy */}
          <div className="md:col-span-2 p-8 sm:p-12 bg-white/5 rounded-[2.5rem] sm:rounded-[3rem] border border-white/10 flex flex-col justify-between group hover:bg-white/10 transition-all">
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-xl bg-upwork-green flex items-center justify-center text-black">
                <Database size={24} />
              </div>
              <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter">Unified Spec Ledger</h3>
              <p className="text-sm sm:text-base text-gray-400 font-medium max-w-md">Every RFQ is parsed into a high-fidelity data packet, ensuring zero misinterpretation of technical tolerances across international borders.</p>
            </div>
            <div className="flex gap-4 mt-12 overflow-hidden border-t border-white/10 pt-8 mt-12">
               {[1,2,3,4].map(i => (
                 <div key={i} className="h-2 w-12 bg-white/10 rounded-full" />
               ))}
            </div>
          </div>

          {/* Card 2: Vertical */}
          <div className="p-8 sm:p-12 bg-upwork-green rounded-[2.5rem] sm:rounded-[3rem] text-black space-y-12">
             <div className="flex justify-between items-start">
                <ShieldAlert size={32} className="sm:hidden" />
                <ShieldAlert size={48} className="hidden sm:block" />
                <div className="text-[10px] font-black uppercase tracking-widest border border-black/20 px-3 py-1 rounded-full">Secure</div>
             </div>
             <div className="space-y-4">
                <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter leading-none">Vetting <br/>Protocol</h3>
                <p className="text-xs sm:text-sm font-bold opacity-80 leading-relaxed italic">"The top 1% of manufacturers, independently audited by our technical hub."</p>
             </div>
          </div>

          {/* Card 3: Metrics Mosaic */}
          <div className="p-12 border border-white/10 rounded-[3rem] space-y-12">
             <div className="space-y-4">
               <div className="text-7xl font-black tracking-tighter text-upwork-green">99.8%</div>
               <p className="text-xs font-black uppercase tracking-widest text-gray-500 leading-relaxed">System-wide on-time precision delivery recorded for Q1 2024.</p>
             </div>
             <div className="h-px bg-white/10" />
             <div className="flex items-center gap-4 text-gray-400">
               <Clock size={20} />
               <span className="text-sm font-bold">48hr Avg. Capture Time</span>
             </div>
          </div>

          {/* Card 4: Abstract Graphic */}
          <div className="md:col-span-2 p-12 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-[3rem] border border-white/10 flex items-center gap-12 overflow-hidden relative">
             <div className="space-y-6 relative z-10 max-w-sm">
                <h3 className="text-4xl font-black uppercase tracking-tighter">Global <br/>Mesh Network</h3>
                <p className="text-gray-400 font-medium">Connect multiple production facilities into one unified dashboard. Multi-site procurement, simplified.</p>
             </div>
             <div className="hidden lg:block relative z-10 flex-1">
                <div className="grid grid-cols-4 gap-2">
                   {[...Array(16)].map((_, i) => (
                     <div key={i} className="aspect-square bg-white/5 border border-white/10 rounded-lg animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
                   ))}
                </div>
             </div>
             <div className="absolute top-0 right-0 w-64 h-64 bg-upwork-green/10 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>
      </section>

      {/* Corporate Callout with different aesthetic */}
      <section className="py-16 sm:py-32 bg-white text-black px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-12 sm:space-y-16">
          <div className="flex flex-col md:flex-row gap-8 sm:gap-12 items-start">
             <h2 className="text-4xl sm:text-5xl font-black tracking-tighter uppercase leading-[0.9] flex-1">Optimized <br/>For the <br/>Enterprise Hub.</h2>
             <div className="flex-1 space-y-6">
                <p className="text-base sm:text-lg md:text-xl font-bold leading-relaxed text-gray-600">
                  Large organizations require strict compliance and deep visibility. Our enterprise tier provides custom governance models and API-driven data export.
                </p>
                <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest">
                   <Link to="/resources/pricing" className="text-upwork-dark underline decoration-2 underline-offset-4">View All Tiers</Link>
                   <ArrowUpRight size={16} />
                </div>
             </div>
          </div>
          <div className="h-px bg-gray-100" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
             {['Rigorous Audits', 'API Access', 'Custom Escrow', 'Priority Sync'].map((t, i) => (
               <div key={i} className="space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center"><Layers size={16} /></div>
                  <div className="text-[10px] font-black uppercase tracking-tighter">{t}</div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Styled Footer for this specific page */}
      <section className="py-24 bg-upwork-green text-black text-center overflow-hidden relative">
         <motion.div 
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           className="space-y-8 relative z-10"
         >
           <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none">Ready to <br/>Integrate?</h2>
           <Link to="/register" className="inline-block px-12 py-5 bg-black text-white rounded-2xl font-black text-xs uppercase tracking-[0.4em] shadow-2xl hover:scale-110 active:scale-95 transition-all">
             Begin Onboarding
           </Link>
         </motion.div>
         <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/microfab.png')] opacity-10 pointer-events-none" />
      </section>
    </div>
  );
};

export default WhyPurchasePoint;
