import React, { useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import AdminTopbar from '../components/AdminTopbar';
import DashboardHome from '../components/DashboardHome';
import OrderManagement from '../components/OrderManagement';
import UserManagement from '../components/UserManagement';
import RFQManagement from '../components/RFQManagement';
import ProfileView from '../components/ProfileView';
import { motion, AnimatePresence } from 'framer-motion';
import CatalogView from '../components/CatalogView';
import ProcurementManagement from '../components/ProcurementManagement';
import InboxView from '../components/InboxView';
import AnalyticsView from '../components/AnalyticsView';
import SettingsView from '../components/SettingsView';

const PlaceholderView = ({ title }) => (
  <div className="p-8 ml-64 min-h-[calc(100vh-80px)] bg-gray-50/50 flex flex-col items-center justify-center space-y-4">
    <div className="w-24 h-24 bg-gray-100 rounded-[2rem] flex items-center justify-center text-gray-300">
      <h1 className="text-4xl font-black">?</h1>
    </div>
    <div className="text-center">
      <h1 className="text-2xl font-black text-upwork-dark uppercase tracking-tight">{title} View</h1>
      <p className="text-gray-500 font-medium">This section is currently being calibrated for industrial deployment.</p>
    </div>
  </div>
);

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardHome />;
      case 'orders':
        return <OrderManagement />;
      case 'clients':
        return <UserManagement />;
      case 'stock':
        return <CatalogView />;
      case 'procurement':
        return <ProcurementManagement />;
      case 'rfq':
        return <RFQManagement />;
      case 'profile':
        return <ProfileView />;
      case 'inbox':
        return <InboxView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <AdminSidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
      />
      <div className="flex flex-col">
        <AdminTopbar setActiveTab={setActiveTab} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;

