
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
              <div className="w-32 h-32 flex justify-center">
                <img src="/lovable-uploads/25eb766e-0b57-479d-9349-2f3b20e6fdb9.png" alt="akinAI logo" className="w-full h-full" />
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
