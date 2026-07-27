import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { ChevronDown, CheckCircle2 } from 'lucide-react';
import RoleSelector from '../components/Auth/RoleSelector';

const Register = () => {
  const [role, setRole] = useState(null);
  const [activeStep, setActiveStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    organization_name: '',
    organization_type: '',
    experience: '',
    description: '',
    id_proof: '',
    products_deal_with: '',
    supplier_type: '',
    department: '', country: '', state: '', city: '', post_code: '',
    email: '', otp: '',
    username: '', password: '', confirm_password: '',
    full_address: '', website: '', authorized_contact: '', contact_phone: '', tax_number: '', tax_registered: false,
    full_name: '', last_name: '', designation: '', national_id: '', tax_id: '',
    industry_code: '',
    bank_name: '',
    account_no: '',
    ifsc_code: '',
    account_holder_name: '',
    bank_location: '',
    payment_method: 'internet_banking',
    terms_accepted: false,
    userId: null
  });

  const sellerSteps = [
    { id: 1, title: 'Organization Data', icon: <ChevronDown /> },
    { id: 2, title: 'Verify Email', icon: <CheckCircle2 /> },
    { id: 3, title: 'Account Settings', icon: <ChevronDown /> },
    { id: 4, title: 'Business Info', icon: <ChevronDown /> },
    { id: 5, title: 'Personal Profile', icon: <ChevronDown /> },
    { id: 6, title: 'Industry Focus', icon: <ChevronDown /> },
    { id: 7, title: 'Payment Setup', icon: <ChevronDown /> }
  ];

  const buyerSteps = [
    { id: 1, title: 'Organization Details', icon: <ChevronDown /> },
    { id: 2, title: 'Register Account', icon: <ChevronDown /> }, // Email/Pass
    { id: 3, title: 'Owner Details', icon: <ChevronDown /> },
    { id: 4, title: 'Bank Details', icon: <ChevronDown /> },
    { id: 5, title: 'Term & Condition', icon: <ChevronDown /> }
  ];

  const activeStepsList = role === 'seller' ? sellerSteps : buyerSteps;

  useEffect(() => {
    const fetchExistingData = async (uid) => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/onboarding/status/${uid}`);
        const result = await res.json();
        if (res.ok && result.data) {
          const d = result.data;
          
          // Parse bank details from payment identifier if exists
          let bankName = '';
          let accountNo = '';
          const payment = d.PaymentMethods?.[0];
          if (payment && payment.payment_identifier && payment.payment_identifier.includes('|')) {
            const parts = payment.payment_identifier.split('|').map(p => p.trim());
            bankName = parts[0];
            accountNo = parts[1];
          }

          setFormData(prev => ({
            ...prev,
            userId: uid,
            email: result.email || prev.email,
            username: d.name || '',
            // Organization Data - handles both 'Organization' and 'organization' (Sequelize include variations)
            organization_name: d.Organization?.organization_name || d.organization?.organization_name || '',
            organization_type: d.Organization?.organization_type || d.organization?.organization_type || '',
            department: d.Organization?.department || d.organization?.department || '',
            country: d.Organization?.country || d.organization?.country || '',
            state: d.Organization?.state || d.organization?.state || '',
            city: d.Organization?.city || d.organization?.city || '',
            post_code: d.Organization?.post_code || d.organization?.post_code || '',
            experience: d.Organization?.experience || d.organization?.experience || '',
            description: d.Organization?.description || d.organization?.description || '',
            id_proof: d.Organization?.id_proof || d.organization?.id_proof || '',
            products_deal_with: d.Organization?.products_deal_with || d.organization?.products_deal_with || '',
            supplier_type: d.Organization?.supplier_type || d.organization?.supplier_type || '',
            // Organization Info
            full_address: d.OrganizationInfo?.full_address || d.organizationInfo?.full_address || '',
            website: d.OrganizationInfo?.website || d.organizationInfo?.website || '',
            authorized_contact: d.OrganizationInfo?.authorized_contact || d.organizationInfo?.authorized_contact || '',
            contact_phone: d.OrganizationInfo?.contact_phone || d.organizationInfo?.contact_phone || d.PersonalInfo?.contact_phone || d.personalInfo?.contact_phone || '',
            tax_number: d.OrganizationInfo?.tax_number || d.organizationInfo?.tax_number || '',
            tax_registered: d.OrganizationInfo?.tax_registered ?? d.organizationInfo?.tax_registered ?? false,
            // Personal Info
            full_name: d.PersonalInfo?.full_name || d.personalInfo?.full_name || '',
            last_name: d.PersonalInfo?.last_name || d.personalInfo?.last_name || '',
            designation: d.PersonalInfo?.designation || d.personalInfo?.designation || '',
            national_id: d.PersonalInfo?.national_id || d.personalInfo?.national_id || '',
            tax_id: d.PersonalInfo?.tax_id || d.personalInfo?.tax_id || '',
            // Industry
            industry_code: d.IndustryCodes?.[0]?.name?.toLowerCase() || d.industries?.[0]?.name?.toLowerCase() || '',
            // Payment
            payment_method: payment?.method_type || 'internet_banking',
            bank_name: bankName,
            account_no: accountNo
          }));
        }
      } catch (err) {
        console.error('Error fetching existing data:', err);
      }
    };

    if (location.state?.resumeRole) {
      setRole(location.state.resumeRole === 'seller' ? 'seller' : 'buyer');
      const uid = location.state.userId;

      if (location.state.step) {
        const stepNum = parseInt(location.state.step);
        setActiveStep(stepNum || 1);
        const prevSteps = [];
        for (let i = 1; i < stepNum; i++) prevSteps.push(i);
        setCompletedSteps(prevSteps);
      }

      if (uid) {
        fetchExistingData(uid);
      } else if (location.state.email) {
        setFormData(prev => ({ ...prev, email: location.state.email }));
      }
    }
  }, [location.state]);

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_token: credentialResponse.credential,
          email: decoded.email,
          name: decoded.name,
          picture: decoded.picture
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Google login failed');

      // Persistence
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      if (data.action === 'redirect_to_dashboard') {
        window.location.href = data.user.role === 'seller' ? '/active-rfqs' : '/buyer';
      } else if (data.action === 'redirect_to_role_selection') {
        // User created, now prompt for role (refresh current page state)
        setFormData(prev => ({ ...prev, email: decoded.email, userId: data.user.id }));
        setRole(null); // Show role selector
      } else if (data.action === 'redirect_to_onboarding') {
        // Resume onboarding
        setRole(data.user.role === 'seller' ? 'seller' : 'buyer');
        setActiveStep(data.onboarding_step || 1);
        setFormData(prev => ({ ...prev, userId: data.user.id, email: data.user.email }));
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleAppleLogin = async () => {
    try {
      const appleClientId = import.meta.env.VITE_APPLE_CLIENT_ID;
      if (!appleClientId) {
        alert('Apple Client ID not configured in .env');
        return;
      }

      window.AppleID.auth.init({
        clientId: appleClientId,
        scope: 'name email',
        redirectURI: window.location.origin + '/register',
        usePopup: true
      });

      const response = await window.AppleID.auth.signIn();
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login/apple`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identity_token: response.authorization.id_token,
          email: response.user?.email,
          name: response.user?.name ? `${response.user.name.firstName} ${response.user.name.lastName}` : null
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Apple login failed');

      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      if (data.action === 'redirect_to_dashboard') {
        window.location.href = data.user.role === 'seller' ? '/active-rfqs' : '/buyer';
      } else if (data.action === 'redirect_to_role_selection') {
        setFormData(prev => ({ ...prev, email: data.user.email, userId: data.user.id }));
        setRole(null);
      } else if (data.action === 'redirect_to_onboarding') {
        setRole(data.user.role === 'seller' ? 'seller' : 'buyer');
        setActiveStep(data.onboarding_step || 1);
        setFormData(prev => ({ ...prev, userId: data.user.id, email: data.user.email }));
      }
    } catch (err) {
      console.error('Apple Login Error:', err);
      alert('Apple Login failed. Note: This requires HTTPS and a verified domain.');
    }
  };

  const handleSendOTP = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      setErrors({ ...errors, email: 'Enter a valid email to send OTP' });
      return;
    }
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/onboarding/send-otp`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send OTP');
      alert(`OTP sent to ${formData.email}! Please check your inbox.`);
    } catch (err) {
      alert(err.message || 'Error communicating with server');
    }
  };

  const handleVerifyOTP = async () => {
    if (!formData.email || !formData.otp) {
      setErrors({ ...errors, otp: 'Email and OTP required to verify' });
      return;
    }
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/onboarding/verify-otp`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, otp: formData.otp })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Invalid OTP');
      alert('Email Successfully Verified! You may proceed.');
    } catch (err) {
      alert(err.message || 'Error verifying OTP');
    }
  };

  const onboardingStep = async (url, body, stepName) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(`${stepName} failed: ${data.error || 'Unknown error'}`);
    return data;
  };

  const handleSellerNextStep = async (stepId) => {
    let newErrors = {};
    if (stepId === 1) {
      if (!formData.organization_name) newErrors.organization_name = 'Required';
      if (!formData.organization_type) newErrors.organization_type = 'Required';
      if (!formData.department) newErrors.department = 'Required';
      if (!formData.country) newErrors.country = 'Required';
      if (!formData.state) newErrors.state = 'Required';
      if (!formData.city) newErrors.city = 'Required';
      if (!formData.post_code) newErrors.post_code = 'Required';
    } else if (stepId === 2) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email) newErrors.email = 'Email required';
      else if (!emailRegex.test(formData.email)) newErrors.email = 'Invalid email';
      if (!formData.otp) newErrors.otp = 'OTP required';
    } else if (stepId === 3) {
      if (!formData.username) newErrors.username = 'Required';
      if (!formData.password) newErrors.password = 'Required';
      if (formData.password && formData.password !== formData.confirm_password) newErrors.confirm_password = 'Passwords must match';
    } else if (stepId === 4) {
      if (!formData.full_address) newErrors.full_address = 'Required';
      if (!formData.authorized_contact) newErrors.authorized_contact = 'Required';
    } else if (stepId === 5) {
      if (!formData.full_name) newErrors.full_name = 'Required';
      if (!formData.last_name) newErrors.last_name = 'Required';
    } else if (stepId === 6) {
      if (!formData.industry_code) newErrors.industry_code = 'Required';
    }

    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    setErrors({});

    try {
      let currentUserId = location.state?.userId || formData.userId;
      if (stepId === 3) {
        if (!currentUserId) {
          const registerRes = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: formData.email, password: formData.password, confirm_password: formData.confirm_password })
          });
          const registerData = await registerRes.json();
          if (!registerRes.ok) throw new Error(registerData.error || 'Registration failed');
          currentUserId = registerData.user.id;
          setFormData(prev => ({ ...prev, userId: currentUserId }));
          await onboardingStep(`${import.meta.env.VITE_API_URL}/auth/select-role`, { user_id: currentUserId, role: role }, 'Role Selection');
          await onboardingStep(`${import.meta.env.VITE_API_URL}/onboarding/organization`, {
            user_id: currentUserId, 
            organization_name: formData.organization_name,
            organization_type: formData.organization_type, 
            department: formData.department,
            country: formData.country, 
            state: formData.state, 
            city: formData.city, 
            post_code: formData.post_code
          }, 'Organization Data');
        }
        await onboardingStep(`${import.meta.env.VITE_API_URL}/onboarding/create-user`, {
          user_id: currentUserId, username: formData.username, password: formData.password, confirm_password: formData.confirm_password
        }, 'User ID Creation');
      } else if (stepId >= 4 && currentUserId) {
        if (stepId === 4) {
          await onboardingStep(`${import.meta.env.VITE_API_URL}/onboarding/organization-info`, {
            user_id: currentUserId, full_address: formData.full_address, website: formData.website,
            authorized_contact: formData.authorized_contact, contact_phone: formData.contact_phone, tax_number: formData.tax_number, tax_registered: !!formData.tax_number
          }, 'Organization Info');
        } else if (stepId === 5) {
          await onboardingStep(`${import.meta.env.VITE_API_URL}/onboarding/personal-info`, {
            user_id: currentUserId, full_name: formData.full_name, last_name: formData.last_name,
            designation: formData.designation, national_id: formData.national_id, tax_id: formData.tax_id
          }, 'Personal Info');
        } else if (stepId === 6) {
          let mappedCode = 3;
          if (formData.industry_code === 'logistics') mappedCode = 2;
          if (formData.industry_code === 'electronics') mappedCode = 1;
          await onboardingStep(`${import.meta.env.VITE_API_URL}/onboarding/select-industry`, {
            user_id: currentUserId, industry_codes: [mappedCode]
          }, 'Industry Selection');
        }
      }
      if (!completedSteps.includes(stepId)) setCompletedSteps([...completedSteps, stepId]);
      setActiveStep(stepId + 1);
    } catch (err) { alert(`Error saving step ${stepId}: ${err.message}`); }
  };

  const handleBuyerNextStep = async (stepId) => {
    let newErrors = {};
    if (stepId === 1) {
      if (!formData.organization_name) newErrors.organization_name = 'Required';
      if (!formData.organization_type) newErrors.organization_type = 'Required';
    } else if (stepId === 2) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email) newErrors.email = 'Email required';
      else if (!emailRegex.test(formData.email)) newErrors.email = 'Invalid email';
      if (!formData.password) newErrors.password = 'Password required';
      if (formData.password && formData.password !== formData.confirm_password) newErrors.confirm_password = 'Passwords must match';
    } else if (stepId === 3) {
      if (!formData.full_name) newErrors.full_name = 'Required';
    } else if (stepId === 4) {
      if (!formData.bank_name) newErrors.bank_name = 'Required';
      if (!formData.account_no) newErrors.account_no = 'Required';
      if (!formData.ifsc_code) newErrors.ifsc_code = 'Required';
    }

    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    setErrors({});

    try {
      let currentUserId = location.state?.userId || formData.userId;

      if (stepId === 2) {
        if (!currentUserId) {
          const registerRes = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: formData.email, password: formData.password, confirm_password: formData.confirm_password })
          });
          const registerData = await registerRes.json();
          if (!registerRes.ok) throw new Error(registerData.error || 'Registration failed');
          currentUserId = registerData.user.id;
          setFormData(prev => ({ ...prev, userId: currentUserId }));
          await onboardingStep(`${import.meta.env.VITE_API_URL}/auth/select-role`, { user_id: currentUserId, role: role }, 'Role Selection');
        }
        // Save Step 1 data (Buyer Org)
        await onboardingStep(`${import.meta.env.VITE_API_URL}/onboarding/organization`, {
          user_id: currentUserId, organization_name: formData.organization_name, organization_type: formData.organization_type,
          experience: formData.experience, description: formData.description, id_proof: formData.id_proof,
          products_deal_with: formData.products_deal_with, supplier_type: formData.supplier_type,
          country: 'N/A' // Fallback for Buyer
        }, 'Organization Data');
      } else if (stepId === 3 && currentUserId) {
        await onboardingStep(`${import.meta.env.VITE_API_URL}/onboarding/personal-info`, {
          user_id: currentUserId, full_name: formData.full_name, designation: formData.designation,
          national_id: formData.national_id, contact_phone: formData.contact_phone
        }, 'Owner Details');
      } else if (stepId === 4 && currentUserId) {
        await onboardingStep(`${import.meta.env.VITE_API_URL}/onboarding/payment-method`, {
          user_id: currentUserId, method_type: 'internet_banking',
          bank_name: formData.bank_name, account_no: formData.account_no,
          ifsc_code: formData.ifsc_code, account_holder_name: formData.account_holder_name,
          bank_location: formData.bank_location
        }, 'Bank Details');
      }

      if (!completedSteps.includes(stepId)) setCompletedSteps([...completedSteps, stepId]);
      setActiveStep(stepId + 1);
    } catch (err) { alert(`Error saving step ${stepId}: ${err.message}`); }
  };

  const handleNextStep = async (stepId) => {
    if (role === 'seller') await handleSellerNextStep(stepId);
    else await handleBuyerNextStep(stepId);
  };

  const handleFinalSubmit = async (e) => {
    if (e) e.preventDefault();
    console.log(`Finalizing Onboarding for ${role}:`, formData);

    try {
      let currentUserId = location.state?.userId || formData.userId;

      if (role === 'buyer') {
        // Validation for Step 5 (Terms)
        if (!formData.terms_accepted) {
          setErrors({ ...errors, terms_accepted: true });
          return;
        }
        await onboardingStep(`${import.meta.env.VITE_API_URL}/onboarding/complete`, { user_id: currentUserId, terms_accepted: true }, 'Finalization');
      } else {
        // ... Finalize seller payment was already called in handleSellerNextStep if they were on step 7
        await onboardingStep(`${import.meta.env.VITE_API_URL}/onboarding/complete`, { user_id: currentUserId }, 'Finalization');
      }

      alert('Onboarding Completed Successfully! Welcome to Purchase Point.');
      window.location.href = role === 'seller' ? '/active-rfqs' : '/dashboard';
    } catch (err) {
      alert(`Final submission failed: ${err.message}`);
    }
  };

  // Helper for dynamic input classes
  const inputClass = (field) =>
    `w-full px-5 py-3 rounded-lg bg-gray-50 border-2 outline-none transition-all ${errors[field] ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-upwork-green'
    }`;

  const renderSellerStep = (stepId) => {
    switch (stepId) {
      case 1:
        return (
          <div className="space-y-4">
            <input type="text" placeholder="Organization Name *" className={inputClass('organization_name')} value={formData.organization_name} onChange={e => { setFormData({ ...formData, organization_name: e.target.value }); setErrors({ ...errors, organization_name: null }) }} />
            {errors.organization_name && <p className="text-xs text-red-500 font-bold mt-1 pl-2">Organization Name is required</p>}
            <input type="text" placeholder="Organization Type *" className={inputClass('organization_type')} value={formData.organization_type} onChange={e => { setFormData({ ...formData, organization_type: e.target.value }); setErrors({ ...errors, organization_type: null }) }} />
            {errors.organization_type && <p className="text-xs text-red-500 font-bold mt-1 pl-2">Organization Type is required</p>}
            <input type="text" placeholder="Department *" className={inputClass('department')} value={formData.department} onChange={e => { setFormData({ ...formData, department: e.target.value }); setErrors({ ...errors, department: null }) }} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" placeholder="Country *" className={inputClass('country')} value={formData.country} onChange={e => { setFormData({ ...formData, country: e.target.value }); setErrors({ ...errors, country: null }) }} />
              <input type="text" placeholder="State *" className={inputClass('state')} value={formData.state} onChange={e => { setFormData({ ...formData, state: e.target.value }); setErrors({ ...errors, state: null }) }} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" placeholder="City *" className={inputClass('city')} value={formData.city} onChange={e => { setFormData({ ...formData, city: e.target.value }); setErrors({ ...errors, city: null }) }} />
              <input type="text" placeholder="Post Code *" className={inputClass('post_code')} value={formData.post_code} onChange={e => { setFormData({ ...formData, post_code: e.target.value }); setErrors({ ...errors, post_code: null }) }} />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div className="flex gap-2">
              <input type="email" placeholder="Email Address *" className={inputClass('email')} value={formData.email} onChange={e => { setFormData({ ...formData, email: e.target.value }); setErrors({ ...errors, email: null }) }} />
              <button type="button" onClick={handleSendOTP} className="px-4 py-2 bg-upwork-dark text-white rounded-lg text-sm font-bold whitespace-nowrap">Send OTP</button>
            </div>
            {errors.email && <p className="text-xs text-red-500 font-bold mt-1 pl-2">{errors.email}</p>}
            <div className="flex gap-2">
              <input type="text" placeholder="Enter OTP *" className={inputClass('otp')} value={formData.otp} onChange={e => { setFormData({ ...formData, otp: e.target.value }); setErrors({ ...errors, otp: null }) }} />
              <button type="button" onClick={handleVerifyOTP} className="px-4 py-2 bg-upwork-green text-white rounded-lg text-sm font-bold whitespace-nowrap">Verify</button>
            </div>
            {errors.otp && <p className="text-xs text-red-500 font-bold mt-1 pl-2">{errors.otp}</p>}
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <input type="text" placeholder="Username *" className={inputClass('username')} value={formData.username} onChange={e => { setFormData({ ...formData, username: e.target.value }); setErrors({ ...errors, username: null }) }} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <input type="password" placeholder="Password *" className={inputClass('password')} value={formData.password} onChange={e => { setFormData({ ...formData, password: e.target.value }); setErrors({ ...errors, password: null }) }} />
                {errors.password && <p className="text-xs text-red-500 font-bold mt-1 pl-2">{errors.password}</p>}
              </div>
              <div>
                <input type="password" placeholder="Confirm Password *" className={inputClass('confirm_password')} value={formData.confirm_password} onChange={e => { setFormData({ ...formData, confirm_password: e.target.value }); setErrors({ ...errors, confirm_password: null }) }} />
                {errors.confirm_password && <p className="text-xs text-red-500 font-bold mt-1 pl-2">{errors.confirm_password}</p>}
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <textarea placeholder="Full Address *" className={inputClass('full_address')} rows="3" value={formData.full_address} onChange={e => { setFormData({ ...formData, full_address: e.target.value }); setErrors({ ...errors, full_address: null }) }}></textarea>
            <input type="text" placeholder="Website" className="w-full px-5 py-3 rounded-lg bg-gray-50 border-2 border-gray-200 focus:border-upwork-green outline-none" value={formData.website} onChange={e => setFormData({ ...formData, website: e.target.value })} />
            <input type="text" placeholder="Authorized Contact *" className={inputClass('authorized_contact')} value={formData.authorized_contact} onChange={e => { setFormData({ ...formData, authorized_contact: e.target.value }); setErrors({ ...errors, authorized_contact: null }) }} />
            <input type="text" placeholder="Contact Phone" className="w-full px-5 py-3 rounded-lg bg-gray-50 border-2 border-gray-200 focus:border-upwork-green outline-none" value={formData.contact_phone} onChange={e => setFormData({ ...formData, contact_phone: e.target.value })} />
            <input type="text" placeholder="Tax/Registration Number" className="w-full px-5 py-3 rounded-lg bg-gray-50 border-2 border-gray-200 focus:border-upwork-green outline-none" value={formData.tax_number} onChange={e => setFormData({ ...formData, tax_number: e.target.value })} />
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input type="text" placeholder="First Name *" className={inputClass('full_name')} value={formData.full_name} onChange={e => { setFormData({ ...formData, full_name: e.target.value }); setErrors({ ...errors, full_name: null }) }} />
                {errors.full_name && <p className="text-xs text-red-500 font-bold mt-1 pl-2">First Name is required</p>}
              </div>
              <div>
                <input type="text" placeholder="Last Name *" className={inputClass('last_name')} value={formData.last_name} onChange={e => { setFormData({ ...formData, last_name: e.target.value }); setErrors({ ...errors, last_name: null }) }} />
                {errors.last_name && <p className="text-xs text-red-500 font-bold mt-1 pl-2">Last Name is required</p>}
              </div>
            </div>
            <input type="text" placeholder="Designation" className="w-full px-5 py-3 rounded-lg bg-gray-50 border-2 border-gray-200 focus:border-upwork-green outline-none" value={formData.designation} onChange={e => setFormData({ ...formData, designation: e.target.value })} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" placeholder="National ID" className="w-full px-5 py-3 rounded-lg bg-gray-50 border-2 border-gray-200 focus:border-upwork-green outline-none" value={formData.national_id} onChange={e => setFormData({ ...formData, national_id: e.target.value })} />
              <input type="text" placeholder="Tax ID" className="w-full px-5 py-3 rounded-lg bg-gray-50 border-2 border-gray-200 focus:border-upwork-green outline-none" value={formData.tax_id} onChange={e => setFormData({ ...formData, tax_id: e.target.value })} />
            </div>
          </div>
        );
      case 6:
        return (
          <div className="space-y-4">
            <select className={inputClass('industry_code')} value={formData.industry_code} onChange={e => { setFormData({ ...formData, industry_code: e.target.value }); setErrors({ ...errors, industry_code: null }) }}>
              <option value="">Select Industry Code...</option>
              <option value="manufacturing">Manufacturing</option>
              <option value="logistics">Logistics</option>
              <option value="electronics">Electronics</option>
            </select>
            {errors.industry_code && <p className="text-xs text-red-500 font-bold mt-1 pl-2">Industry Code is required</p>}
          </div>
        );
      case 7:
        return (
          <div className="space-y-3">
            <label className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <input type="radio" name="payment" value="internet_banking" checked={formData.payment_method === 'internet_banking'} onChange={e => setFormData({ ...formData, payment_method: e.target.value })} className="w-5 h-5 text-upwork-green" />
              <span className="font-medium text-upwork-dark">Internet Banking</span>
            </label>
            <label className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <input type="radio" name="payment" value="paypal" checked={formData.payment_method === 'paypal'} onChange={e => setFormData({ ...formData, payment_method: e.target.value })} className="w-5 h-5 text-upwork-green" />
              <span className="font-medium text-upwork-dark">PayPal</span>
            </label>
            <label className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <input type="radio" name="payment" value="google_pay" checked={formData.payment_method === 'google_pay'} onChange={e => setFormData({ ...formData, payment_method: e.target.value })} className="w-5 h-5 text-upwork-green" />
              <span className="font-medium text-upwork-dark">Google Pay</span>
            </label>
          </div>
        );
      default:
        return null;
    }
  };

  const renderBuyerStep = (stepId) => {
    switch (stepId) {
      case 1:
        return (
          <div className="space-y-4">
            <input type="text" placeholder="Organization Name *" className={inputClass('organization_name')} value={formData.organization_name} onChange={e => { setFormData({ ...formData, organization_name: e.target.value }); setErrors({ ...errors, organization_name: null }) }} />
            <input type="text" placeholder="Organization Type *" className={inputClass('organization_type')} value={formData.organization_type} onChange={e => { setFormData({ ...formData, organization_type: e.target.value }); setErrors({ ...errors, organization_type: null }) }} />
            <input type="text" placeholder="Experience" className="w-full px-5 py-3 rounded-lg bg-gray-50 border-2 border-gray-200 focus:border-upwork-green outline-none" value={formData.experience} onChange={e => setFormData({ ...formData, experience: e.target.value })} />
            <textarea placeholder="Description" className="w-full px-5 py-3 rounded-lg bg-gray-50 border-2 border-gray-200 focus:border-upwork-green outline-none" rows="2" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}></textarea>
            <input type="text" placeholder="ID Proof" className="w-full px-5 py-3 rounded-lg bg-gray-50 border-2 border-gray-200 focus:border-upwork-green outline-none" value={formData.id_proof} onChange={e => setFormData({ ...formData, id_proof: e.target.value })} />
            <input type="text" placeholder="Website" className="w-full px-5 py-3 rounded-lg bg-gray-50 border-2 border-gray-200 focus:border-upwork-green outline-none" value={formData.website} onChange={e => setFormData({ ...formData, website: e.target.value })} />
            <input type="text" placeholder="Products you deal with" className="w-full px-5 py-3 rounded-lg bg-gray-50 border-2 border-gray-200 focus:border-upwork-green outline-none" value={formData.products_deal_with} onChange={e => setFormData({ ...formData, products_deal_with: e.target.value })} />
            <input type="text" placeholder="Supplier Type" className="w-full px-5 py-3 rounded-lg bg-gray-50 border-2 border-gray-200 focus:border-upwork-green outline-none" value={formData.supplier_type} onChange={e => setFormData({ ...formData, supplier_type: e.target.value })} />
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <input type="email" placeholder="Email Address *" className={inputClass('email')} value={formData.email} onChange={e => { setFormData({ ...formData, email: e.target.value }); setErrors({ ...errors, email: null }) }} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="password" placeholder="Password *" className={inputClass('password')} value={formData.password} onChange={e => { setFormData({ ...formData, password: e.target.value }); setErrors({ ...errors, password: null }) }} />
              <input type="password" placeholder="Confirm Password *" className={inputClass('confirm_password')} value={formData.confirm_password} onChange={e => { setFormData({ ...formData, confirm_password: e.target.value }); setErrors({ ...errors, confirm_password: null }) }} />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <input type="text" placeholder="Name *" className={inputClass('full_name')} value={formData.full_name} onChange={e => { setFormData({ ...formData, full_name: e.target.value }); setErrors({ ...errors, full_name: null }) }} />
            <input type="text" placeholder="Designation" className="w-full px-5 py-3 rounded-lg bg-gray-50 border-2 border-gray-200 focus:border-upwork-green outline-none" value={formData.designation} onChange={e => setFormData({ ...formData, designation: e.target.value })} />
            <input type="text" placeholder="ID Proof" className="w-full px-5 py-3 rounded-lg bg-gray-50 border-2 border-gray-200 focus:border-upwork-green outline-none" value={formData.national_id} onChange={e => setFormData({ ...formData, national_id: e.target.value })} />
            <input type="text" placeholder="Contact Number" className="w-full px-5 py-3 rounded-lg bg-gray-50 border-2 border-gray-200 focus:border-upwork-green outline-none" value={formData.contact_phone} onChange={e => setFormData({ ...formData, contact_phone: e.target.value })} />
            <input type="text" placeholder="Email" className="w-full px-5 py-3 rounded-lg bg-gray-50 border-2 border-gray-200 focus:border-upwork-green outline-none" value={formData.email} readOnly />
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <input type="text" placeholder="Bank Name *" className={inputClass('bank_name')} value={formData.bank_name} onChange={e => { setFormData({ ...formData, bank_name: e.target.value }); setErrors({ ...errors, bank_name: null }) }} />
            <input type="text" placeholder="Account No *" className={inputClass('account_no')} value={formData.account_no} onChange={e => { setFormData({ ...formData, account_no: e.target.value }); setErrors({ ...errors, account_no: null }) }} />
            <input type="text" placeholder="IFSC Code *" className={inputClass('ifsc_code')} value={formData.ifsc_code} onChange={e => { setFormData({ ...formData, ifsc_code: e.target.value }); setErrors({ ...errors, ifsc_code: null }) }} />
            <input type="text" placeholder="Account Holder Name" className="w-full px-5 py-3 rounded-lg bg-gray-50 border-2 border-gray-200 focus:border-upwork-green outline-none" value={formData.account_holder_name} onChange={e => setFormData({ ...formData, account_holder_name: e.target.value })} />
            <input type="text" placeholder="Location" className="w-full px-5 py-3 rounded-lg bg-gray-50 border-2 border-gray-200 focus:border-upwork-green outline-none" value={formData.bank_location} onChange={e => setFormData({ ...formData, bank_location: e.target.value })} />
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 border-2 border-gray-200 rounded-xl h-64 overflow-y-auto text-sm text-gray-600 leading-relaxed">
              <h3 className="font-bold text-upwork-dark mb-2 uppercase">Terms & Conditions</h3>
              <p>Welcome to Purchase Point. By signing up, you agree to the following terms and conditions:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>You will provide accurate organizational and personal information.</li>
                <li>You acknowledge that your account is subject to admin approval before full activation.</li>
                <li>You agree to abide by the platform's fair usage policy for RFQs and bidding.</li>
                <li>Data privacy and security are handled according to our Privacy Policy.</li>
              </ul>
            </div>
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="mt-1">
                <input
                  type="checkbox"
                  checked={formData.terms_accepted}
                  onChange={e => { setFormData({ ...formData, terms_accepted: e.target.checked }); setErrors({ ...errors, terms_accepted: null }) }}
                  className="w-5 h-5 rounded border-2 border-gray-300 text-upwork-green focus:ring-upwork-green"
                />
              </div>
              <span className="text-sm font-medium text-upwork-gray group-hover:text-upwork-dark transition-colors">
                I accept all the Terms & Conditions and understand the platform policies.
              </span>
            </label>
            {errors.terms_accepted && <p className="text-xs text-red-500 font-bold mt-1 pl-2">You must accept the terms to proceed.</p>}
          </div>
        );
      default:
        return null;
    }
  };

  const renderStepContent = (stepId) => {
    if (role === 'seller') return renderSellerStep(stepId);
    if (role === 'buyer') return renderBuyerStep(stepId);
    return null;
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6 py-12 sm:py-20">
      <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] shadow-xl w-full max-w-xl overflow-hidden p-6 sm:p-10 border border-gray-100">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-upwork-dark mb-2">Join Purchase Point</h1>
          <p className="text-upwork-gray font-medium">The global marketplace for industrial sourcing.</p>
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
                        onError={() => alert('Google Login Failed')}
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

              <div className="text-center mt-8">
                <Link to="/login" className="text-upwork-green font-bold hover:underline">Already have an account? Log In</Link>
              </div>
            </motion.div>
          ) : (
            <>
              <div className="w-full">
                <div className="space-y-4">
                  {activeStepsList.map((step) => {
                    const isActive = activeStep === step.id;
                    const isCompleted = completedSteps.includes(step.id);

                    return (
                      <div key={step.id} className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow transition-shadow">
                        <button
                          type="button"
                          onClick={() => setActiveStep(step.id)}
                          className={`w-full flex items-center justify-between px-6 py-4 transition-colors ${isActive ? 'bg-upwork-light-gray' : ''}`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border transition-colors ${isCompleted ? 'bg-upwork-green text-white border-upwork-green' : isActive ? 'bg-white border-upwork-dark text-upwork-dark' : 'bg-gray-50 border-gray-200 text-gray-400'}`}>
                              {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : step.id}
                            </div>
                            <span className={`font-medium ${isActive ? 'text-upwork-dark font-bold' : 'text-gray-600'}`}>
                              {step.title}
                            </span>
                          </div>
                          <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isActive ? 'rotate-180 text-upwork-dark' : ''}`} />
                        </button>

                        <AnimatePresence>
                          {isActive && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="p-6 border-t border-gray-100 bg-white">
                                {renderStepContent(step.id)}

                                <div className="mt-6 flex justify-end">
                                  {step.id < activeStepsList.length ? (
                                    <button
                                      type="button"
                                      onClick={() => handleNextStep(step.id)}
                                      className="px-8 py-2.5 bg-upwork-green text-white font-bold rounded-lg hover:bg-upwork-green/90 transition-colors"
                                    >
                                      Save & Continue
                                    </button>
                                  ) : (
                                    <button
                                      type="button"
                                      onClick={handleFinalSubmit}
                                      className="px-10 py-3 bg-upwork-dark text-white font-bold rounded-lg hover:bg-black transition-colors"
                                    >
                                      {role === 'buyer' ? 'Complete Registration' : 'Submit Application'}
                                    </button>
                                  )}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-8 text-center">
                  <button onClick={() => setRole(null)} className="text-sm font-medium text-gray-500 hover:text-upwork-dark underline">
                    Change Role / Go Back
                  </button>
                </div>
              </div>
            </>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
};

export default Register;




