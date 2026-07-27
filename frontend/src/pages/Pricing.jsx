import React from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Building2, Globe, ShieldCheck, BarChart4 } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: 'Workshop',
      price: '$0',
      tagline: 'For local suppliers & small facilities.',
      features: ['Up to 5 active bids', 'Basic visibility in registry', 'Standard RFQ templates', 'Community support'],
      cta: 'Get Started Free',
      bg: 'bg-white',
      border: 'border-gray-100',
      text: 'text-upwork-dark'
    },
    {
      name: 'Industrial',
      price: '$499',
      period: '/mo',
      tagline: 'For high-volume procurement teams.',
      features: ['Unlimited RFQs & Bids', 'Priority verification badge', 'Advanced market analytics', 'Dedicated account sync'],
      cta: 'Start Pro Trial',
      bg: 'bg-upwork-dark',
      border: 'border-upwork-dark',
      text: 'text-white',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      tagline: 'For global OEMs & conglomerates.',
      features: ['Full API integration', 'Custom compliance workflows', 'Global supply chain audits', '24/7 technical hotline'],
      cta: 'Contact Sales',
      bg: 'bg-white',
      border: 'border-gray-100',
      text: 'text-upwork-dark'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-32 font-['Inter']">
      <div className="max-w-[1440px] mx-auto px-6 text-center mb-24">
        <h1 className="text-6xl font-black text-upwork-dark tracking-tighter uppercase mb-6">Scalable <span className="text-upwork-green">Value</span></h1>
        <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto">
          From single RFQs to global manufacturing conglomerates, select the plan that powers your facility's growth.
        </p>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-3 gap-8">
        {plans.map((plan, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`relative p-10 rounded-[3rem] border-2 shadow-sm flex flex-col ${plan.bg} ${plan.border} ${plan.text}`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-upwork-green text-upwork-dark text-[10px] font-black uppercase tracking-widest rounded-full">
                Most Efficient
              </div>
            )}
            <div className="mb-8">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] mb-4 opacity-50">{plan.name}</h3>
              <div className="flex items-end gap-1 mb-2">
                <span className="text-5xl font-black tracking-tighter">{plan.price}</span>
                <span className="text-sm font-bold opacity-50 mb-1">{plan.period}</span>
              </div>
              <p className="text-sm font-medium opacity-70 leading-relaxed">{plan.tagline}</p>
            </div>

            <ul className="space-y-4 mb-10 flex-1">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3 text-sm font-bold tracking-tight">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${plan.popular ? 'bg-upwork-green/20' : 'bg-gray-100'}`}>
                    <Check size={12} className={plan.popular ? 'text-upwork-green' : 'text-gray-400'} />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>

            <button className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${plan.popular ? 'bg-upwork-green text-upwork-dark hover:scale-105' : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-upwork-dark'}`}>
              {plan.cta}
            </button>
          </motion.div>
        ))}
      </div>

      {/* FAQs / Comparison CTA */}
      <div className="mt-32 max-w-4xl mx-auto px-6">
        <div className="p-12 bg-white rounded-[3rem] border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-black text-upwork-dark uppercase tracking-tight leading-tight">Need a customized procurement audit?</h3>
            <p className="text-sm text-gray-500 font-medium">Our specialists can build a custom ROI projection for your facility based on current spend.</p>
          </div>
          <button className="px-10 py-5 bg-upwork-dark text-white rounded-2xl font-black text-[10px] uppercase tracking-widest whitespace-nowrap shadow-xl shadow-upwork-dark/20">
            Request Registry Audit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;

