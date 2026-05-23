import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  Package, 
  ShoppingCart, 
  FileEdit, 
  UserCircle, 
  Settings,
  LogOut,
  ChevronRight,
  Mail,
  BarChart,
  Zap
} from 'lucide-react';

const AdminSidebar = ({ activeTab, setActiveTab, isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem('user') || '{}');
      setUser(u);
    } catch {}
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login', { replace: true });
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'clients', label: 'Clients', icon: Users },
    { id: 'stock', label: 'Supplier Stock', icon: Package },
    { id: 'procurement', label: 'Procurements', icon: ShoppingCart },
    { id: 'rfq', label: 'Bid & RFQ', icon: FileEdit },
    { id: 'inbox', label: 'Inbox', icon: Mail },
    { id: 'analytics', label: 'Analytics', icon: BarChart },
  ];

  const bottomItems = [
    { id: 'profile', label: 'Profile', icon: UserCircle },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[45] lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className={`w-64 h-screen bg-white border-r border-gray-100 flex flex-col fixed left-0 top-0 z-50 transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
      {/* Logo */}
      <div className="p-6 border-b border-gray-50">
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => navigate('/')}
        >
          <div className="w-10 h-10 bg-gradient-to-tr from-[#14a800] to-emerald-400 rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-lg shadow-[#14a800]/25 group-hover:scale-105 transition-transform">
            P
          </div>
          <div>
            <span className="text-sm font-black text-gray-900 tracking-tighter uppercase block">Purchase Point</span>
            <span className="text-[9px] text-[#14a800] font-bold uppercase tracking-widest">Admin Panel</span>
          </div>
        </div>
      </div>

      {/* Nav */}
      <div className="flex-1 p-4 overflow-y-auto">
        <p className="text-[9px] font-black text-gray-300 uppercase tracking-[0.3em] px-3 mb-3">Main Menu</p>
        <nav className="space-y-0.5">
          {menuItems.map((item) => {
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all group ${
                  active
                    ? 'bg-[#14a800]/10 text-[#14a800]'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                    active
                      ? 'bg-[#14a800]/15 text-[#14a800]'
                      : 'bg-transparent text-gray-400 group-hover:bg-gray-100 group-hover:text-gray-700'
                  }`}>
                    <item.icon size={16} />
                  </div>
                  <span className="text-[13px] font-semibold">{item.label}</span>
                </div>
                {active && (
                  <div className="w-1.5 h-1.5 rounded-full bg-[#14a800]" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom */}
      <div className="p-4 border-t border-gray-50 space-y-0.5">
        {/* User Chip */}
        <button
          onClick={() => setActiveTab('profile')}
          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-gray-50 transition-all mb-2 group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-gray-900 to-gray-700 flex items-center justify-center text-white font-black text-sm flex-shrink-0">
            {user?.name?.charAt(0) || 'A'}
          </div>
          <div className="flex-1 text-left min-w-0">
            <p className="text-[11px] font-black text-gray-900 uppercase tracking-tight truncate">{user?.name || 'Administrator'}</p>
            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">{user?.role || 'Super Admin'}</p>
          </div>
          <ChevronRight size={14} className="text-gray-300 group-hover:text-gray-500" />
        </button>

        {bottomItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
              activeTab === item.id
                ? 'bg-[#14a800]/10 text-[#14a800]'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <item.icon size={16} className={activeTab === item.id ? 'text-[#14a800]' : 'text-gray-400'} />
            <span className="text-[13px] font-semibold">{item.label}</span>
          </button>
        ))}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-400 hover:bg-red-50 hover:text-red-600 transition-all mt-1"
        >
          <LogOut size={16} />
          <span className="text-[13px] font-semibold">Logout</span>
        </button>
      </div>
      </div>
    </>
  );
};

export default AdminSidebar;
