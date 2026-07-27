import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Globe, MessageSquare, Send, Clock } from 'lucide-react';

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-white pt-24 pb-32 font-['Outfit'] tracking-wide">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-20">
          {/* Left: Info */}
          <div className="lg:w-1/3 space-y-12">
            <div>
              <h1 className="text-5xl md:text-6xl font-black text-upwork-dark tracking-tight leading-tight uppercase mb-6">Connect to the <br/>Hub</h1>
              <p className="text-xl text-gray-500 font-medium leading-relaxed">
                Global support for industrial facilities, procurement teams, and registered suppliers.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex gap-6 items-start group">
                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-upwork-green group-hover:bg-upwork-green group-hover:text-white transition-all">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-1">Corporate Inquiries</h4>
                  <p className="font-bold text-upwork-dark">registry@purchasepoint.global</p>
                </div>
              </div>
              <div className="flex gap-6 items-start group">
                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-upwork-green group-hover:bg-upwork-green group-hover:text-white transition-all">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-1">Global Support Line</h4>
                  <p className="font-bold text-upwork-dark">+1 (888) IND-PRO-00</p>
                </div>
              </div>
              <div className="flex gap-6 items-start group">
                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-upwork-green group-hover:bg-upwork-green group-hover:text-white transition-all">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-1">Response Protocol</h4>
                  <p className="font-bold text-upwork-dark">Within 24 Global Business Hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="flex-1">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-10 md:p-16 bg-gray-50 rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-200/50"
            >
              <h3 className="text-3xl font-black tracking-tight uppercase mb-10">Send a Secure Transmission</h3>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Facility Name</label>
                    <input type="text" placeholder="e.g. Acme Precision Metals" className="w-full px-6 py-4 rounded-2xl bg-white border border-gray-200 outline-none focus:border-upwork-green transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Corporate Email</label>
                    <input type="email" placeholder="name@company.com" className="w-full px-6 py-4 rounded-2xl bg-white border border-gray-200 outline-none focus:border-upwork-green transition-all" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Segment / Industry</label>
                  <select className="w-full px-6 py-4 rounded-2xl bg-white border border-gray-200 outline-none focus:border-upwork-green transition-all appearance-none cursor-pointer">
                    <option>Select Industrial Segment...</option>
                    <option>Electronics & Tech</option>
                    <option>Mechanical Hardware</option>
                    <option>Logistics & Supply Chain</option>
                    <option>Infrastructure</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Transmission Message</label>
                  <textarea rows="5" placeholder="Detailed inquiry or collaboration spec..." className="w-full px-6 py-4 rounded-2xl bg-white border border-gray-200 outline-none focus:border-upwork-green transition-all resize-none"></textarea>
                </div>
                <button className="w-full py-5 bg-upwork-dark text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-upwork-dark/20">
                  <Send size={16} /> Deploy Transmission
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

