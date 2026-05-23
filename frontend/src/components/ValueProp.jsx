import React from 'react';
import { motion } from 'framer-motion';

const ValueProp = () => {
  return (
    <section className="bg-upwork-dark text-white py-24 rounded-3xl mx-4 sm:mx-6 lg:mx-8 mb-24 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-upwork-green opacity-20 blur-3xl rounded-full transform translate-x-32 -translate-y-32" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-upwork-green opacity-10 blur-3xl rounded-full transform -translate-x-48 translate-y-32" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1">
          <h2 className="text-4xl lg:text-5xl font-bold mb-12">Procurement Excellence with Purchase Point</h2>
          <div className="space-y-10">
            <div className="flex items-start gap-4">
              <div className="mt-1 text-upwork-green font-bold text-2xl">✓</div>
              <div>
                <h3 className="text-xl font-bold mb-2">Automated RFQ Tracking</h3>
                <p className="text-gray-400 text-lg">Centralize all your sourcing requests. Monitor deadlines, supplier participation, and bid status in real-time.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="mt-1 text-upwork-green font-bold text-2xl">✓</div>
              <div>
                <h3 className="text-xl font-bold mb-2">Deep-Dive Analysis</h3>
                <p className="text-gray-400 text-lg">Detailed part and BOM level analysis. Compare unit prices, NRE costs, and calculate variance automatically.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="mt-1 text-upwork-green font-bold text-2xl">✓</div>
              <div>
                <h3 className="text-xl font-bold mb-2">Best-Price Selection</h3>
                <p className="text-gray-400 text-lg">Algorithmically identify the best suppliers. Maximize savings with rank-based supplier comparisons.</p>
              </div>
            </div>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            className="mt-12 bg-upwork-green text-white px-8 py-3 rounded-full text-lg font-bold hover:bg-upwork-green/90 transition-all shadow-md"
          >
            Start Saving Now
          </motion.button>
        </div>
        
        <div className="flex-1 relative">
           <div className="rounded-2xl overflow-hidden aspect-video bg-gray-800 flex items-center justify-center p-4">
              <div className="text-center">
                 <div className="text-6xl font-bold text-upwork-green mb-4">$15k+</div>
                 <div className="text-xl font-medium text-gray-300">Average Savings per RFQ Analysed</div>
              </div>
           </div>
           <div className="absolute -bottom-6 -right-6 bg-upwork-green p-4 rounded-xl shadow-2xl text-white">
              <div className="text-sm font-bold">Analysis Powered</div>
              <div className="text-xs opacity-80 font-medium">Bidding Portal 2024</div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default ValueProp;
