import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import BuyerDashboard from './BuyerDashboard';
import SellerDashboard from './SellerDashboard';
import AdminDashboard from './AdminDashboard';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const userString = localStorage.getItem('user');
      if (userString) setUser(JSON.parse(userString));
    } catch (e) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-upwork-green/20 rounded-full" />
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-upwork-green border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 animate-pulse">
            Initializing Operations...
          </p>
        </div>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  switch (user.role) {
    case 'buyer':  return <BuyerDashboard />;
    case 'seller': return <SellerDashboard />;
    case 'admin':  return <AdminDashboard />;
    default:       return <Navigate to="/" replace />;
  }
};

export default Dashboard;

