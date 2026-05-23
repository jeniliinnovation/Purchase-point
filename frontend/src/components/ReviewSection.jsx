import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: "We discovered CTO-level expertise on the platform—someone who had already served as a startup CTO—willing to contribute to our open-source project. That kind of talent brings tremendous value to us.",
    name: "Saswata Basu",
    role: "CEO",
    company: "Züs",
    avatar: "https://i.pravatar.cc/150?u=saswata"
  },
  {
    quote: "Upwork isn't just a hiring platform for us—it's a strategic partner. It's helped us fill every technical gap, accelerate our delivery from months to weeks, and even bring on leaders who've become foundational to our business.",
    name: "David Wrench",
    role: "Co-Founder and CEO",
    company: "Datajol",
    avatar: "https://i.pravatar.cc/150?u=david"
  },
  {
    quote: "I found two awesome candidates and wound up hiring an AI freelancer based in Paris... I love the platform and the amount of talent I have access to. We really couldn't be this far along without help from the talent on Upwork.",
    name: "Matt See",
    role: "Co-Founder and CEO",
    company: "Lighthouse",
    avatar: "https://i.pravatar.cc/150?u=matt"
  },
  {
    quote: "Upwork is paramount to the success that we've had. We can't accomplish what we do without our Upwork staff. And like I said, to us, you know, it's awkward for me to say Upwork or freelancer staff, because we fully consider them part of our team.",
    name: "Bryan Goltzman",
    role: "CEO",
    company: "Liquid Screen Design",
    avatar: "https://i.pravatar.cc/150?u=bryan"
  },
  {
    quote: "But in this early stage, we really need to be lean, targeted, and prove out all the things that we're doing... And being able to really find the right people, and be able to interview different people where you know they're really heart driven.",
    name: "Jen Libby",
    role: "Founder and CEO",
    company: "Promly",
    avatar: "https://i.pravatar.cc/150?u=jen"
  },
  {
    quote: "The safety features are nice, but what really builds our confidence in Upwork is how we consistently find experts who deliver on highly technical, complex projects... Upwork helped us build a community of incredible talent.",
    name: "Gabriel Richman",
    role: "Founder and CEO",
    company: "Omia",
    avatar: "https://i.pravatar.cc/150?u=gabriel"
  }
];

const ReviewSection = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-white">
      {/* Organic Ribbon SVG Background */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-0 h-full w-full pointer-events-none opacity-40">
        <svg viewBox="0 0 1440 800" className="w-[150%] h-full shrink-0 animate-pulse-slow">
            <defs>
              <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#14a800" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#14a800" stopOpacity="0.05" />
                <stop offset="100%" stopColor="#14a800" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <path 
                fill="url(#ribbonGrad)" 
                d="M-200,400 C140,250 380,250 620,400 C860,550 1100,550 1340,400 C1580,250 1820,250 2060,400 V800 H-200 Z" 
            />
            <path 
                fill="url(#ribbonGrad)" 
                fillOpacity="0.5"
                d="M-200,350 C140,500 380,500 620,350 C860,200 1100,200 1340,350 C1580,500 1820,500 2060,350 V800 H-200 Z" 
            />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center mb-16 text-center">
           <h2 className="text-4xl lg:text-5xl font-bold text-upwork-dark mb-6">Trusted by the Global Market</h2>
           <p className="text-xl text-upwork-gray font-medium max-w-2xl">Verified buyers and suppliers achieve extraordinary outcomes on Purchase Point.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl hover:shadow-2xl transition-all flex flex-col justify-between"
            >
              <div>
                <p className="text-upwork-dark font-medium leading-relaxed mb-8 text-lg italic">
                  "{t.quote}"
                </p>
              </div>
              
              <div className="flex items-center justify-between border-t border-gray-50 pt-6">
                <div>
                   <h4 className="font-bold text-upwork-dark">{t.name}</h4>
                   <p className="text-xs text-upwork-gray font-semibold">{t.role}</p>
                   <p className="text-[10px] text-upwork-green font-bold uppercase tracking-widest">{t.company}</p>
                </div>
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-lg">
                  <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1) translateX(0); opacity: 0.6; }
          50% { transform: scale(1.05) translateX(-20px); opacity: 0.4; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 15s ease-in-out infinite;
        }
      `}} />
    </section>
  );
};

export default ReviewSection;
