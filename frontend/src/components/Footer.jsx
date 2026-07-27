import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Globe, 
  ShieldCheck, 
  Send, 
  Camera, 
  Briefcase 
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative mt-32 bg-[#001e00] text-white pt-24 pb-12 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-upwork-green via-white/20 to-upwork-green opacity-50" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-upwork-green/10 blur-[120px] rounded-full" />
      
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 mb-20">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-white uppercase leading-none">
                PURCHASE <span className="text-upwork-green">POINT</span>
              </h2>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-upwork-green mt-2 leading-none">Global Industrial Registry</p>
            </div>
            <p className="text-gray-400 text-sm font-medium leading-relaxed max-w-sm">
              The world's premier platform for high-precision industrial sourcing, request for quotations, and verified supplier intelligence.
            </p>
            <div className="flex gap-4">
              {[Briefcase, Send, Globe, Camera].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-upwork-green hover:border-upwork-green transition-all hover:-translate-y-1">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns - Improved mobile/tablet grid */}
          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-8 lg:gap-4 xl:gap-8">
            <div className="space-y-6">
              <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-upwork-green/60">For Buyers</h4>
              <ul className="space-y-4 text-[13px] font-medium text-gray-400">
                <li><Link to="/solutions/post-rfq" className="hover:text-upwork-green transition-colors">Post RFQ</Link></li>
                <li><Link to="/solutions/analysis" className="hover:text-upwork-green transition-colors">Analysis Tool</Link></li>
                <li><Link to="/solutions/savings" className="hover:text-upwork-green transition-colors">Savings Dashboard</Link></li>
                <li><Link to="/solutions/bom" className="hover:text-upwork-green transition-colors">BOM Management</Link></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-upwork-green/60">For Suppliers</h4>
              <ul className="space-y-4 text-[13px] font-medium text-gray-400">
                <li><Link to="/solutions/place-bids" className="hover:text-upwork-green transition-colors">Place Bids</Link></li>
                <li><Link to="/solutions/catalog" className="hover:text-upwork-green transition-colors">Project Catalog</Link></li>
                <li><Link to="/solutions/scorecard" className="hover:text-upwork-green transition-colors">Supplier Scorecard</Link></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-upwork-green/60">Resources</h4>
              <ul className="space-y-4 text-[13px] font-medium text-gray-400">
                <li><Link to="/resources/help" className="hover:text-upwork-green transition-colors">Help Center</Link></li>
                <li><Link to="/resources/case-studies" className="hover:text-upwork-green transition-colors">Case Studies</Link></li>
                <li><Link to="/resources/pricing" className="hover:text-upwork-green transition-colors">Pricing Guide</Link></li>
                <li><Link to="/resources/trust" className="hover:text-upwork-green transition-colors">Trust & Security</Link></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-upwork-green/60">Company</h4>
              <ul className="space-y-4 text-[13px] font-medium text-gray-400">
                <li><Link to="/company/about" className="hover:text-upwork-green transition-colors">About Us</Link></li>
                <li><Link to="/company/investors" className="hover:text-upwork-green transition-colors">Investors</Link></li>
                <li><Link to="/company/careers" className="hover:text-upwork-green transition-colors">Careers</Link></li>
                <li><Link to="/company/contact" className="hover:text-upwork-green transition-colors">Contact Us</Link></li>
              </ul>
            </div>
          </div>

          {/* Newsletter / CTA */}
          <div className="md:col-span-2 lg:col-span-3">
            <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 space-y-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Mail size={48} />
              </div>
              <h4 className="text-2xl font-black tracking-tighter text-white uppercase leading-none">Stay <br/>Segmented.</h4>
              <p className="text-xs text-gray-400 font-medium leading-relaxed">
                Receive weekly industrial price indices and lead-time volatility reports.
              </p>
              <div className="space-y-3">
                <input 
                  type="email" 
                  placeholder="Corporate Email" 
                  className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-sm font-medium outline-none focus:border-upwork-green transition-colors"
                />
                <button className="w-full py-3 bg-upwork-green text-upwork-dark rounded-xl font-black text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div className="flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Protocol</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Regulatory Terms</Link>
            <Link to="/cookies" className="hover:text-white transition-colors">Cookie Governance</Link>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-6 text-gray-500">
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-upwork-green" />
              <span className="text-[10px] font-black uppercase tracking-widest italic">ISO 27001 Certified</span>
            </div>
            <div className="hidden sm:block h-4 w-px bg-white/10" />
            <div className="flex items-center gap-2">
              <Globe size={14} />
              <span className="text-[10px] font-black uppercase tracking-widest">Global Registry Â© 2026</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

