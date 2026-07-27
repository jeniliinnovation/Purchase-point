import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Mail, 
  Shield, 
  MapPin, 
  Building2, 
  CreditCard, 
  Edit3, 
  Camera, 
  CheckCircle,
  Activity,
  ChevronRight,
  LogOut,
  Bell,
  Fingerprint,
  Globe,
  Briefcase,
  Zap
} from 'lucide-react';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('identity');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          setError('No session token found. Please log in again.');
          setLoading(false);
          return;
        }

        const response = await fetch('https://purchase-point.jenili.in/api/user/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        const data = await response.json();

        if (response.ok && data.user) {
          setProfile(data.user);
        } else {
          // API failed â€” try to build a basic profile from localStorage
          const localUser = localStorage.getItem('user');
          if (localUser) {
            const parsed = JSON.parse(localUser);
            // Preserve what we have instead of nulling out
            setProfile(prev => ({ 
              ...parsed, 
              personalInfo: parsed.personalInfo || null, 
              organization: parsed.organization || null, 
              paymentMethods: parsed.paymentMethods || [] 
            }));
            setError('Sync failed. Showing cached identity.');
          } else {
            setError(data.error || 'Could not load profile. Please try again.');
          }
        }
      } catch (err) {
        // Network error â€” fall back to localStorage completely
        const localUser = localStorage.getItem('user');
        if (localUser) {
          const parsed = JSON.parse(localUser);
          setProfile(parsed);
          setError('Server offline. Showing cached identity.');
        } else {
          setError('Network error: ' + err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
             <div className="w-16 h-16 border-4 border-upwork-green/20 rounded-full" />
             <div className="absolute top-0 left-0 w-16 h-16 border-4 border-upwork-green border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 animate-pulse">Synchronizing Node...</p>
        </div>
      </div>
    );
  }

  if (!profile) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
       <div className="text-center space-y-6 max-w-sm mx-auto p-8 bg-white rounded-[2rem] border border-gray-100 shadow-xl">
          <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto text-red-400">
             <Shield size={32} />
          </div>
          <div className="space-y-2">
             <p className="font-black uppercase tracking-widest text-sm text-upwork-dark">Session Expired</p>
             <p className="text-xs text-gray-400 leading-relaxed">{error || 'Your session could not be verified. Please log in again.'}</p>
          </div>
          <div className="space-y-3">
             <button 
               onClick={() => window.location.href = '/login'} 
               className="w-full px-6 py-3 bg-upwork-dark text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-upwork-green transition-all"
             >
               Return to Login
             </button>
             <button 
               onClick={() => window.location.reload()} 
               className="w-full px-6 py-3 bg-gray-50 text-gray-500 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-100 transition-all"
             >
               Retry Connection
             </button>
          </div>
       </div>
    </div>
  );

  const roleColor = profile.role === 'admin' ? 'text-red-600' : 'text-upwork-green';
  const roleBg = profile.role === 'admin' ? 'bg-red-50' : 'bg-upwork-green/10';

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-upwork-green selection:text-white pt-24 sm:pt-32 pb-12 sm:pb-24 px-4 sm:px-6 font-['Inter']">
      {/* Warning Banner */}
      {error && (
        <div className="max-w-[1440px] mx-auto mb-6">
          <div className="flex items-center gap-3 px-6 py-4 bg-amber-50 border border-amber-200 rounded-2xl text-amber-700 text-xs font-bold">
            <span className="text-amber-500">âš </span>
            {error}
          </div>
        </div>
      )}
      <div className="max-w-[1440px] mx-auto">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid lg:grid-cols-4 gap-8"
        >
          
          {/* Dashboard Left Rail */}
          <div className="lg:col-span-1 space-y-8">
             <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden p-8 pt-16 relative group">
                <div className="absolute top-0 left-0 w-full h-32 bg-upwork-dark group-hover:h-36 transition-all duration-700" />
                
                <div className="relative text-center">
                   <div className="relative inline-block mb-6">
                      <div className="w-32 h-32 rounded-[2.5rem] bg-white p-1.5 shadow-2xl relative z-10">
                         <div className="w-full h-full rounded-[2.2rem] bg-gray-50 flex items-center justify-center text-4xl font-black text-upwork-dark overflow-hidden uppercase border border-gray-100">
                            {profile.name?.charAt(0) || profile.email?.charAt(0)}
                         </div>
                      </div>
                      <button className="absolute bottom-1 right-1 z-20 p-3 bg-upwork-green text-upwork-dark rounded-2xl shadow-xl border-4 border-white hover:scale-110 active:scale-95 transition-all">
                         <Camera size={14} />
                      </button>
                   </div>

                    <div className="space-y-1 mb-8">
                       <h2 className="text-2xl font-black text-upwork-dark tracking-tighter uppercase leading-tight">
                         {profile.personalInfo?.full_name || profile.name || profile.email?.split('@')[0]}
                       </h2>
                       <p className="text-[10px] font-black text-upwork-green uppercase tracking-widest">{profile.organization?.organization_name || 'Individual Participant'}</p>
                       <p className="text-[10px] font-medium text-gray-400 mt-1">{profile.email}</p>
                    </div>

                   <div className={`inline-flex items-center gap-2 px-4 py-1.5 ${roleBg} ${roleColor} rounded-xl text-[10px] font-black uppercase tracking-[0.2em] border border-current/10 mb-8`}>
                      <Shield size={12} fill="currentColor" className="opacity-20" /> {profile.role} Access Level
                   </div>

                   <div className="grid grid-cols-2 gap-px bg-gray-100 rounded-2xl overflow-hidden border border-gray-100">
                      <div className="bg-white p-4">
                         <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1">Status</p>
                         <p className="text-xs font-black text-upwork-green uppercase flex items-center justify-center gap-1.5">
                            <CheckCircle size={10} /> Sync
                         </p>
                      </div>
                      <div className="bg-white p-4">
                         <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1">Last Log</p>
                         <p className="text-xs font-black text-upwork-dark">2m Ago</p>
                      </div>
                   </div>
                </div>
             </div>

             <nav className="bg-white rounded-[2.5rem] border border-gray-100 p-4 space-y-2 shadow-sm">
                {[
                  { id: 'identity', label: 'Identity Protocol', icon: User },
                  { id: 'organization', label: 'Organization Node', icon: Building2 },
                  { id: 'security', label: 'Security & Access', icon: Shield },
                  { id: 'finances', label: 'Financial Nodes', icon: CreditCard },
                  { id: 'activity', label: 'Global Logs', icon: Activity },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all group ${
                      activeTab === tab.id 
                      ? 'bg-upwork-dark text-white shadow-lg' 
                      : 'text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                       <tab.icon size={18} className={activeTab === tab.id ? 'text-upwork-green' : 'text-gray-300 group-hover:text-upwork-dark transition-colors'} />
                       <span className="text-[11px] font-black uppercase tracking-widest">{tab.label}</span>
                    </div>
                    {activeTab === tab.id && <ChevronRight size={14} className="text-upwork-green" />}
                  </button>
                ))}
             </nav>

             <button 
                onClick={() => {
                   localStorage.removeItem('token');
                   localStorage.removeItem('user');
                   window.location.href = '/';
                }}
                className="w-full p-6 bg-red-50 text-red-600 rounded-[2rem] border border-red-100 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-red-600 hover:text-white transition-all group"
             >
                <div className="flex items-center justify-center gap-3">
                   <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" /> Deactivate Session
                </div>
             </button>
          </div>

          {/* Main Context Area */}
          <div className="lg:col-span-3 space-y-8">
             <AnimatePresence mode="wait">
                {activeTab === 'identity' && (
                  <motion.div
                    key="identity"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                     {/* Personal Credentials */}
                     <div className="bg-white rounded-[2.5rem] sm:rounded-[3.5rem] border border-gray-100 p-6 sm:p-12 shadow-sm space-y-8 sm:space-y-12">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                           <div className="space-y-2">
                              <h3 className="text-2xl sm:text-3xl font-black text-upwork-dark uppercase tracking-tighter">Core Identity.</h3>
                              <p className="text-xs sm:text-sm font-medium text-gray-400">Verified participant credentials across the global stack.</p>
                           </div>
                           <button className="w-full sm:w-auto px-8 py-3 bg-upwork-light-gray rounded-xl text-[10px] font-black uppercase tracking-widest text-upwork-dark hover:bg-upwork-dark hover:text-white transition-all flex items-center justify-center gap-2">
                              <Edit3 size={14} /> Recalibrate
                           </button>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
                           <div className="space-y-8">
                              <div className="p-6 sm:p-8 bg-gray-50 rounded-3xl border border-gray-100 space-y-6">
                                 <h4 className="text-[10px] font-black text-upwork-green uppercase tracking-widest flex items-center gap-2">
                                    <Fingerprint size={14} /> Personal Protocol
                                 </h4>
                                 <div className="space-y-4">
                                    <div className="flex justify-between items-end border-b border-gray-200/50 pb-2 gap-4">
                                       <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest truncate">Legal Name</span>
                                       <span className="text-sm font-bold text-upwork-dark text-right">{profile.personalInfo?.full_name || 'Anonymous'}</span>
                                    </div>
                                    <div className="flex justify-between items-end border-b border-gray-200/50 pb-2 gap-4">
                                       <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest truncate">Designation</span>
                                       <span className="text-sm font-bold text-upwork-dark text-right">{profile.personalInfo?.designation || 'Specialist'}</span>
                                    </div>
                                    <div className="flex justify-between items-end border-b border-gray-200/50 pb-2 gap-4">
                                       <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest truncate">National ID</span>
                                       <span className="text-sm font-bold text-upwork-dark text-right">{profile.personalInfo?.national_id || 'Not Linked'}</span>
                                    </div>
                                 </div>
                              </div>
                           </div>

                           <div className="space-y-8">
                              <div className="p-6 sm:p-8 bg-upwork-dark text-white rounded-3xl space-y-6 shadow-2xl">
                                 <h4 className="text-[10px] font-black text-upwork-green uppercase tracking-widest flex items-center gap-2">
                                    <Building2 size={14} /> Entity Node
                                 </h4>
                                 <div className="space-y-4">
                                    <div className="flex justify-between items-center group gap-4">
                                       <div className="space-y-0.5 overflow-hidden">
                                          <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Organization Name</p>
                                          <p className="text-sm font-bold text-white uppercase truncate">{profile.organization?.organization_name || 'N/A'}</p>
                                       </div>
                                       <div className="w-10 h-10 shrink-0 rounded-xl bg-white/5 flex items-center justify-center text-upwork-green">
                                          <Building2 size={18} />
                                       </div>
                                    </div>
                                    <div className="h-px bg-white/5" />
                                    <div className="flex justify-between items-center gap-4">
                                       <div className="space-y-0.5 overflow-hidden">
                                          <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Registration Type</p>
                                          <p className="text-sm font-bold text-white uppercase truncate">{profile.organization?.organization_type || 'Private Entity'}</p>
                                       </div>
                                       <div className="w-10 h-10 shrink-0 rounded-xl bg-white/5 flex items-center justify-center text-gray-400">
                                          <Briefcase size={18} />
                                       </div>
                                    </div>
                                    <div className="h-px bg-white/5" />
                                    <div className="flex justify-between items-center opacity-60 gap-4">
                                       <div className="space-y-0.5 overflow-hidden">
                                          <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Global Terminal</p>
                                          <p className="text-xs font-bold text-white uppercase truncate">
                                             {profile.organization?.city ? `${profile.organization.city}, ${profile.organization.country}` : 'Not Localized'}
                                          </p>
                                       </div>
                                       <div className="w-10 h-10 shrink-0 rounded-xl bg-white/5 flex items-center justify-center text-gray-400">
                                          <Globe size={18} />
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>

                     {/* Industry Protocol */}
                     <div className="p-6 sm:p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-sm">
                        <div className="flex items-center gap-6">
                           <div className="w-14 h-14 rounded-2xl bg-upwork-green/10 text-upwork-green flex items-center justify-center shadow-inner shrink-0">
                              <Zap size={24} fill="currentColor" className="opacity-80" />
                           </div>
                           <div>
                              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Industry Vertical</p>
                              <p className="text-base sm:text-lg font-black text-upwork-dark uppercase tracking-tight">
                                 {profile.IndustryCodes?.[0]?.name || profile.industries?.[0]?.name || 'General Industrial'}
                              </p>
                           </div>
                        </div>
                        <div className="flex items-center gap-3 w-full sm:w-auto overflow-hidden">
                           <div className="hidden xs:flex -space-x-2 shrink-0">
                              {[1,2,3].map(i => (
                                 <div key={i} className="test-node w-8 h-8 rounded-full border-2 border-white bg-gray-200" />
                              ))}
                           </div>
                           <span className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-[9px] font-black text-upwork-dark uppercase tracking-widest shadow-sm whitespace-nowrap">Verified Domain Focus</span>
                        </div>
                     </div>

                     {/* Infrastructure Section */}
                     <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-[2rem] sm:rounded-[3rem] border border-gray-100 p-8 sm:p-10 space-y-6">
                           <h4 className="text-[10px] font-black text-upwork-dark uppercase tracking-widest">Operational Capacity</h4>
                           <div className="flex items-end gap-2">
                              <span className="text-4xl font-black text-upwork-green">A+</span>
                              <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1.5">Rating</span>
                           </div>
                           <p className="text-xs text-gray-400 font-medium leading-relaxed">Your facility node is currently performing in the <span className="text-upwork-dark font-bold">top 5th percentile</span> of global industrial hubs.</p>
                           <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div className="w-[95%] h-full bg-upwork-green" />
                           </div>
                        </div>

                        <div className="bg-white rounded-[2.5rem] sm:rounded-[3rem] border border-gray-100 p-8 sm:p-10 space-y-6 relative overflow-hidden group">
                           <div className="absolute top-[-20px] right-[-20px] w-32 h-32 bg-amber-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                           <h4 className="text-[10px] font-black text-upwork-dark uppercase tracking-widest">Energy Sync</h4>
                           <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center">
                                 <Zap size={24} fill="currentColor" />
                              </div>
                              <div>
                                 <p className="text-2xl font-black text-upwork-dark">100%</p>
                                 <p className="text-[9px] font-black text-gray-400 uppercase">System Integrity</p>
                              </div>
                           </div>
                           <button className="text-[10px] font-black text-upwork-green uppercase tracking-widest hover:text-upwork-dark transition-colors">Launch Diagnostic Hub â†’</button>
                        </div>
                     </div>
                  </motion.div>
                )}

                {activeTab === 'organization' && (
                  <motion.div
                    key="organization"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                     <div className="bg-white rounded-[3.5rem] border border-gray-100 p-12 shadow-sm space-y-10">
                        <div className="flex justify-between items-center">
                           <div className="space-y-2">
                              <h3 className="text-3xl font-black text-upwork-dark uppercase tracking-tighter">Organization Node.</h3>
                              <p className="text-sm font-medium text-gray-400">Detailed industrial profile for {profile.organization?.organization_name || 'Your Entity'}.</p>
                           </div>
                           <div className="w-16 h-16 rounded-3xl bg-upwork-dark flex items-center justify-center text-upwork-green shadow-xl">
                              <Building2 size={32} />
                           </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                           <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100">
                              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Entity Type</p>
                              <p className="text-[11px] font-black text-upwork-dark uppercase">{profile.organization?.organization_type || 'General Procurement'}</p>
                           </div>
                           <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100">
                              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Department</p>
                              <p className="text-[11px] font-black text-upwork-dark uppercase">{profile.organization?.department || 'Operations'}</p>
                           </div>
                           <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100">
                              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Experience</p>
                              <p className="text-[11px] font-black text-upwork-dark uppercase">{profile.organization?.experience || 'Newly Verified'}</p>
                           </div>
                        </div>

                        <div className="space-y-6">
                           <div className="p-8 border-2 border-dashed border-gray-100 rounded-[2.5rem]">
                              <h4 className="text-[10px] font-black text-upwork-green uppercase tracking-widest mb-4 flex items-center gap-2">
                                 <Activity size={12} /> Industrial Mission
                              </h4>
                              <p className="text-sm text-gray-500 font-medium leading-relaxed italic">
                                 "{profile.organization?.description || 'No organizational description provided yet. Complete your profile to build trust with network participants.'}"
                              </p>
                           </div>

                           <div className="grid md:grid-cols-2 gap-8">
                              <div className="space-y-4">
                                 <h4 className="text-[10px] font-black text-upwork-dark uppercase tracking-widest">Primary Logistics Node</h4>
                                 <div className="p-6 bg-white border border-gray-100 rounded-3xl space-y-3">
                                    <div className="flex items-center gap-3">
                                       <MapPin size={16} className="text-upwork-green" />
                                       <span className="text-xs font-bold text-upwork-dark">
                                          {profile.organizationInfo?.full_address || 'Address Not Set'}
                                       </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                       <Globe size={16} className="text-gray-300" />
                                       <span className="text-[10px] font-black text-gray-400 uppercase">
                                          {profile.organization?.city}, {profile.organization?.country}
                                       </span>
                                    </div>
                                 </div>
                              </div>

                              <div className="space-y-4">
                                 <h4 className="text-[10px] font-black text-upwork-dark uppercase tracking-widest">Core Product Domain</h4>
                                 <div className="p-6 bg-upwork-dark text-white rounded-3xl">
                                    <p className="text-sm font-bold opacity-90">{profile.organization?.products_deal_with || 'General Industrial Supplies'}</p>
                                    <p className="text-[8px] font-black text-upwork-green uppercase tracking-[0.2em] mt-2">Active Trade Registry</p>
                                 </div>
                              </div>
                           </div>
                        </div>

                        <div className="pt-6 flex justify-between items-center bg-gray-50/50 p-6 rounded-[2rem] border border-gray-50">
                           <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-full bg-upwork-green flex items-center justify-center text-white scale-90">
                                 <CheckCircle size={18} />
                              </div>
                              <span className="text-[10px] font-black text-upwork-dark uppercase tracking-widest">Tax Registered Entity</span>
                           </div>
                           <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">#{profile.organizationInfo?.tax_number || 'PENDING-REG'}</span>
                        </div>
                     </div>
                  </motion.div>
                )}

                {activeTab === 'finances' && (
                  <motion.div
                    key="finances"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white rounded-[3.5rem] border border-gray-100 p-12 shadow-sm space-y-12"
                  >
                     <div className="space-y-2">
                        <h3 className="text-3xl font-black text-upwork-dark uppercase tracking-tighter">Financial Nodes.</h3>
                        <p className="text-sm font-medium text-gray-400">Manage transaction routes and payment gateway authorizations.</p>
                     </div>

                     <div className="space-y-6">
                        {profile.paymentMethods?.length > 0 ? (
                           profile.paymentMethods.map((pm, i) => (
                             <div key={pm.id} className="p-10 bg-gray-50 rounded-[2.5rem] border border-transparent hover:border-upwork-green/30 transition-all group flex justify-between items-center">
                                <div className="flex items-center gap-8">
                                   <div className="w-20 h-14 bg-white rounded-2xl border border-gray-100 flex items-center justify-center text-[10px] font-black text-upwork-dark uppercase tracking-widest group-hover:shadow-lg transition-all">
                                      {pm.method_type}
                                   </div>
                                   <div>
                                      <p className="text-lg font-black text-upwork-dark tracking-tight">{pm.payment_identifier}</p>
                                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Settlement Route</p>
                                   </div>
                                </div>
                                <div className="flex items-center gap-4">
                                   <span className="px-3 py-1 bg-upwork-green/20 text-upwork-green rounded-full text-[8px] font-black uppercase tracking-widest">Primary</span>
                                   <button className="p-3 bg-white rounded-xl text-gray-300 hover:text-red-500 transition-colors shadow-sm"><Edit3 size={16} /></button>
                                </div>
                             </div>
                           ))
                        ) : (
                           <div className="p-20 text-center border-4 border-dashed border-gray-100 rounded-[3rem] space-y-6">
                              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-200">
                                 <CreditCard size={40} />
                              </div>
                              <div className="space-y-2">
                                 <h4 className="text-xl font-black text-upwork-dark uppercase">No Nodes Attached</h4>
                                 <p className="text-sm text-gray-400 max-w-xs mx-auto">Connect a financial gateway to begin industrial settlements across the protocol.</p>
                              </div>
                              <button className="px-8 py-4 bg-upwork-dark text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-upwork-green transition-all shadow-xl">Attach Gateway Node</button>
                           </div>
                        )}
                     </div>
                  </motion.div>
                )}
             </AnimatePresence>
          </div>

        </motion.div>
      </div>
    </div>
  );
};

export default Profile;

