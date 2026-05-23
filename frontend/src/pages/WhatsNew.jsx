import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Zap, Target, Globe, Milestone } from 'lucide-react';

const WhatsNew = () => {
  const updates = [
    { 
      date: 'April 02, 2024', 
      tag: 'Core Protocol', 
      title: 'AI-Powered RFQ Decomposition', 
      desc: 'Our new engine automatically parses 3D models and PDF technical specs to generate structured BOMs and tolerance reports instantly.',
      icon: <Zap size={20} className="text-upwork-green" />,
      color: 'bg-upwork-green/5'
    },
    { 
      date: 'March 15, 2024', 
      tag: 'Marketplace', 
      title: 'Milestone-Based Escrow Release', 
      desc: 'Suppliers can now receive partial payments upon verified completion of project stages (Tooling, Batch 1, Final QA).',
      icon: <Milestone size={20} className="text-blue-500" />,
      color: 'bg-blue-50'
    },
    { 
      date: 'February 28, 2024', 
      tag: 'Global Expansion', 
      title: 'European Logistics Hub Activation', 
      desc: 'Strategic partnerships with EU customs brokers now enable 48-hour clearance for all industrial shipments originating from our verified SE Asian nodes.',
      icon: <Globe size={20} className="text-purple-500" />,
      color: 'bg-purple-50'
    },
    { 
      date: 'January 10, 2024', 
      tag: 'Registry', 
      title: '12,000 Verified Facility Node', 
      desc: 'A major network milestone. Our registry now covers significant production capacity in every major industrial corridor worldwide.',
      icon: <Target size={20} className="text-orange-500" />,
      color: 'bg-orange-50'
    }
  ];

  return (
    <div className="min-h-screen bg-white font-['Inter'] py-12 sm:py-24">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Static Sidebar Header */}
          <aside className="lg:w-1/3 lg:sticky lg:top-32 h-fit space-y-8 sm:space-y-10">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-7xl font-black text-upwork-dark tracking-tight uppercase leading-[0.95]">
                Log <br/><span className="text-gray-300">Of the</span> <br/>Core.
              </h1>
              <p className="text-lg md:text-xl text-gray-400 font-medium leading-relaxed max-w-sm">
                Real-time updates on platform architecture, industrial policy changes, and ecosystem growth.
              </p>
            </div>
            <div className="p-6 sm:p-8 bg-gray-50 rounded-[2rem] sm:rounded-[2.5rem] border border-gray-100 italic font-medium text-gray-400 text-sm md:text-base">
              "Continuous optimization of the industrial supply chain."
            </div>
          </aside>

          {/* Timeline Feed */}
          <div className="flex-1 relative">
            {/* Timeline Line */}
            <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-gray-100 via-gray-100 to-transparent rounded-full" />

            <div className="space-y-12 sm:space-y-16 ml-12 sm:ml-16">
              {updates.map((update, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="relative space-y-4 sm:space-y-6"
                >
                  {/* Timeline Dot */}
                  <div className="absolute -left-[48px] sm:-left-[52px] top-1.5 w-6 h-6 sm:w-8 sm:h-8 rounded-full border-4 border-white bg-upwork-dark flex items-center justify-center">
                     <div className="w-1.5 h-1.5 sm:w-2 h-2 rounded-full bg-upwork-green shadow-[0_0_10px_#6fda44]" />
                  </div>

                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-4">
                       <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">{update.date}</span>
                       <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${update.color} border border-black/5`}>
                          {update.tag}
                       </span>
                    </div>
                    <div className="h-px bg-gray-100 flex-1 hidden md:block" />
                  </div>

                  <div className="p-6 sm:p-10 bg-white border border-gray-100 rounded-[2.5rem] sm:rounded-[3rem] shadow-sm hover:shadow-xl hover:border-upwork-green/20 transition-all group">
                    <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
                       <div className={`w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-2xl ${update.color} flex items-center justify-center border border-black/5`}>
                          {React.cloneElement(update.icon, { size: 18 })}
                       </div>
                       <div className="space-y-4">
                          <h2 className="text-2xl sm:text-3xl font-black text-upwork-dark uppercase tracking-tight group-hover:text-upwork-green transition-colors leading-tight">
                            {update.title}
                          </h2>
                          <p className="text-gray-500 font-medium leading-relaxed text-base sm:text-lg">
                            {update.desc}
                          </p>
                          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-upwork-dark pt-2 cursor-pointer hover:gap-4 transition-all">
                             Protocol Details <ArrowRight size={14} className="text-upwork-green" />
                          </div>
                       </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsNew;
