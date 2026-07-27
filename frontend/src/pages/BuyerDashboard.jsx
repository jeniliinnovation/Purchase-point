import React, { useState } from 'react';
import BuyerSidebar from '../components/BuyerSidebar';
import BuyerTopbar from '../components/BuyerTopbar';
import BuyerDashboardHome from '../components/BuyerDashboardHome';
import RFQManagement from '../components/RFQManagement';
import RFQFormView from '../components/RFQFormView';
import ProfileView from '../components/ProfileView';
import CatalogView from '../components/CatalogView';
import InboxView from '../components/InboxView';
import AnalyticsView from '../components/AnalyticsView';
import BuyerEventsView from '../components/BuyerEventsView';
import BuyerAwardsView from '../components/BuyerAwardsView';
import BuyerInvoicingView from '../components/BuyerInvoicingView';
import SettingsView from '../components/SettingsView';
import { motion, AnimatePresence } from 'framer-motion';

const BuyerDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <BuyerDashboardHome setActiveTab={setActiveTab} />;
      case 'events':
        return <BuyerEventsView />;
      case 'awards':
        return <BuyerAwardsView />;
      case 'search':
        return <CatalogView />;
      case 'rfq':
        return <RFQManagement />;
      case 'rfq_generator':
        return <RFQFormView onSaveSuccess={() => setActiveTab('rfq')} />;
      case 'analytics':
        return <AnalyticsView />;
      case 'invoicing':
        return <BuyerInvoicingView />;
      case 'catalog':
        return <CatalogView />;
      case 'profile':
        return <ProfileView />;
      case 'inbox':
        return <InboxView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <BuyerDashboardHome />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <BuyerSidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
      />
      <div className="flex flex-col">
        <BuyerTopbar setActiveTab={setActiveTab} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
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

export default BuyerDashboard;

