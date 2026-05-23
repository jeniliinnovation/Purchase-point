import React from 'react';
import { Link } from 'react-router-dom';

const ContactCTA = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-10 rounded-[3rem] bg-upwork-green text-white flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl transform translate-x-12 -translate-y-12" />
           <div className="z-10 text-center lg:text-left">
              <h3 className="text-3xl font-bold mb-2">Can't find what you're looking for?</h3>
              <p className="text-white/80 text-lg">Our strategic sourcing team can help you identify specialized vendors.</p>
           </div>
           <Link to="/why-purchase-point" className="z-10 bg-white text-upwork-green px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-50 transition-colors shadow-lg whitespace-nowrap">
              Talk to an Expert
           </Link>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
