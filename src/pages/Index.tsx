
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
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

  // Add scroll reveal observer
  useEffect(() => {
    // Get all elements with reveal-on-scroll class
    const setupScrollAnimations = () => {
      const elementsToReveal = document.querySelectorAll('.reveal-on-scroll');
      
      const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      };
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);
      
      elementsToReveal.forEach(element => {
        observer.observe(element);
      });
      
      return () => {
        elementsToReveal.forEach(element => {
          observer.unobserve(element);
        });
      };
    };
    
    // Allow time for the DOM to fully render
    const timer = setTimeout(() => {
      setupScrollAnimations();
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
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
