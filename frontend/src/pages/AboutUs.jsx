import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Users, Target, ShieldCheck, TrendingUp, Cpu } from 'lucide-react';

const AboutUs = () => {
  const values = [
    { title: 'Global Reach', icon: <Globe />, desc: 'Connecting facilities across 6 continents and 140+ countries.' },
    { title: 'Human Intelligence', icon: <Users />, desc: 'A team of expert engineers vetting every complex project.' },
    { title: 'Precision First', icon: <Target />, desc: 'Data accuracy that drives down error rates in industrial bidding.' }
  ];

  return (
    <div className="min-h-screen bg-white pt-24 pb-32 font-['Outfit'] tracking-wide">
      {/* Narrative Section */}
      <section className="max-w-[1440px] mx-auto px-6 mb-32">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <h1 className="text-6xl md:text-7xl font-black text-upwork-dark tracking-tight leading-tight uppercase">
              The Engine <br/>of Global <br/><span className="text-upwork-green">Sourcing.</span>
            </h1>
            <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-lg">
              Purchase Point was built to bridge the gap between high-fidelity engineering and global procurement scale. We believe that transparency drives efficiency.
            </p>
            <div className="flex gap-12 pt-4">
              <div>
                <div className="text-4xl font-black text-upwork-dark mb-1">14k+</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">Verified Facilities</div>
              </div>
              <div>
                <div className="text-4xl font-black text-upwork-dark mb-1">$2.4B</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">RFQ Volume Index</div>
              </div>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-upwork-green/5 blur-[100px] rounded-full group-hover:bg-upwork-green/10 transition-all duration-1000" />
            <div className="relative aspect-square bg-gray-50 rounded-[4rem] border border-gray-100 overflow-hidden shadow-2xl flex items-center justify-center p-20">
              <Cpu className="w-full h-full text-gray-200" />
              <div className="absolute bottom-12 left-12 p-8 bg-white rounded-3xl shadow-xl border border-gray-100 max-w-xs space-y-4">
                <ShieldCheck className="text-upwork-green" size={32} />
                <p className="text-xs font-bold text-gray-600 leading-relaxed uppercase tracking-tight">Verified by the Global Industrial Registry Consortium</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="bg-gray-50 py-32 px-6">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl font-black text-upwork-dark uppercase tracking-tight">Core Protocol Values</h2>
            <div className="w-20 h-1.5 bg-upwork-green mx-auto rounded-full" />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="p-12 bg-white rounded-[3rem] border border-gray-100 shadow-sm space-y-8"
              >
                <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center text-upwork-green">
                  {v.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-black text-upwork-dark mb-4 tracking-tight">{v.title}</h3>
                  <p className="text-gray-500 font-medium leading-relaxed">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission / Call to Action */}
      <section className="max-w-[1200px] mx-auto px-6 mt-32">
        <div className="p-16 md:p-24 bg-upwork-dark rounded-[4rem] text-white overflow-hidden relative">
          <div className="relative z-10 text-center space-y-10">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight">Join the Elite Industrial <br/>Registry Network.</h2>
            <div className="flex justify-center gap-6">
              <button className="px-12 py-5 bg-upwork-green text-upwork-dark rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-upwork-green/20 hover:scale-105 active:scale-95 transition-all">
                Register Now
              </button>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-upwork-green opacity-5 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-white opacity-5 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2" />
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
