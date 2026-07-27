import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Globe, ChevronDown, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Buyer', path: '/buyer' },
    { name: 'Solutions', path: '/solutions' },
    { name: 'Active RFQs', path: '/active-rfqs' },
    { name: 'Suppliers', path: '/suppliers' },
    { name: 'Why Purchase Point', path: '/why-purchase-point' },
    { name: "What's New", path: '/whats-new' },
  ];

  const subLinks = [
    { name: 'Electronics', path: '/category/electronics' },
    { name: 'Mechanical', path: '/category/mechanical' },
    { name: 'Logistics', path: '/category/logistics' },
    { name: 'Direct Materials', path: '/category/direct-materials' },
    { name: 'Savings Reports', path: '/category/savings-reports' },
  ];

  return (
    <nav className="border-b border-gray-100 bg-white sticky top-0 z-50">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 gap-8 text-upwork-dark">
          {/* Left Side: Logo & Main Items */}
          <div className="flex items-center gap-10">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-upwork-green text-2xl font-black tracking-tighter uppercase italic">Purchase Point</span>
            </Link>
            
            <div className="hidden xl:flex items-center gap-8 text-sm font-bold">
              {navLinks.map((link) => (
                <Link 
                  key={link.path}
                  to={link.path} 
                  className={`transition-colors hover:text-upwork-green whitespace-nowrap ${isActive(link.path) ? 'text-upwork-green' : ''}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Center: Search Bar (Desktop) */}
          <div className="hidden lg:flex flex-1 justify-center max-w-xl mx-4">
            <div className="relative w-full group">
               <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-upwork-green">
                <Search size={16} />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-[13px] font-bold placeholder-gray-400 outline-none focus:bg-white focus:ring-1 focus:ring-upwork-green focus:border-upwork-green transition-all shadow-sm"
                placeholder="Search RFQs, Parts, or Suppliers..."
              />
            </div>
          </div>

          {/* Right Side: Account Actions */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-6">
              {localStorage.getItem('token') ? (
                <>
                  <Link to="/dashboard" className="text-[13px] font-bold hover:text-upwork-green">Dashboard</Link>
                  <Link to="/profile" className="text-[13px] font-bold hover:text-upwork-green">Profile</Link>
                  <button 
                    onClick={() => {
                      localStorage.removeItem('token');
                      localStorage.removeItem('user');
                      window.location.replace('/');
                    }}
                    className="text-[13px] font-bold text-red-500 hover:text-red-700 transition-colors"
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-[13px] font-bold hover:text-upwork-green">Log In</Link>
                  <Link 
                    to="/register"
                    className="bg-upwork-green text-white px-6 py-2 rounded-full text-[13px] font-black hover:bg-upwork-green/90 transition-all shadow-lg shadow-upwork-green/20"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMenu}
              className="lg:hidden p-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Sub-navbar (Desktop) */}
      <div className="hidden lg:block border-t border-gray-100">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <ul className="flex items-center gap-10 h-11 text-[11px] font-black uppercase tracking-wider text-gray-500">
            {subLinks.map((link) => (
              <li key={link.path}>
                <Link 
                  to={link.path} 
                  className={`hover:text-upwork-green transition-colors flex items-center h-11 border-b-2 border-transparent ${isActive(link.path) ? 'text-upwork-green !border-upwork-green' : ''}`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-4 pb-8 space-y-6">
              {/* Mobile Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search RFQs..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-upwork-green"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              </div>

              {/* Main Links */}
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-2">Navigation</p>
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 rounded-xl font-bold transition-all ${isActive(link.path) ? 'bg-upwork-green/10 text-upwork-green' : 'text-upwork-dark hover:bg-gray-50'}`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* Category Links */}
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-2">Categories</p>
                <div className="grid grid-cols-2 gap-2">
                  {subLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-3 rounded-xl bg-gray-50 text-xs font-bold text-gray-600 hover:bg-upwork-green hover:text-white transition-all shadow-sm"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Auth Buttons */}
              <div className="pt-4 border-t border-gray-100 space-y-4">
                 {localStorage.getItem('token') ? (
                  <div className="space-y-4">
                    <Link 
                      to="/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="block w-full py-4 bg-upwork-green/10 text-upwork-green rounded-xl font-black text-xs uppercase tracking-widest text-center"
                    >
                      Dashboard
                    </Link>
                    <Link 
                      to="/profile"
                      onClick={() => setIsOpen(false)}
                      className="block w-full py-4 bg-gray-50 text-upwork-dark rounded-xl font-black text-xs uppercase tracking-widest text-center"
                    >
                      Profile
                    </Link>
                    <button 
                      onClick={() => {
                        localStorage.removeItem('token');
                        localStorage.removeItem('user');
                        window.location.replace('/');
                      }}
                      className="w-full py-4 bg-red-50 text-red-500 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all"
                    >
                      Log Out
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <Link 
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="w-full py-4 bg-gray-50 text-upwork-dark rounded-xl font-black text-xs uppercase tracking-widest text-center"
                    >
                      Log In
                    </Link>
                    <Link 
                      to="/register"
                      onClick={() => setIsOpen(false)}
                      className="w-full py-4 bg-upwork-green text-white rounded-xl font-black text-xs uppercase tracking-widest text-center shadow-lg shadow-upwork-green/20"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

