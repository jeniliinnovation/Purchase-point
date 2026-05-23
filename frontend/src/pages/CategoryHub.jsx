import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Settings, 
  Truck, 
  Package, 
  BarChart3, 
  ChevronRight, 
  ShieldCheck, 
  Globe2, 
  Activity 
} from 'lucide-react';

const categories = {
  electronics: {
    title: 'Electronics & Semiconductors',
    icon: <Zap className="w-12 h-12 text-blue-500" />,
    desc: 'High-precision components and chipsets for global industrial applications.',
    details: [
      'Verified semiconductor supply chains',
      'Quality assurance for mission-critical parts',
      'Real-time inventory tracking and lead-time alerts',
      'Compliance with international electronic standards'
    ],
    bg: 'bg-blue-50/50'
  },
  mechanical: {
    title: 'Mechanical & Hardware',
    icon: <Settings className="w-12 h-12 text-orange-500" />,
    desc: 'Heavy-duty machinery, precision tools, and structural hardware solutions.',
    details: [
      'Custom fabrication and assembly services',
      'Material certification for steel and alloys',
      'Maintenance and spare parts distribution',
      'Bulk procurement strategies for OEM'
    ],
    bg: 'bg-orange-50/50'
  },
  logistics: {
    title: 'Supply Chain & Logistics',
    icon: <Truck className="w-12 h-12 text-green-500" />,
    desc: 'Global freight, warehousing, and intelligent logistics management.',
    details: [
      'End-to-end multi-modal transport orchestration',
      'Customs clearance and regulatory compliance',
      'Last-mile delivery for industrial sites',
      'Real-time shipment visibility and geofencing'
    ],
    bg: 'bg-green-50/50'
  },
  'direct-materials': {
    title: 'Direct Materials',
    icon: <Package className="w-12 h-12 text-purple-500" />,
    desc: 'Raw materials, chemicals, and foundational processed goods.',
    details: [
      'Vetted raw material suppliers',
      'Sustainable sourcing certifications',
      'Volatility hedging and price protection',
      'Just-in-time delivery for production lines'
    ],
    bg: 'bg-purple-50/50'
  },
  'savings-reports': {
    title: 'Savings & Analytics',
    icon: <BarChart3 className="w-12 h-12 text-teal-500" />,
    desc: 'Advanced intelligence for procurement optimization and cost reduction.',
    details: [
      'Spend analysis and historical price tracking',
      'Automated RFP comparison scores',
      'Carbon footprint impact reporting',
      'Custom ROI projections for long-term contracts'
    ],
    bg: 'bg-teal-50/50'
  }
};

const CategoryHub = () => {
  const { categoryId } = useParams();
  const activeCategory = categories[categoryId] || categories.electronics;

  return (
    <div className="min-h-screen bg-white font-['Inter']">
      {/* Cinematic Hero */}
      <section className={`relative overflow-hidden py-24 ${activeCategory.bg}`}>
        <div className="max-w-[1440px] mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-100 shadow-sm text-xs font-black uppercase tracking-widest text-gray-500">
              <Activity size={14} className="text-upwork-green" />
              Industrial Domain : {categoryId ? categoryId.replace('-', ' ') : 'Select Segment'}
            </div>
            <h1 className="text-6xl font-black text-upwork-dark tracking-tighter leading-none">
              {activeCategory.title}
            </h1>
            <p className="text-xl text-gray-600 font-medium max-w-lg leading-relaxed">
              {activeCategory.desc}
            </p>
            <div className="flex gap-4 pt-4">
              <Link 
                to="/register" 
                className="px-10 py-5 bg-upwork-dark text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-upwork-dark/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Access Registry
              </Link>
              <button className="px-10 py-5 bg-white border-2 border-upwork-dark text-upwork-dark rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-gray-50 transition-all">
                View RFQs
              </button>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex justify-center"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-white/20 blur-[100px] rounded-full group-hover:bg-white/40 transition-all duration-1000" />
              <div className="w-80 h-80 md:w-96 md:h-96 bg-white rounded-[3rem] shadow-2xl flex items-center justify-center relative z-10 border border-gray-100">
                {activeCategory.icon}
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Background Patterns */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />
      </section>

      {/* Full Detail Content */}
      <section className="py-24 max-w-[1440px] mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-12">
            <div>
              <h2 className="text-3xl font-black text-upwork-dark uppercase tracking-tight mb-8">Service Capabilities</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {activeCategory.details.map((detail, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ x: 5 }}
                    className="p-6 bg-gray-50 rounded-[2rem] border border-gray-100 flex gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:bg-upwork-green transition-colors">
                      <ChevronRight className="w-5 h-5 group-hover:text-white transition-colors" />
                    </div>
                    <p className="flex-1 text-sm font-bold text-gray-700 leading-snug">{detail}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="p-12 bg-upwork-dark rounded-[3rem] text-white overflow-hidden relative">
               <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                  <div>
                    <h3 className="text-4xl font-black tracking-tight mb-2">Ready to Optimize?</h3>
                    <p className="text-gray-400 font-medium">Connect with vetted suppliers in the {categoryId?.replace('-', ' ')} domain today.</p>
                  </div>
                  <Link to="/register" className="px-10 py-5 bg-upwork-green text-upwork-dark rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-upwork-green/20 hover:scale-105 active:scale-95 transition-all">
                    Register Facility
                  </Link>
               </div>
               <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2" />
            </div>
          </div>

          <aside className="space-y-8">
            <div className="p-8 bg-gray-50 rounded-[2rem] border border-gray-100 space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-upwork-green">Segment Nav</h4>
              <div className="space-y-2">
                {Object.keys(categories).map((catId) => (
                  <Link 
                    key={catId} 
                    to={`/category/${catId}`}
                    className={`block w-full p-4 rounded-xl font-bold text-sm transition-all ${catId === categoryId ? 'bg-white border border-gray-200 shadow-sm text-upwork-dark translate-x-1' : 'text-gray-400 hover:text-upwork-dark hover:bg-white/50'}`}
                  >
                    {categories[catId].title}
                  </Link>
                ))}
              </div>
            </div>

            <div className="p-8 border-2 border-gray-100 rounded-[2rem] space-y-6">
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-upwork-green" />
                <span className="text-sm font-black text-upwork-dark uppercase tracking-tight">Enterprise Verified</span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed font-medium">All components and service providers in this domain undergo a strict high-integrity verification protocol.</p>
              <div className="flex items-center gap-4 text-xs font-black text-upwork-dark uppercase tracking-widest pt-2">
                <Globe2 size={16} /> Global Hub
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};

export default CategoryHub;
