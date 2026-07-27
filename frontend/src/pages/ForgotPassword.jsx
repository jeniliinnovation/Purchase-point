import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2, ArrowLeft, Mail, ShieldCheck, Lock, CheckCircle2 } from 'lucide-react';

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password, 4: Success
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    new_password: '',
    confirm_password: ''
  });

  const navigate = useNavigate();

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send reset code');
      setStep(2);
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/verify-reset-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, otp: formData.otp })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Invalid or expired code');
      setStep(3);
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (formData.new_password !== formData.confirm_password) {
      setErrorMsg('Passwords do not match');
      return;
    }
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: formData.email, 
          otp: formData.otp, 
          new_password: formData.new_password,
          confirm_password: formData.confirm_password
        })
      });
      const data = await res.json();
      if (!res.ok) throw Error(data.error || 'Failed to reset password');
      setStep(4);
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4 py-20">
      <div className="bg-white rounded-[2.5rem] shadow-xl w-full max-w-lg overflow-hidden p-8 sm:p-12 border border-gray-100">
        
        {step < 4 && (
          <div className="mb-8 flex items-center gap-4">
             <Link to="/login" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <ArrowLeft size={20} className="text-upwork-gray" />
             </Link>
             <h1 className="text-2xl font-black text-upwork-dark">Reset Password</h1>
          </div>
        )}

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step-email"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="bg-upwork-green/10 p-4 rounded-2xl mb-6 flex items-start gap-4">
                <Mail className="text-upwork-green shrink-0 mt-1" size={24} />
                <p className="text-sm text-upwork-dark font-medium leading-relaxed">
                  Enter the email address associated with your account and we'll send you a 6-digit verification code.
                </p>
              </div>

              <form onSubmit={handleSendOTP} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-upwork-dark mb-2 ml-1">Email Address</label>
                  <input
                    type="email"
                    required
                    className="w-full px-6 py-4 rounded-2xl bg-upwork-light-gray border-2 border-transparent focus:border-upwork-green outline-none transition-all font-medium"
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                {errorMsg && <p className="text-red-500 text-xs font-bold px-1">{errorMsg}</p>}

                <button
                  type="submit"
                  disabled={loading || !formData.email}
                  className="w-full py-4 bg-upwork-green text-white rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                >
                  {loading ? <Loader2 className="animate-spin mx-auto" /> : 'Send Reset Code'}
                </button>
              </form>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step-otp"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="bg-blue-50 p-4 rounded-2xl mb-6 flex items-start gap-4 border border-blue-100">
                <ShieldCheck className="text-blue-500 shrink-0 mt-1" size={24} />
                <div>
                  <p className="text-sm text-upwork-dark font-bold leading-relaxed px-1">Check your inbox</p>
                  <p className="text-xs text-gray-500 font-medium px-1">We sent a verification code to {formData.email}</p>
                </div>
              </div>

              <form onSubmit={handleVerifyOTP} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-upwork-dark mb-2 ml-1 text-center">Enter 6-Digit Code</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    className="w-full px-6 py-5 rounded-2xl bg-upwork-light-gray border-2 border-transparent focus:border-upwork-green outline-none transition-all font-black text-3xl text-center tracking-[0.5em]"
                    placeholder="000000"
                    value={formData.otp}
                    onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                  />
                </div>

                {errorMsg && <p className="text-red-500 text-xs font-bold text-center">{errorMsg}</p>}

                <button
                  type="submit"
                  disabled={loading || formData.otp.length < 6}
                  className="w-full py-4 bg-upwork-dark text-white rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                >
                  {loading ? <Loader2 className="animate-spin mx-auto" /> : 'Verify Code'}
                </button>

                <p className="text-center text-sm text-gray-400">
                  Didn't receive it? <button type="button" onClick={handleSendOTP} className="text-upwork-green font-bold hover:underline">Resend</button>
                </p>
              </form>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step-reset"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
               <div className="bg-purple-50 p-4 rounded-2xl mb-6 flex items-start gap-4 border border-purple-100">
                <Lock className="text-purple-500 shrink-0 mt-1" size={24} />
                <p className="text-sm text-upwork-dark font-medium leading-relaxed">
                  Security verified! Please enter your new password below.
                </p>
              </div>

              <form onSubmit={handleResetPassword} className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-upwork-dark mb-2 ml-1">New Password</label>
                  <input
                    type="password"
                    required
                    className="w-full px-6 py-4 rounded-2xl bg-upwork-light-gray border-2 border-transparent focus:border-upwork-green outline-none transition-all font-medium"
                    placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
                    value={formData.new_password}
                    onChange={(e) => setFormData({ ...formData, new_password: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-upwork-dark mb-2 ml-1">Confirm New Password</label>
                  <input
                    type="password"
                    required
                    className="w-full px-6 py-4 rounded-2xl bg-upwork-light-gray border-2 border-transparent focus:border-upwork-green outline-none transition-all font-medium"
                    placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
                    value={formData.confirm_password}
                    onChange={(e) => setFormData({ ...formData, confirm_password: e.target.value })}
                  />
                </div>

                {errorMsg && <p className="text-red-500 text-xs font-bold px-1">{errorMsg}</p>}

                <button
                  type="submit"
                  disabled={loading || !formData.new_password}
                  className="w-full py-4 bg-upwork-green text-white rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                >
                  {loading ? <Loader2 className="animate-spin mx-auto" /> : 'Set New Password'}
                </button>
              </form>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step-success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={48} className="text-upwork-green" />
              </div>
              <h2 className="text-3xl font-black text-upwork-dark mb-4">Password Reset!</h2>
              <p className="text-upwork-gray font-medium mb-10 leading-relaxed max-w-xs mx-auto">
                Your password has been successfully updated. You can now log in with your new credentials.
              </p>
              <Link
                to="/login"
                className="inline-block w-full py-4 bg-upwork-dark text-white rounded-full font-bold text-lg shadow-lg hover:bg-black transition-all"
              >
                Go to Login
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
};

export default ForgotPassword;


