import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

import Home from './pages/Home';
import Buyer from './pages/Buyer';
import ActiveRFQs from './pages/ActiveRFQs';
import Suppliers from './pages/Suppliers';
import WhyPurchasePoint from './pages/WhyPurchasePoint';
import WhatsNew from './pages/WhatsNew';
import Login from './pages/Login';
import Register from './pages/Register';
import CategoryHub from './pages/CategoryHub';
import GeneralInfo from './pages/GeneralInfo';
import TrustSecurity from './pages/TrustSecurity';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Pricing from './pages/Pricing';
import Careers from './pages/Careers';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Solutions from './pages/Solutions';
import ForgotPassword from './pages/ForgotPassword';
import BuyerDashboard from './pages/BuyerDashboard';
import SellerDashboard from './pages/SellerDashboard';
import ProtectedRoute from './components/Auth/ProtectedRoute';

function App() {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const location = useLocation();

  // Safe user retrieval helper
  const getSafeUser = () => {
    try {
      const userStr = localStorage.getItem('user');
      if (!userStr) return null;
      return JSON.parse(userStr);
    } catch (e) {
      return null;
    }
  };

  // Only hide for Dashboard routes since they have dedicated Navigation
  const user = getSafeUser();
  const isDashboardRoute = location.pathname.startsWith('/admin') || 
                           location.pathname.startsWith('/dashboard') || 
                           location.pathname.startsWith('/seller-hub') ||
                           location.pathname.startsWith('/buyer-hub');

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <ScrollToTop />
      <div className="min-h-screen bg-white font-['Outfit'] tracking-wide">
        {!isDashboardRoute && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buyer" element={<Buyer />} />
          <Route path="/active-rfqs" element={<ActiveRFQs />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/why-purchase-point" element={<WhyPurchasePoint />} />
          <Route path="/whats-new" element={<WhatsNew />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/category/:categoryId" element={<CategoryHub />} />
          <Route path="/solutions" element={<Solutions />} />

          {/* Protected Dashboard Route */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />

          {/* Role specific redirects/fallbacks */}
          <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><Dashboard /></ProtectedRoute>} />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          <Route path="/seller-hub" element={<ProtectedRoute allowedRoles={['seller']}><SellerDashboard /></ProtectedRoute>} />
          <Route path="/buyer-hub" element={<ProtectedRoute allowedRoles={['buyer']}><BuyerDashboard /></ProtectedRoute>} />

          {/* Informational Pages */}
          <Route path="/resources/trust" element={<TrustSecurity />} />
          <Route path="/company/about" element={<AboutUs />} />
          <Route path="/company/contact" element={<ContactUs />} />
          <Route path="/resources/pricing" element={<Pricing />} />
          <Route path="/company/careers" element={<Careers />} />

          {/* Dynamic Fallbacks for other info */}
          <Route path="/company/:pageId" element={<GeneralInfo />} />
          <Route path="/solutions/:pageId" element={<GeneralInfo />} />
          <Route path="/resources/:pageId" element={<GeneralInfo />} />
        </Routes>
        {!isDashboardRoute && <Footer />}
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;

