import React, { useState, useEffect } from 'react';
import { Search, Bell, Mail, ChevronDown, Menu } from 'lucide-react';

const AdminTopbar = ({ setActiveTab, toggleSidebar }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        console.error('Failed to parse user data');
      }
    }
  }, []);

  return (
    <div className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-4 md:px-8 sticky top-0 z-40 lg:lg:ml-64 transition-all">
      {/* Mobile Toggle */}
      <button 
        onClick={toggleSidebar}
        className="p-2.5 mr-4 lg:hidden bg-gray-50 text-gray-500 rounded-xl hover:bg-gray-100 transition-all"
      >
        <Menu size={20} />
      </button>

      {/* Search Bar */}
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-upwork-green transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search everything..."
            className="w-full bg-gray-50 border-none rounded-2xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-upwork-green/20 focus:bg-white transition-all text-sm outline-none"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 border-r border-gray-100 pr-6">
          <button 
            onClick={() => setActiveTab('inbox')}
            className="p-2.5 bg-gray-50 text-gray-500 rounded-xl hover:bg-upwork-green/10 hover:text-upwork-green transition-all relative"
          >
            <Mail size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <button className="p-2.5 bg-gray-50 text-gray-500 rounded-xl hover:bg-upwork-green/10 hover:text-upwork-green transition-all relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-upwork-green rounded-full border-2 border-white"></span>
          </button>
        </div>

        <button 
          onClick={() => setActiveTab('profile')}
          className="flex items-center gap-3 hover:bg-gray-50 p-1.5 rounded-2xl transition-all pr-4 text-left"
        >
          <div className="w-10 h-10 bg-gradient-to-tr from-upwork-dark to-upwork-green rounded-xl flex items-center justify-center text-white font-bold uppercase">
            {user?.name?.charAt(0) || 'A'}
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-black text-upwork-dark leading-tight uppercase truncate max-w-[120px]">
              {user?.name || 'Administrator'}
            </p>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
              {user?.role || 'Super Admin'}
            </p>
          </div>
          <ChevronDown size={14} className="text-gray-400" />
        </button>
      </div>
    </div>
  );
};

export default AdminTopbar;

