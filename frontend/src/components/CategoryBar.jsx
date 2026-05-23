import React from 'react';
import { motion } from 'framer-motion';

const categories = [
  { 
    name: 'Electronics & PCB', 
    description: 'Connectors, Microcontrollers, and PCB Fabrication',
    icon: '📱', 
    count: '12 Active RFQs',
    trend: '+5% last week',
    color: 'bg-blue-50'
  },
  { 
    name: 'Mechanical Parts', 
    description: 'CNC Machining, Injection Molding, and Casting',
    icon: '⚙️', 
    count: '24 Active RFQs',
    trend: '+12% last week',
    color: 'bg-orange-50'
  },
  { 
    name: 'Raw Materials', 
    description: 'Steel, Aluminum, and Specialized Composites',
    icon: '🪵', 
    count: '8 Active RFQs',
    trend: 'Steady',
    color: 'bg-amber-50'
  },
  { 
    name: 'Logistics Services', 
    description: 'Global Freight, Warehousing, and Last-mile',
    icon: '🚛', 
    count: '15 Active RFQs',
    trend: '+8% last week',
    color: 'bg-green-50'
  },
  { 
    name: 'Direct Sourcing', 
    description: 'High-volume contract manufacturing',
    icon: '🏗️', 
    count: '6 Active RFQs',
    trend: 'High Priority',
    color: 'bg-purple-50'
  },
  { 
    name: 'Procurement Consulting', 
    description: 'Strategic sourcing & vendor audit services',
    icon: '🤝', 
    count: '4 Active RFQs',
    trend: 'New',
    color: 'bg-emerald-50'
  }
];

const CategoryBar = () => {
  return (
    <section className="bg-white py-24 relative overflow-hidden">
      {/* Subtle organic line background */}
      <div className="absolute inset-x-0 top-0 z-0 h-full w-full pointer-events-none opacity-10">
        <svg viewBox="0 0 1440 800" className="w-full h-full shrink-0">
          <path 
            fill="none" 
            stroke="#14a800" 
            strokeWidth="1.5" 
            d="M-100,200 Q200,400 500,200 T1100,200 T1600,200" 
            className="opacity-40"
          />
          <path 
            fill="none" 
            stroke="#14a800" 
            strokeWidth="1.2" 
            d="M-100,250 Q200,450 500,250 T1100,250 T1600,250" 
            className="opacity-20"
          />
          <path 
            fill="none" 
            stroke="#14a800" 
            strokeWidth="1" 
            d="M-50,300 Q250,500 550,300 T1150,300 T1650,300" 
            className="opacity-10"
          />
        </svg>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl lg:text-5xl font-bold text-upwork-dark mb-4 tracking-tight">Marketplace of Sourcing Opportunities</h2>
            <p className="text-xl text-upwork-gray font-medium">Explore active bidding rounds across global industrial sectors. Join top-tier suppliers today.</p>
          </div>
          <button className="text-upwork-green font-bold text-lg hover:underline flex items-center group transition-all">
             Browse all sectors <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -10, boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)' }}
              className="p-8 rounded-[2.5rem] bg-upwork-card transition-all cursor-pointer group relative overflow-hidden flex flex-col justify-between"
            >
              {/* Subtle accent color bar */}
              <div className={`absolute top-0 left-0 w-2 h-full ${cat.color}`} />
              
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className={`w-16 h-16 rounded-3xl ${cat.color} flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform`}>
                    {cat.icon}
                  </div>
                  <div className="text-xs font-bold px-3 py-1 rounded-full bg-upwork-light-gray text-upwork-green">
                    {cat.trend}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-upwork-dark mb-3 group-hover:text-upwork-green transition-colors">{cat.name}</h3>
                <p className="text-upwork-gray font-medium mb-8 leading-relaxed">
                   {cat.description}
                </p>
              </div>
              
              <div className="pt-6 border-t border-gray-50 flex justify-between items-center text-sm font-bold text-upwork-dark">
                <span>{cat.count}</span>
                <span className="text-upwork-green opacity-0 group-hover:opacity-100 transition-opacity">View Details</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CategoryBar;
