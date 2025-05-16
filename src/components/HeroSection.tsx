
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">      
      <div className="container relative z-10">
        <div className="flex flex-col items-center">
          <div className="mb-12 text-center">
            {/* Just the logo */}
            <div className="mb-6 flex flex-col items-center">
              <h1 className="text-3xl font-bold mb-3">akinAI</h1>
              <div className="w-24 h-24 flex justify-center">
                <img 
                  src="/lovable-uploads/498b32f0-ef05-49b3-b86d-78e40827b8b4.png" 
                  alt="akinAI logo" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-black leading-tight mb-8 max-w-4xl mx-auto">
              Your Mind's<br />Second Brain
            </h1>
            <p className="text-xl md:text-2xl text-[#F5F5F5] max-w-2xl mx-auto leading-tight">
              Welcome to the future of productivity, creativity, and memory.
              akinAI isn't just another AI app — it's your cognitive companion, learning from you, helping you
              think better, plan smarter, and never forget what matters.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
