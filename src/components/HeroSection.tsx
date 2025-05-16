
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">      
      <div className="container relative z-10">
        <div className="flex flex-col items-center">
          <div className="mb-12 text-center">
            <div className="mb-6 flex flex-col items-center">
              <div className="mb-4">
                <span className="text-black text-5xl font-bold font-dm-sans">akin</span><span className="text-[#D9D9D9] text-5xl font-bold font-dm-sans">AI</span>
              </div>
              <div className="w-32 h-32 flex justify-center">
                <img src="/lovable-uploads/25eb766e-0b57-479d-9349-2f3b20e6fdb9.png" alt="akinAI logo" className="w-full h-full" />
              </div>
            </div>

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
