import React, { useState, useEffect } from 'react';
import { User, Mail, Shield, Calendar, Building, Edit2 } from 'lucide-react';

const ProfileView = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        setUser(parsed);
        setFormData(parsed);
      } catch (e) {
        console.error('Failed to parse user data');
      }
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('user', JSON.stringify(formData));
    setUser(formData);
    setIsEditing(false);
    // Real API call would go here
  };

  const profileFields = [
    { label: 'Full Name', value: user?.name, key: 'name', icon: User },
    { label: 'Email Address', value: user?.email, key: 'email', icon: Mail },
    { label: 'Access Level', value: user?.role, key: 'role', icon: Shield },
    { label: 'Account ID', value: user?.user_id, key: 'user_id', icon: Building },
    { label: 'Status', value: user?.account_status || 'Active', key: 'status', icon: Calendar },
  ];

  if (!user) return null;

  return (
    <div className="p-4 md:p-8 space-y-8 lg:ml-64 min-h-[calc(100vh-80px)] bg-gray-50/50 transition-all">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-black text-upwork-dark tracking-tight uppercase leading-tight">Your Profile</h1>
          <p className="text-gray-500 font-medium text-sm md:text-base">Manage your administrative credentials and security settings.</p>
        </div>
        {!isEditing ? (
          <button 
            onClick={() => setIsEditing(true)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-upwork-dark text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-upwork-green transition-all shadow-lg active:scale-95 w-full lg:w-auto"
          >
            <Edit2 size={16} /> Edit Profile
          </button>
        ) : (
          <div className="flex gap-3 w-full lg:w-auto">
             <button 
              onClick={() => setIsEditing(false)}
              className="flex-1 lg:flex-none px-6 py-3 bg-white border border-gray-200 text-upwork-dark rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-50 transition-all shadow-sm"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave}
              className="flex-1 lg:flex-none px-6 py-3 bg-upwork-green text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-upwork-dark transition-all shadow-lg active:scale-95"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm text-center space-y-6">
            <div className="relative inline-block">
              <div className="w-32 h-32 bg-gradient-to-tr from-upwork-dark to-upwork-green rounded-[2.5rem] flex items-center justify-center text-white text-5xl font-black uppercase shadow-xl mx-auto">
                {user?.name?.charAt(0) || 'A'}
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-2xl shadow-lg border border-gray-50 flex items-center justify-center text-upwork-green">
                <Shield size={20} />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-black text-upwork-dark uppercase tracking-tight">{user?.name || 'Administrator'}</h2>
              <p className="text-sm font-bold text-upwork-green uppercase tracking-widest mt-1">{user?.role || 'Super Admin'}</p>
            </div>
            <div className="pt-6 border-t border-gray-50 flex justify-center gap-4">
               <div className="text-center">
                  <p className="text-lg font-black text-upwork-dark">1,204</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Actions</p>
               </div>
               <div className="w-px h-10 bg-gray-100"></div>
               <div className="text-center">
                  <p className="text-lg font-black text-upwork-dark">99.9%</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Efficiency</p>
               </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-8">
            <h3 className="text-xl font-black text-upwork-dark uppercase tracking-tight border-b border-gray-50 pb-6">Account Intelligence</h3>
            <div className="grid md:grid-cols-2 gap-10">
               {profileFields.map((field, i) => (
                 <div key={i} className="flex gap-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-upwork-green group-hover:text-white transition-all">
                       <field.icon size={20} />
                    </div>
                    <div className="flex-1">
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{field.label}</p>
                       {!isEditing || field.key === 'role' || field.key === 'user_id' ? (
                         <p className="text-sm font-bold text-upwork-dark break-all">{field.value || 'Not Configured'}</p>
                       ) : (
                         <input 
                           className="w-full bg-gray-50 border-none rounded-lg px-3 py-2 text-xs font-bold outline-none focus:ring-1 focus:ring-upwork-green/20 focus:bg-white transition-all"
                           value={formData[field.key] || ''}
                           onChange={(e) => setFormData({...formData, [field.key]: e.target.value})}
                         />
                       )}
                    </div>
                 </div>
               ))}
            </div>
          </div>

          <div className="bg-upwork-dark p-10 rounded-[3rem] text-white space-y-6">
             <div className="flex justify-between items-center">
                <h3 className="text-xl font-black uppercase tracking-tight text-upwork-green">Security Protocol</h3>
                <span className="px-4 py-1.5 bg-upwork-green/20 rounded-full text-[10px] font-black uppercase tracking-widest text-upwork-green">Active</span>
             </div>
             <p className="text-gray-400 text-sm">Two-factor authentication and biometric validation are currently enabled for this administrative node.</p>
             <button className="px-8 py-3 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-upwork-dark transition-all">
                Update Security Keys
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;

