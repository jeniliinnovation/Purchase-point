import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Eye, Database, Globe, CheckCircle2, AlertCircle } from 'lucide-react';

const TrustSecurity = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-32 font-['Inter']">
      {/* High-Integrity Hero */}
      <section className="max-w-[1440px] mx-auto px-6 mb-24">
        <div className="bg-upwork-dark rounded-[3rem] p-12 md:p-24 text-white relative overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-3xl relative z-10 space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-upwork-green/20 rounded-full border border-upwork-green/30 text-upwork-green text-[10px] font-black uppercase tracking-[0.3em]">
              <ShieldCheck size={14} /> Security Infrastructure v4.0
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
              Trust is the <span className="text-upwork-green">Currency</span> of Industry.
            </h1>
            <p className="text-xl text-gray-400 font-medium leading-relaxed">
              Purchase Point employs military-grade encryption and an exhaustive multi-stage verification protocol for every participant in the registry.
            </p>
          </motion.div>
          
          {/* Decorative Security Grid */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-upwork-green opacity-10 blur-[100px] rounded-full" />
        </div>
      </section>

      {/* Security Pillars */}
      <section className="max-w-[1440px] mx-auto px-6 grid md:grid-cols-3 gap-8 mb-32">
        <div className="p-10 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
            <Lock size={32} />
          </div>
          <h3 className="text-2xl font-black text-upwork-dark tracking-tight">Data Encryption</h3>
          <p className="text-gray-500 font-medium leading-relaxed">
            All RFQ details and internal communication are protected by AES-256 encryption at rest and TLS 1.3 in transit.
          </p>
        </div>
        <div className="p-10 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-upwork-green/10 flex items-center justify-center text-upwork-green">
            <ShieldCheck size={32} />
          </div>
          <h3 className="text-2xl font-black text-upwork-dark tracking-tight">Supplier Vetting</h3>
          <p className="text-gray-500 font-medium leading-relaxed">
            Every supplier undergoes a 12-point verification process including facility audits and financial stability checks.
          </p>
        </div>
        <div className="p-10 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600">
            <Eye size={32} />
          </div>
          <h3 className="text-2xl font-black text-upwork-dark tracking-tight">Full Visibility</h3>
          <p className="text-gray-500 font-medium leading-relaxed">
            Trace your components back to their source with our immutable audit logs and production tracking protocols.
          </p>
        </div>
      </section>

      {/* Compliance Section */}
      <section className="max-w-[1440px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-black text-upwork-dark uppercase tracking-tight">Global Compliance & <br/>Certification</h2>
            <div className="space-y-4">
              {[
                { title: 'ISO 27001 Certified', desc: 'International standard for information security management.' },
                { title: 'GDPR Compliant', desc: 'Built-in privacy protection for global data sovereignty.' },
                { title: 'SOC 2 Type II', desc: 'Independently audited for security, availability, and confidentiality.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-6 bg-white rounded-2xl border border-gray-100">
                  <CheckCircle2 className="text-upwork-green shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-upwork-dark">{item.title}</h4>
                    <p className="text-sm text-gray-500 font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-upwork-green/5 blur-3xl rounded-full" />
            <div className="relative p-12 bg-white rounded-[3rem] border-4 border-gray-50 shadow-2xl space-y-8">
              <div className="flex items-center gap-4 border-b border-gray-100 pb-8">
                <AlertCircle className="text-upwork-green" size={32} />
                <h3 className="text-xl font-black uppercase tracking-tight">Security Incident Protocol</h3>
              </div>
              <ul className="space-y-6">
                <li className="flex gap-4 items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-xs font-black">01</div>
                  <span className="text-sm font-bold text-gray-600 tracking-tight">Instant containment within 60 seconds of anomaly detection.</span>
                </li>
                <li className="flex gap-4 items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-xs font-black">02</div>
                  <span className="text-sm font-bold text-gray-600 tracking-tight">Automatic stakeholder notification via secure channels.</span>
                </li>
                <li className="flex gap-4 items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-xs font-black">03</div>
                  <span className="text-sm font-bold text-gray-600 tracking-tight">Full forensic audit and report generation within 24 hours.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TrustSecurity;
