import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Info, 
  ShieldCheck, 
  HelpCircle, 
  MessageSquare, 
  Users, 
  TrendingUp, 
  Briefcase, 
  Globe, 
  Lock,
  CheckCircle2,
  Send,
  Database
} from 'lucide-react';

const contentMap = {
  about: {
    title: 'About Purchase Point',
    icon: <Info className="w-12 h-12 text-upwork-green" />,
    desc: 'Connecting global industrial buyers with verified supply chain excellence.',
    body: 'Purchase Point was founded to solve the complexity of industrial procurement. Our mission is to provide a transparent, high-integrity marketplace where engineers and procurement specialists can discover quality suppliers and optimize their spending through data-driven insights.',
    highlights: ['Global Supply Chain Network', 'High-Integrity Verification', 'Advanced Analytics Engine']
  },
  contact: {
    title: 'Contact Our Team',
    icon: <MessageSquare className="w-12 h-12 text-blue-500" />,
    desc: 'We are here to support your facility registration and RFQ management.',
    body: 'Need help with your account? Our global support teams are available 24/7 to assist with technical queries, supplier vetting, and contract optimization.',
    highlights: ['24/7 Priority Support', 'Dedicated Account Management', 'Technical Integration Help']
  },
  trust: {
    title: 'Trust & Security',
    icon: <Lock className="w-12 h-12 text-red-500" />,
    desc: 'Enterprise-grade security for your industrial data.',
    body: 'We prioritize the protection of your intellectual property and procurement data. Every supplier on Purchase Point undergoes a rigorous multi-stage vetting process including financial auditing and facility verification.',
    highlights: ['Encrypted Data Transmission', 'Verified Supplier Network', 'Automated Compliance Sync']
  },
  pricing: {
    title: 'Industrial Pricing Guide',
    icon: <TrendingUp className="w-12 h-12 text-teal-500" />,
    desc: 'Transparent pricing for facilities of all sizes.',
    body: 'Whether you are a local workshop or a global OEM, our pricing models are designed to scale with your volume. From pay-as-you-go RFQs to enterprise subscription tiers.',
    highlights: ['No Hidden Fees', 'Volume-Based Discounts', 'Enterprise Custom Tiers']
  },
  careers: {
    title: 'Join Our Mission',
    icon: <Briefcase className="w-12 h-12 text-orange-500" />,
    desc: 'Build the future of industrial procurement.',
    body: 'Work with a global team of engineers, data scientists, and supply chain experts. We are remote-first and mission-driven.',
    highlights: ['Remote-First Culture', 'Competitive Equity', 'Global Impact']
  },
  investors: {
    title: 'Investor Relations',
    icon: <Globe className="w-12 h-12 text-purple-500" />,
    desc: 'Scaling the worlds largest industrial registry.',
    body: 'Information for our shareholders and potential investors. View our growth metrics and scale projections.',
    highlights: ['Quarterly Growth Reports', 'Market Expansion Plans', 'Tech Innovation Roadmap']
  },
  'post-rfq': {
    title: 'Precision RFQ Protocol',
    icon: <Users className="w-12 h-12 text-upwork-green" />,
    desc: 'The most efficient way to source industrial components.',
    body: 'Our Request for Quotation (RFQ) system is built for accuracy. Standardized templates ensure that suppliers receive all necessary technical specs, reducing back-and-forth and accelerating deal closure.',
    highlights: ['Standardized Templates', 'Instant Supplier Matching', 'Compliance Checkers']
  },
  'analysis': {
    title: 'Market Analysis Tools',
    icon: <TrendingUp className="w-12 h-12 text-blue-500" />,
    desc: 'Benchmark your project against global trends.',
    body: 'Our analysis tools provide real-time price benchmarking and lead-time analysis. Make decisions based on hard data, not estimates.',
    highlights: ['Price Benchmarking', 'Vetting Intelligence', 'Lead-time Projections']
  },
  'help': {
    title: 'Registry Help Center',
    icon: <HelpCircle className="w-12 h-12 text-upwork-green" />,
    desc: 'Guidance for global facility owners.',
    body: 'Everything you need to know about setting up your facility, managing RFQs, and fulfilling bids. Search our extensive knowledge base or talk to a specialist.',
    highlights: ['Onboarding Guides', 'Technical Documentation', 'FAQ Repository']
  },
  'savings': {
    title: 'Savings Insight Engine',
    icon: <TrendingUp className="w-12 h-12 text-green-500" />,
    desc: 'Identify hidden efficiencies in your procurement spend.',
    body: 'Our savings dashboard aggregates global pricing data to show you exactly where you can cut costs without compromising on component quality or delivery speed.',
    highlights: ['Cost Reduction Analytics', 'Supplier Efficiency Index', 'Historical Spend Benchmarking']
  },
  'bom': {
    title: 'BOM Management Sync',
    icon: <Database className="w-12 h-12 text-blue-600" />,
    desc: 'Scale your Bill of Materials from prototype to production.',
    body: 'Manage complex industrial assemblies with our BOM sync tool. Track part availability, lead times, and multi-supplier sourcing strategies in one high-integrity dash.',
    highlights: ['Part Availability Sync', 'Multi-Source Strategy', 'Production Lead-Time Tracking']
  },
  'place-bids': {
    title: 'Precision Bidding Protocol',
    icon: <Send className="w-12 h-12 text-upwork-green" />,
    desc: 'Submit competitive quotes with verified technical integrity.',
    body: 'Our bidding interface allows suppliers to review complete RFQ specifications and submit structured quotes. Ensure your bid is compliant with all engineering requirements before deployment.',
    highlights: ['Structured Quote Deployment', 'Technical Compliance Check', 'Real-time Bid Tracking']
  },
  'catalog': {
    title: 'Project Catalog Explorer',
    icon: <Globe className="w-12 h-12 text-blue-500" />,
    desc: 'Discover active industrial projects across the global registry.',
    body: 'Search and filter through the industrys most comprehensive catalog of open RFQs. From small-batch electronics to massive infrastructure hardwares.',
    highlights: ['Global Project Discovery', 'Advanced Category Filtering', 'Saved Search Alerts']
  },
  'scorecard': {
    title: 'Supplier Performance Scorecard',
    icon: <CheckCircle2 className="w-12 h-12 text-upwork-green" />,
    desc: 'Verify your reliability in the global industrial registry.',
    body: 'Track your performance metrics, lead-time accuracy, and quality ratings. A high scorecard rating unlocks priority access to premium RFQs.',
    highlights: ['Reliability Metrics', 'Quality Rating Analytics', 'Tier Status Tracking']
  },
  'case-studies': {
    title: 'Registry Case Studies',
    icon: <MessageSquare className="w-12 h-12 text-teal-600" />,
    desc: 'See how the world builds on Purchase Point.',
    body: 'Explore detailed narratives of successful procurement outcomes. From massive cost savings in automotive to accelerated lead times in medical robotics.',
    highlights: ['ROI Narratives', 'Implementation Overviews', 'Strategic Successes']
  }
};

