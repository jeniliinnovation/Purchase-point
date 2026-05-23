import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RoleSelector from './RoleSelector';

const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState(initialMode); // 'login' | 'signup'
  const [role, setRole] = useState(null); // 'buyer' | 'seller'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  if (!isOpen) return null;

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Submitting ${mode} for ${role || 'user'}:`, formData);
    // Future: API call to /api/auth/login or /api/auth/register
    alert(`${mode.toUpperCase()} Success (Mock) as ${role || 'User'}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-upwork-dark/50 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-xl overflow-hidden relative"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-upwork-gray hover:text-upwork-dark transition-colors text-2xl font-bold"
        >
          ✕
        </button>

        <div className="p-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-upwork-dark mb-2">
              {mode === 'login' ? 'Welcome Back' : 'Join Purchase Point'}
            </h2>
            <p className="text-upwork-gray font-medium">
              {mode === 'login' ? 'Login to manage your bidding portal.' : 'The global marketplace for industrial sourcing.'}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {!role ? (
              <motion.div
                key="role-selection"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="mb-6 text-center text-sm font-bold text-upwork-dark uppercase tracking-widest">Select your role</div>
                <RoleSelector onSelect={handleRoleSelect} />
              </motion.div>
            ) : (
              <motion.form 
                key="auth-form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
                onSubmit={handleSubmit}
              >
                {mode === 'signup' && (
                  <div className="flex gap-4">
                    <input
                      type="text"
                      placeholder="First Name"
                      required
                      className="flex-1 px-6 py-4 rounded-2xl bg-upwork-light-gray border-2 border-transparent focus:border-upwork-green outline-none transition-all font-medium"
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      required
                      className="flex-1 px-6 py-4 rounded-2xl bg-upwork-light-gray border-2 border-transparent focus:border-upwork-green outline-none transition-all font-medium"
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    />
                  </div>
                )}
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  className="w-full px-6 py-4 rounded-2xl bg-upwork-light-gray border-2 border-transparent focus:border-upwork-green outline-none transition-all font-medium"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  className="w-full px-6 py-4 rounded-2xl bg-upwork-light-gray border-2 border-transparent focus:border-upwork-green outline-none transition-all font-medium"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                
                <button 
                  type="submit"
                  className="w-full py-4 bg-upwork-green text-white rounded-full font-bold text-lg shadow-lg hover:bg-upwork-green/90 transition-all transform hover:-translate-y-1"
                >
                  {mode === 'login' ? `Log In as ${role === 'buyer' ? 'Buyer' : 'Supplier'}` : 'Continue'}
                </button>

                <div className="text-center mt-6 flex flex-col gap-3">
                  <button 
                    type="button"
                    onClick={() => setRole(null)}
                    className="text-upwork-gray hover:text-upwork-dark font-medium underline transition-colors"
                  >
                    Change Role
                  </button>
                  <button 
                    type="button"
                    onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setRole(null); }}
                    className="text-upwork-green font-bold hover:underline transition-colors"
                  >
                    {mode === 'login' ? "Don't have an account? Sign Up" : 'Already have an account? Log In'}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthModal;
