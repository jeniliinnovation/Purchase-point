import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SellerSidebar from '../components/SellerSidebar';
import SellerTopbar from '../components/SellerTopbar';
import SellerDashboardHome from '../components/SellerDashboardHome';
import OpenRFQsView from '../components/OpenRFQsView';
import SubmitBidView from '../components/SubmitBidView';
import MyBidsView from '../components/MyBidsView';
import InboxView from '../components/InboxView';
import CatalogView from '../components/CatalogView';
import ProfileView from '../components/ProfileView';
import SellerAnalyticsView from '../components/SellerAnalyticsView';
import SettingsView from '../components/SettingsView';

const PlaceholderView = ({ title }) => (
  <div className="p-8 ml-64 min-h-[calc(100vh-80px)] bg-gray-50/50 flex flex-col items-center justify-center space-y-4">
    <div className="w-24 h-24 bg-gray-100 rounded-[2rem] flex items-center justify-center text-gray-300">
      <h1 className="text-4xl font-black">?</h1>
    </div>
    <div className="text-center">
      <h1 className="text-2xl font-black text-upwork-dark uppercase tracking-tight">{title}</h1>
      <p className="text-gray-500 font-medium">This section is currently being calibrated.</p>
    </div>
  </div>
);

const SellerDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedRFQ, setSelectedRFQ] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <SellerDashboardHome setActiveTab={setActiveTab} />;
      case 'open_rfqs':
        return <OpenRFQsView setActiveTab={setActiveTab} setSelectedRFQ={setSelectedRFQ} />;
      case 'submit_bid':
        return <SubmitBidView prefillRFQ={selectedRFQ} setActiveTab={setActiveTab} />;
      case 'my_bids':
        return <MyBidsView />;
      case 'analytics':
        return <SellerAnalyticsView />;
      case 'inbox':
        return <InboxView />;
      case 'catalog':
        return <CatalogView />;
      case 'profile':
        return <ProfileView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <SellerDashboardHome setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-white font-['Inter']">
      <SellerSidebar 
        activeTab={activeTab} 
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        setActiveTab={(tab) => {
          if (tab !== 'submit_bid') setSelectedRFQ(null);
          setActiveTab(tab);
          setIsSidebarOpen(false); // Close on selection
        }} 
      />
      <div className="flex flex-col">
        <SellerTopbar setActiveTab={setActiveTab} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default SellerDashboard;
