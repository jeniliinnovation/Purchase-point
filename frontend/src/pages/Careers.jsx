import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Search, ChevronRight, Zap, Users, Globe } from 'lucide-react';

const Careers = () => {
  const jobs = [
    { title: 'Senior Protocol Engineer', location: 'Remote / Global', dept: 'Engineering', type: 'Full-time' },
    { title: 'Global Supply Chain Lead', location: 'Frankfurt / Hybrid', dept: 'Operations', type: 'Contract' },
    { title: 'UX Designer (Industrial Spec)', location: 'London / Remote', dept: 'Design', type: 'Full-time' },
    { title: 'Head of Investor Relations', location: 'New York / On-site', dept: 'Strategy', type: 'Full-time' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-32 font-['Inter']">
      <div className="max-w-[1440px] mx-auto px-6 mb-24 text-center space-y-8">
        <h1 className="text-6xl md:text-8xl font-black text-upwork-dark tracking-tighter uppercase leading-none">
          Scale <span className="text-gray-300">the</span> <br/>Infrastructure.
        </h1>
        <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto italic">
          We are building the worlds most powerful registry for industrial commerce. Come build the foundation with us.
        </p>
      </div>

      {/* Perks Grid */}
      <section className="max-w-[1440px] mx-auto px-6 grid md:grid-cols-3 gap-6 mb-32">
        <div className="p-8 bg-white border border-gray-100 rounded-[2.5rem] flex items-center gap-6 group hover:border-upwork-green transition-all">
          <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-upwork-green group-hover:bg-upwork-green group-hover:text-white transition-all">
            <Globe />
          </div>
          <span className="text-sm font-black uppercase tracking-widest text-upwork-dark">Work from Anywhere</span>
        </div>
        <div className="p-8 bg-white border border-gray-100 rounded-[2.5rem] flex items-center gap-6 group hover:border-upwork-green transition-all">
          <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-upwork-green group-hover:bg-upwork-green group-hover:text-white transition-all">
            <Zap />
          </div>
          <span className="text-sm font-black uppercase tracking-widest text-upwork-dark">Competitive Equity</span>
        </div>
        <div className="p-8 bg-white border border-gray-100 rounded-[2.5rem] flex items-center gap-6 group hover:border-upwork-green transition-all">
          <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-upwork-green group-hover:bg-upwork-green group-hover:text-white transition-all">
            <Users />
          </div>
          <span className="text-sm font-black uppercase tracking-widest text-upwork-dark">Global Offsites</span>
        </div>
      </section>

      {/* Job Board */}
      <section className="max-w-4xl mx-auto px-6">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-black text-upwork-dark uppercase tracking-tight">Open Opportunities</h2>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input type="text" placeholder="Search Roles..." className="pl-12 pr-6 py-3 rounded-full bg-white border border-gray-200 outline-none focus:border-upwork-green transition-all text-sm font-medium w-64" />
          </div>
        </div>

        <div className="space-y-4">
          {jobs.map((job, i) => (
            <motion.div 
              key={i}
              whileHover={{ x: 5 }}
              className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="space-y-1">
                <h4 className="text-lg font-black text-upwork-dark group-hover:text-upwork-green transition-colors">{job.title}</h4>
                <div className="flex items-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                  <span className="flex items-center gap-1"><MapPin size={12} /> {job.location}</span>
                  <span className="w-1 h-1 bg-gray-200 rounded-full" />
                  <span>{job.dept}</span>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <span className="px-4 py-1.5 bg-gray-50 rounded-lg text-[10px] font-black uppercase tracking-widest text-gray-500">{job.type}</span>
                <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-300 group-hover:text-upwork-green group-hover:border-upwork-green transition-all">
                  <ChevronRight size={18} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Careers;

