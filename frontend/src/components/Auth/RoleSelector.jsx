import React from 'react';
import { motion } from 'framer-motion';

const roles = [
  {
    id: 'buyer',
    emoji: 'ðŸ¢',
    title: 'I am a Buyer',
    desc: 'Source industrial parts, manage RFQs, and track procurement savings.',
    accent: 'hover:border-upwork-green hover:bg-upwork-green/5',
    badge: 'PROCUREMENT',
  },
  {
    id: 'seller',
    emoji: 'ðŸ› ï¸',
    title: 'I am a Supplier',
    desc: 'Find industrial projects, submit competitive bids, and grow your network.',
    accent: 'hover:border-blue-500 hover:bg-blue-50',
    badge: 'SUPPLIER',
  },
  {
    id: 'admin',
    emoji: 'ðŸ›¡ï¸',
    title: 'System Administrator',
    desc: 'Full access to registry nodes, analytics, and infrastructure oversight.',
    accent: 'hover:border-upwork-dark hover:bg-black/5',
    badge: 'CONTROL',
  },
];

const RoleSelector = ({ onSelect }) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      {roles.map((r, i) => (
        <motion.button
          key={r.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={() => onSelect(r.id)}
          className={`w-full flex items-center gap-6 p-6 rounded-2xl border-2 border-gray-100 bg-white transition-all text-left group shadow-sm ${r.accent}`}
        >
          <div className="text-4xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
            {r.emoji}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1">
              <h3 className="text-base font-black text-upwork-dark uppercase tracking-tight">
                {r.title}
              </h3>
              <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest border border-gray-200 px-2 py-0.5 rounded-full">
                {r.badge}
              </span>
            </div>
            <p className="text-xs font-medium text-gray-500 leading-relaxed">{r.desc}</p>
          </div>
          <div className="flex-shrink-0 w-8 h-8 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-300 group-hover:border-current group-hover:text-current transition-all text-lg">
            â†’
          </div>
        </motion.button>
      ))}
    </div>
  );
};

export default RoleSelector;

