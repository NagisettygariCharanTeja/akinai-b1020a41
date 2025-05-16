
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import DifferenceSection from '@/components/DifferenceSection';
import DemoSection from '@/components/DemoSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CallToActionSection from '@/components/CallToActionSection';
import Footer from '@/components/Footer';

const Index = () => {
  // Update the title
  useEffect(() => {
    document.title = "AkinAI - Your Conversational Companion with Real Intelligence";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <DifferenceSection />
        <DemoSection />
        <TestimonialsSection />
        <CallToActionSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
