import React from 'react';
import { motion } from 'framer-motion';
import heroIllustration from '../assets/hero-illustration.png';

const Hero = () => {
  return (
    <section className="relative bg-white pt-16 pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center">
        {/* Text Content */}
        <div className="flex-1 text-center lg:text-left z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold text-upwork-green leading-tight tracking-tight mb-6 px-4 sm:px-0"
          >
            The Intelligence Behind Strategic Sourcing
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl lg:text-2xl text-upwork-gray font-medium mb-10 max-w-2xl px-6 sm:px-0"
          >
            Streamline your RFQ lifecycle, analyze supplier quotes with precision, and maximize your procurement savings.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center lg:justify-start"
          >
            <button className="bg-upwork-green text-white px-8 py-3 rounded-full text-lg font-bold hover:bg-upwork-green/90 transition-all shadow-md">
              Launch Bidding
            </button>
            <button className="border-2 border-upwork-green text-upwork-green px-8 py-3 rounded-full text-lg font-bold hover:bg-upwork-green/5 transition-all">
              Track Active RFQs
            </button>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-12 flex items-center justify-center lg:justify-start space-x-8"
          >
            <div className="text-sm text-gray-500 uppercase tracking-widest font-bold">Industry Leaders Use Purchase Point</div>
            <div className="flex space-x-6 text-gray-400 font-serif italic text-xl">
              <span>Siemens</span>
              <span>Bosch</span>
              <span>Intel</span>
            </div>
          </motion.div>
        </div>

        {/* Hero Image / Illustration */}
        <div className="flex-1 relative mt-16 lg:mt-0 lg:ml-12 w-full max-w-2xl">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="rounded-3xl overflow-hidden bg-upwork-light-gray h-[400px] lg:h-[500px] relative shadow-2xl"
          >
             <img src={heroIllustration} alt="Procurement Sourcing Illustration" className="w-full h-full object-cover" />
             <div className="absolute bottom-8 left-8 bg-white p-6 rounded-2xl shadow-xl max-w-xs border border-gray-100">
                <div className="flex items-center space-x-3 mb-3">
                   <div className="w-10 h-10 rounded-full bg-upwork-green/20" />
                   <div>
                      <div className="text-sm font-bold text-upwork-dark">Sourcing Pro</div>
                      <div className="text-xs text-upwork-gray font-semibold">Verified Buyer</div>
                   </div>
                </div>
                <div className="text-sm text-upwork-dark italic leading-relaxed">
                   "Purchase Point has reduced our RFQ cycle time by 40% while uncovering hidden savings."
                </div>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

