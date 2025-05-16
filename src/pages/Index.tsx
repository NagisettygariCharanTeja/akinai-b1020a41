
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import WhatIsSection from '@/components/WhatIsSection';
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
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <WhatIsSection />
        <CallToActionSection />
        <FAQSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
