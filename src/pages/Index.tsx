
import React, { useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import WhatIsSection from '@/components/WhatIsSection';
import FeaturesSection from '@/components/FeaturesSection';
import WhySection from '@/components/WhySection';
import CallToActionSection from '@/components/CallToActionSection';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';

const Index = () => {
  // Update the title
  useEffect(() => {
    document.title = "AkinAI - Your Mind's Second Brain";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <HeroSection />
        <WhatIsSection />
        <FeaturesSection />
        <WhySection />
        <CallToActionSection />
        <FAQSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
