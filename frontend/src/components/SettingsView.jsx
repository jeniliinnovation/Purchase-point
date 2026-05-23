import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, Bell, Shield, Globe, User, 
  Lock, CreditCard, HelpCircle, Save, 
  Eye, EyeOff, CheckCircle2, ChevronRight 
} from 'lucide-react';

const SettingsView = () => {
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState('account');
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

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

  const handleSave = () => {
    setLoading(true);
    // Persist changes to localStorage
    const updatedUser = { ...user, avatar: formData.avatar, name: formData.name, email: formData.email };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);

    setTimeout(() => {
      setLoading(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      // Dispatch custom event to notify topbars/sidebars in the same window
      window.dispatchEvent(new Event('userUpdate'));
    }, 800);
  };

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    avatar: user?.avatar || null
  });

  const avatars = [
    'https://ui-avatars.com/api/?name=Admin&background=14a800&color=fff',
    'https://api.dicebear.com/7.x/pixel-art/svg?seed=Felix',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
    'https://api.dicebear.com/7.x/bottts/svg?seed=Bot',
  ];

  const sections = [
    { id: 'account', title: 'Account Settings', icon: User, desc: 'Manage your profile and public information.' },
    { id: 'security', title: 'Security & Access', icon: Shield, desc: 'Two-factor authentication and session control.' },
    { id: 'notifications', title: 'Intelligence Alerts', icon: Bell, desc: 'Configure system-wide notification protocols.' },
    { id: 'system', title: 'System Preferences', icon: Globe, desc: 'Language, timezone, and display calibration.' },
  ];

  if (!user) return null;

  return (
    <div className="p-8 space-y-8 lg:ml-64 min-h-[calc(100vh-80px)] bg-gray-50/50 font-['Inter']">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-upwork-dark tracking-tight uppercase">System Configuration</h1>
          <p className="text-gray-500 font-medium">Fine-tune your industrial procurement node settings.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={loading}
          className={`flex items-center gap-2 px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-lg ${
            saved ? 'bg-upwork-green text-white' : 'bg-upwork-dark text-white hover:bg-upwork-green'
          }`}
        >
          {loading ? 'Syncing...' : saved ? <><CheckCircle2 size={16} /> Configuration Synchronized</> : <><Save size={16} /> Save Configurations</>}
        </button>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1 space-y-3">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full text-left p-6 rounded-[2rem] border transition-all flex items-start gap-4 ${
                activeSection === section.id 
                  ? 'bg-white border-upwork-green shadow-sm ring-1 ring-upwork-green/20' 
                  : 'bg-transparent border-transparent hover:bg-white/50 text-gray-500'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                activeSection === section.id ? 'bg-upwork-green text-white' : 'bg-gray-100 text-gray-400'
              }`}>
                <section.icon size={20} />
              </div>
              <div className="flex-1">
                <p className={`text-xs font-black uppercase tracking-widest ${activeSection === section.id ? 'text-upwork-dark' : 'text-gray-400'}`}>
                  {section.title}
                </p>
                <p className="text-[10px] font-medium leading-relaxed mt-1 opacity-60">
                  {section.desc}
                </p>
              </div>
              <ChevronRight size={14} className={`mt-1 transition-transform ${activeSection === section.id ? 'rotate-90 text-upwork-green' : 'opacity-0'}`} />
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 space-y-8">
          <div className="bg-white p-12 rounded-[3.5rem] border border-gray-100 shadow-sm min-h-[600px]">
            {activeSection === 'account' && (
              <div className="max-w-2xl space-y-12">
                <div className="space-y-6">
                  <h3 className="text-xl font-black text-upwork-dark uppercase tracking-tight flex items-center gap-2">
                    <User size={20} className="text-upwork-green" /> Profile Calibration
                  </h3>
                  <div className="flex flex-col gap-8 p-8 bg-gray-50/50 rounded-[2.5rem] border border-dashed border-gray-200">
                    <div className="flex items-center gap-8">
                      {formData.avatar ? (
                        <img src={formData.avatar} alt="Avatar" className="w-24 h-24 rounded-3xl object-cover shadow-inner border-2 border-upwork-green/30" />
                      ) : (
                        <div className="w-24 h-24 bg-upwork-dark rounded-3xl flex items-center justify-center text-white text-3xl font-black uppercase shadow-inner">
                          {user.name?.charAt(0)}
                        </div>
                      )}
                      <div className="space-y-2">
                        <p className="text-sm font-black text-upwork-dark uppercase">Profile Avatar</p>
                        <p className="text-xs text-gray-500 font-medium pb-2">Select a preset or upload your industrial identicon.</p>
                        <div className="flex gap-3">
                          {avatars.map((url, i) => (
                            <button 
                              key={i}
                              onClick={() => setFormData({ ...formData, avatar: url })}
                              className={`w-10 h-10 rounded-xl overflow-hidden border-2 transition-all ${formData.avatar === url ? 'border-upwork-green scale-110 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'}`}
                            >
                              <img src={url} alt="preset" className="w-full h-full object-cover" />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Entity Name</label>
                    <input 
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-gray-50/50 border border-transparent focus:border-upwork-green/30 focus:bg-white rounded-2xl px-6 py-4 text-sm font-bold outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Authentication Email</label>
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-gray-50/50 border border-transparent focus:border-upwork-green/30 focus:bg-white rounded-2xl px-6 py-4 text-sm font-bold outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'security' && (
              <div className="max-w-2xl space-y-12">
                <div className="space-y-6 text-center pb-8 border-b border-gray-50">
                   <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                     <Shield size={32} />
                   </div>
                   <h3 className="text-2xl font-black text-upwork-dark uppercase tracking-tight">Security Core</h3>
                   <p className="text-gray-500 font-medium max-w-md mx-auto">Enhance your node's protection by enabling advanced biometric and multi-factor authentication protocols.</p>
                </div>

                <div className="space-y-4">
                  {[
                    { label: 'Two-Factor Authentication', status: 'Disabled', active: false },
                    { label: 'Biometric Validation', status: 'Experimental', active: false },
                    { label: 'Active Session Monitoring', status: 'Enabled', active: true },
                    { label: 'Login Notifications', status: 'Enabled', active: true },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center p-6 bg-gray-50/50 rounded-3xl group hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-gray-100">
                      <div className="space-y-1">
                        <p className="text-xs font-black text-upwork-dark uppercase tracking-widest">{item.label}</p>
                        <p className={`text-[10px] font-bold ${item.active ? 'text-upwork-green' : 'text-gray-400'} uppercase`}>{item.status}</p>
                      </div>
                      <div className={`w-12 h-6 rounded-full p-1 transition-colors cursor-pointer ${item.active ? 'bg-upwork-green' : 'bg-gray-200'}`}>
                        <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${item.active ? 'translate-x-6' : ''}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'notifications' && (
              <div className="max-w-2xl space-y-12">
                <h3 className="text-xl font-black text-upwork-dark uppercase tracking-tight flex items-center gap-2">
                  <Bell size={20} className="text-orange-500" /> Alert Protocols
                </h3>
                
                <div className="space-y-8">
                   <div className="space-y-4">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-l-2 border-upwork-green pl-3">Real-time Intelligence</p>
                      {[
                        'New RFQ Match Notifications',
                        'Bid Submission Confirmations',
                        'Contract Award Alerts',
                        'Direct Messaging Tunnels'
                      ].map((label, i) => (
                        <div key={i} className="flex items-center gap-3">
                           <input type="checkbox" defaultChecked className="w-5 h-5 accent-upwork-green" />
                           <span className="text-xs font-bold text-gray-600">{label}</span>
                        </div>
                      ))}
                   </div>

                   <div className="space-y-4 pt-6 border-t border-gray-50">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-l-2 border-blue-500 pl-3">Administrative Drips</p>
                      {[
                        'Weekly Performance Diagnostics',
                        'Market Variance Reports',
                        'Platform Maintenance Advisories'
                      ].map((label, i) => (
                        <div key={i} className="flex items-center gap-3">
                           <input type="checkbox" defaultChecked={i === 0} className="w-5 h-5 accent-upwork-green" />
                           <span className="text-xs font-bold text-gray-600">{label}</span>
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            )}

            {activeSection === 'system' && (
              <div className="max-w-2xl space-y-12">
                <h3 className="text-xl font-black text-upwork-dark uppercase tracking-tight flex items-center gap-2">
                  <Globe size={20} className="text-blue-500" /> Interface Calibration
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   {[
                     { label: 'Language Protocol', value: 'English (US)' },
                     { label: 'Temporal Baseline', value: 'UTC (Universal Regular)' },
                     { label: 'Monetary Symbol', value: 'USD ($)' },
                     { label: 'Data Density', value: 'Compact Industrial' }
                   ].map((item, i) => (
                     <div key={i} className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{item.label}</label>
                        <select className="w-full bg-gray-50/50 border border-transparent focus:border-upwork-green/30 focus:bg-white rounded-2xl px-6 py-4 text-sm font-bold outline-none transition-all appearance-none cursor-pointer">
                           <option>{item.value}</option>
                        </select>
                     </div>
                   ))}
                </div>

                <div className="p-8 bg-upwork-dark rounded-[2.5rem] text-white flex items-center justify-between">
                   <div className="space-y-1">
                     <p className="text-xs font-black uppercase tracking-widest text-upwork-green">Experimental Dark Mode</p>
                     <p className="text-[10px] text-gray-400 font-medium">Reduce energy signature and eye strain.</p>
                   </div>
                   <button className="px-6 py-2.5 bg-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-white hover:text-upwork-dark transition-all">
                     Initiate Switch
                   </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
