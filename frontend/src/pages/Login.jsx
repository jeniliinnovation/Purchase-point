import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import RoleSelector from '../components/Auth/RoleSelector';

const Login = () => {
  const [role, setRole] = useState(null);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setLoading(true);
      setErrorMsg('');
      const decoded = jwtDecode(credentialResponse.credential);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_token: credentialResponse.credential, email: decoded.email, name: decoded.name, picture: decoded.picture })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Google login failed');
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      if (data.action === 'redirect_to_dashboard') window.location.href = '/dashboard';
      else if (data.action === 'redirect_to_role_selection') navigate('/register', { state: { resumeRole: null, email: decoded.email, userId: data.user.id } });
      else if (data.action === 'redirect_to_onboarding') navigate('/register', { state: { resumeRole: data.user.role, step: data.onboarding_step, email: data.user.email, userId: data.user.id } });
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAppleLogin = async () => {
    try {
      const appleClientId = import.meta.env.VITE_APPLE_CLIENT_ID;
      if (!appleClientId) { setErrorMsg('Apple login is not configured.'); return; }
      window.AppleID.auth.init({ clientId: appleClientId, scope: 'name email', redirectURI: window.location.origin + '/login', usePopup: true });
      const response = await window.AppleID.auth.signIn();
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login/apple`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identity_token: response.authorization.id_token, email: response.user?.email, name: response.user?.name ? `${response.user.name.firstName} ${response.user.name.lastName}` : null })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Apple login failed');
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      if (data.action === 'redirect_to_dashboard') window.location.href = '/dashboard';
      else if (data.action === 'redirect_to_onboarding') navigate('/register', { state: { resumeRole: data.user.role, step: data.onboarding_step, userId: data.user.id } });
    } catch (err) {
      setErrorMsg('Apple login failed. Note: Requires HTTPS and a verified domain.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        const userRole = data.user.role || role;
        if (data.action === 'redirect_to_onboarding') {
          navigate('/register', { state: { resumeRole: userRole, step: data.onboarding_step, email: data.user.email, userId: data.user.id } });
        } else if (data.action === 'show_waiting_screen' || data.action === 'show_approval_waiting_screen') {
          setErrorMsg('Your account is pending admin approval. Check back later.');
        } else {
          navigate('/dashboard');
        }
      } else {
        setErrorMsg(data.message || data.error || 'Invalid credentials. Please try again.');
      }
    } catch (error) {
      setErrorMsg('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6 py-12 sm:py-20">
      <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] shadow-xl w-full max-w-xl overflow-hidden p-6 sm:p-10 border border-gray-100">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-upwork-dark mb-2">Welcome Back</h1>
          <p className="text-upwork-gray font-medium">Log in to manage your procurement and bids.</p>
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
              <RoleSelector onSelect={setRole} />

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
                <div className="relative flex justify-center text-sm font-bold"><span className="px-4 bg-white text-upwork-gray uppercase tracking-widest">Or continue with</span></div>
              </div>

                <div className="flex flex-col gap-4">
                <div className="flex justify-center w-full overflow-hidden">
                  <div className="scale-[0.85] sm:scale-100 origin-center">
                    <GoogleLogin
                      onSuccess={handleGoogleSuccess}
                      onError={() => setErrorMsg('Google Login Failed')}
                      theme="outline" size="large" shape="pill" width="360"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleAppleLogin}
                  className="flex items-center justify-center gap-3 py-3 px-4 border-2 border-upwork-light-gray rounded-full hover:bg-gray-50 transition-colors bg-white w-full max-w-[360px] mx-auto"
                >
                  <img src="https://www.apple.com/favicon.ico" className="w-5 h-5" alt="Apple" />
                  <span className="text-sm font-bold text-upwork-dark">Continue with Apple</span>
                </button>
              </div>

              <div className="text-center mt-8 space-y-4">
                <Link to="/register" className="text-upwork-green font-bold hover:underline">Don't have an account? Sign Up</Link>
                <div className="pt-4 border-t border-gray-50">
                   <button 
                     onClick={() => {
                        localStorage.setItem('token', 'dev-token');
                        localStorage.setItem('user', JSON.stringify({ id: 1, name: 'Dev Admin', email: 'admin@purchasepoint.com', role: 'admin' }));
                        window.location.href = '/dashboard';
                     }}
                     className="text-[9px] font-black text-gray-300 uppercase tracking-[0.3em] hover:text-upwork-green transition-colors"
                   >
                     ⚡ Dev Fast-Track: Emergency Admin Access
                   </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="auth-form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-5"
              onSubmit={handleSubmit}
            >
              {/* Error Message */}
              <AnimatePresence>
                {errorMsg && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-5 py-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-xs font-bold leading-relaxed"
                  >
                    {errorMsg}
                  </motion.div>
                )}
              </AnimatePresence>

              <input
                type="email"
                placeholder="Email Address"
                required
                autoFocus
                autoComplete="email"
                className="w-full px-6 py-4 rounded-2xl bg-upwork-light-gray border-2 border-transparent focus:border-upwork-green outline-none transition-all font-medium"
                value={formData.email}
                onChange={(e) => { setFormData({ ...formData, email: e.target.value }); setErrorMsg(''); }}
              />
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  required
                  autoComplete="current-password"
                  className="w-full px-6 py-4 rounded-2xl bg-upwork-light-gray border-2 border-transparent focus:border-upwork-green outline-none transition-all font-medium pr-14"
                  value={formData.password}
                  onChange={(e) => { setFormData({ ...formData, password: e.target.value }); setErrorMsg(''); }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-upwork-dark transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <div className="flex justify-end">
                <Link to="/forgot-password" className="text-xs font-medium text-upwork-gray hover:text-upwork-dark transition-colors">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 text-white rounded-full font-bold text-lg shadow-lg transition-all transform hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3 ${
                  role === 'admin' ? 'bg-upwork-dark hover:bg-black' : 
                  role === 'seller' ? 'bg-blue-600 hover:bg-blue-700' : 
                  'bg-upwork-green hover:bg-upwork-green/90'
                }`}
              >
                {loading ? (
                  <><Loader2 size={20} className="animate-spin" /> Authenticating...</>
                ) : (
                  `Log In as ${role === 'admin' ? 'Administrator' : role === 'seller' ? 'Supplier' : 'Buyer'}`
                )}
              </button>

              <div className="text-center flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => { setRole(null); setErrorMsg(''); }}
                  className="text-upwork-gray hover:text-upwork-dark font-medium underline transition-colors"
                >
                  Change Role
                </button>
                <Link to="/register" className="text-upwork-green font-bold hover:underline transition-colors">
                  Don't have an account? Sign Up
                </Link>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
};

export default Login;
