
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">      
      <div className="container relative z-10">
        <div className="flex flex-col items-center">
          <div className="mb-12 text-center">
            {/* AkinAI Logo with arrow */}
            <div className="mb-6 flex flex-col items-center">
              <div className="text-[#F5F5F5] text-xl mb-1">akinAI</div>
              <div className="w-10 h-10">
                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 0L40 20H30L20 10L10 20H0L20 0Z" fill="black"/>
                </svg>
              </div>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-black leading-tight mb-8 max-w-4xl mx-auto">
              Your Mind's<br />Second Brain
            </h1>
            <p className="text-xl md:text-2xl text-[#F5F5F5] max-w-2xl mx-auto leading-tight">
              Welcome to the future of productivity, creativity, and memory.
              AkinAI isn't just another AI app — it's your cognitive companion, learning from you, helping you
              think better, plan smarter, and never forget what matters.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
