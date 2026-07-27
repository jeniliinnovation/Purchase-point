import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, Upload, Save, Send } from 'lucide-react';

const FormSection = ({ title, children }) => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
    <h3 className="text-lg font-black text-upwork-dark uppercase tracking-tight pb-4 border-b border-gray-50">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {children}
    </div>
  </div>
);

const InputField = ({ label, placeholder, type = "text", fullWidth = false, value, onChange }) => (
  <div className={`space-y-2 ${fullWidth ? 'md:col-span-2' : ''}`}>
    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{label}</label>
    <input 
      type={type} 
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full bg-gray-50 border border-transparent rounded-xl px-4 py-3 text-sm font-medium focus:bg-white focus:border-upwork-green/30 outline-none transition-all"
    />
  </div>
);

const RFQFormView = ({ onSaveSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    rfq_number: '',
    category: '',
    material: '',
    description: '',
    certification: '',
    compliance: '',
    experience: '',
    turnover: '',
    termsAgreed: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePublish = async () => {
    if (!formData.title) return alert('Product Title is required');
    if (!formData.termsAgreed) return alert('You must agree to the Terms of Service');

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const role = user.role || 'admin';
      
      const payload = {
        title: formData.title,
        rfq_number: formData.rfq_number,
        category: formData.category,
        description: formData.description,
      };

      const response = await fetch(`https://purchase-point.jenili.in/api/${role}/rfq`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        alert('RFQ Published Successfully');
        setFormData({ title: '', rfq_number: '', category: '', material: '', description: '', certification: '', compliance: '', experience: '', turnover: '', termsAgreed: false });
        if(onSaveSuccess) onSaveSuccess();
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to publish RFQ');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8 space-y-8 lg:ml-64 min-h-[calc(100vh-80px)] bg-gray-50/50 max-w-5xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-upwork-dark tracking-tight uppercase">Bid & RFQ Generator</h1>
          <p className="text-gray-500 font-medium">Complete the industrial specification protocol below.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl text-xs font-black uppercase tracking-widest text-upwork-dark hover:bg-gray-50 transition-all shadow-sm">
            <Save size={18} /> Save Draft
          </button>
          <button 
            onClick={handlePublish}
            disabled={isSubmitting}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg text-white ${isSubmitting ? 'bg-gray-400' : 'bg-upwork-green hover:bg-upwork-dark shadow-upwork-green/20'}`}>
            <Send size={18} /> {isSubmitting ? 'Publishing...' : 'Publish RFQ'}
          </button>
        </div>
      </div>

      <div className="space-y-8 pb-20">
        {/* Section 1: Specification */}
        <FormSection title="Specification / Part Proposal">
          <InputField label="Product Title" placeholder="e.g. High-Precision Gear Assembly" value={formData.title} onChange={e => handleInputChange('title', e.target.value)} />
          <InputField label="Product SKU" placeholder="PP-UNIT-XXXX" value={formData.rfq_number} onChange={e => handleInputChange('rfq_number', e.target.value)} />
          <InputField label="Industry Type" placeholder="Automotive / Aerospace" value={formData.category} onChange={e => handleInputChange('category', e.target.value)} />
          <InputField label="Material Specification" placeholder="T6 Aluminum / Stainless Steel 316" value={formData.material} onChange={e => handleInputChange('material', e.target.value)} />
          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Technical Description</label>
            <textarea 
              rows={4} 
              value={formData.description}
              onChange={e => handleInputChange('description', e.target.value)}
              placeholder="Provide detailed technical specifications and requirements..."
              className="w-full bg-gray-50 border border-transparent rounded-2xl px-4 py-3 text-sm font-medium focus:bg-white focus:border-upwork-green/30 outline-none transition-all resize-none"
            />
          </div>
        </FormSection>

        {/* Section 2: License / Certification */}
        <FormSection title="License / Certification">
          <InputField label="ISO Certification Number" placeholder="ISO 9001:2015" value={formData.certification} onChange={e => handleInputChange('certification', e.target.value)} />
          <InputField label="Compliance Level" placeholder="Tier 1 / Tier 2" value={formData.compliance} onChange={e => handleInputChange('compliance', e.target.value)} />
          <div className="md:col-span-2 p-8 border-2 border-dashed border-gray-100 rounded-[2rem] bg-gray-50/50 flex flex-col items-center justify-center text-center group hover:bg-white hover:border-upwork-green/30 transition-all cursor-pointer">
            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-gray-400 group-hover:text-upwork-green transition-colors mb-4">
              <Upload size={24} />
            </div>
            <p className="text-sm font-black text-upwork-dark uppercase tracking-tight">Upload Certification Documents</p>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">PDF, PNG, JPG (Max 10MB)</p>
          </div>
        </FormSection>

        {/* Section 3: Eligibility Criteria */}
        <FormSection title="Eligibility Criteria">
          <InputField label="Min. Experience" placeholder="5+ Years" value={formData.experience} onChange={e => handleInputChange('experience', e.target.value)} />
          <InputField label="Annual Turnover" placeholder="$1M+" value={formData.turnover} onChange={e => handleInputChange('turnover', e.target.value)} />
          <div className="md:col-span-2 flex items-center gap-3 p-4 bg-upwork-green/5 rounded-2xl border border-upwork-green/10">
            <CheckCircle2 size={20} className="text-upwork-green" />
            <p className="text-xs font-bold text-upwork-green">Qualified suppliers will be automatically matched based on these criteria.</p>
          </div>
        </FormSection>

        {/* Final Actions */}
        <div className="flex flex-col items-center space-y-6 pt-8 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <input type="checkbox" checked={formData.termsAgreed} onChange={e => handleInputChange('termsAgreed', e.target.checked)} className="w-4 h-4 rounded border-gray-300 text-upwork-green focus:ring-upwork-green" />
            <label className="text-xs font-medium text-gray-500 cursor-pointer" onClick={() => handleInputChange('termsAgreed', !formData.termsAgreed)}>I agree to the Terms of Service and Compliance standards of Purchase Point.</label>
          </div>
          <div className="flex gap-4">
             <button onClick={handlePublish} disabled={isSubmitting} className="px-12 py-4 bg-upwork-dark text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-upwork-green transition-all shadow-xl disabled:bg-gray-400">
               Finalize & Verify
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RFQFormView;

