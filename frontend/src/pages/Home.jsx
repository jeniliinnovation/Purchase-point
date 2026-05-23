import React from 'react';
import Hero from '../components/Hero';
import CategoryBar from '../components/CategoryBar';
import ValueProp from '../components/ValueProp';
import ReviewSection from '../components/ReviewSection';
import DashboardPreview from '../components/DashboardPreview';
import ContactCTA from '../components/ContactCTA';

const Home = () => {
  return (
    <main>
      <Hero />
      <DashboardPreview />
      <CategoryBar />
      <ReviewSection />
      <ValueProp />
      <ContactCTA />
    </main>
  );
};

export default Home;