const GeneralInfo = () => {
  const { pageId } = useParams();
  const content = contentMap[pageId] || contentMap.about;

  return (
    <div className="min-h-screen bg-white py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center border border-gray-100 shadow-sm">
              {content.icon}
            </div>
            <div>
              <h1 className="text-4xl font-black text-upwork-dark tracking-tighter uppercase">{content.title}</h1>
              <p className="text-upwork-green font-bold text-sm tracking-widest uppercase mt-1">Registry Information Protocol</p>
            </div>
          </div>

          <div className="p-12 bg-gray-50 rounded-[3rem] border border-gray-100 italic text-2xl font-medium text-gray-600 leading-relaxed shadow-inner">
            "{content.desc}"
          </div>

          <div className="prose prose-lg text-gray-600 font-medium">
            <p className="leading-relaxed">{content.body}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 pt-8">
            {content.highlights.map((h, i) => (
              <div key={i} className="p-6 bg-white border-2 border-gray-100 rounded-2xl flex items-center gap-3 shadow-sm">
                <ShieldCheck className="text-upwork-green shrink-0" size={20} />
                <span className="text-xs font-black text-upwork-dark uppercase tracking-tight">{h}</span>
              </div>
            ))}
          </div>

          <div className="mt-12 p-10 bg-upwork-dark rounded-3xl text-white flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h3 className="text-xl font-bold mb-1">Still have questions?</h3>
              <p className="text-gray-400 text-sm">Talk to an industrial specialist today.</p>
            </div>
            <Link to="/register" className="px-8 py-4 bg-upwork-green text-upwork-dark rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all">
              Get Started
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GeneralInfo;

