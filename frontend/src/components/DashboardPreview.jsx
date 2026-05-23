import React from 'react';
import { motion } from 'framer-motion';

const DashboardPreview = () => {
  const metrics = [
    { label: 'Total RFQs', value: '128', sub: '+12% from last month' },
    { label: 'Active Bids', value: '45', sub: 'In progress' },
    { label: 'Total Savings', value: '$84.2k', sub: 'Potential' },
    { label: 'Suppliers', value: '320+', sub: 'Globally verified' },
  ];

  return (
    <section className="bg-white py-20 bg-soft-green">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-upwork-dark mb-12 text-center lg:text-left">Dashboard Insights</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((m, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="p-8 border border-gray-100 rounded-3xl shadow-sm hover:shadow-lg transition-all bg-upwork-light-gray"
            >
              <div className="text-sm font-bold text-upwork-gray uppercase tracking-wider mb-2">{m.label}</div>
              <div className="text-4xl font-bold text-upwork-dark mb-2 tracking-tight">{m.value}</div>
              <div className="text-xs font-semibold text-upwork-green">{m.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;
