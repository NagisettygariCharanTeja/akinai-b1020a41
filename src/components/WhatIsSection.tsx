
import React from 'react';
import { Zap } from 'lucide-react';

const WhatIsSection = () => {
  return (
    <section id="what-is" className="py-24 relative overflow-hidden">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="md:order-2">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-akin-purple/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-akin-blue/10 rounded-full blur-xl"></div>
              <div className="bg-black/10 backdrop-blur-sm p-8 rounded-xl border border-white/10 relative z-10">
                <div className="bg-gradient-to-r from-akin-purple to-akin-blue p-3 inline-flex rounded-full mb-6">
                  <Zap className="text-white h-6 w-6" />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">What is AkinAI?</h2>
                <p className="text-lg md:text-xl text-[#F5F5F5] max-w-3xl">
                  AkinAI is an AI-powered digital assistant designed to mirror your thinking patterns, 
                  organize your digital life, and spark creativity like a true second brain.
                  It's not just about answering questions — it's about staying in sync with you.
                </p>
              </div>
            </div>
          </div>
          
          <div className="md:order-1">
            <div className="relative h-64 md:h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-akin-purple/20 to-akin-blue/20 rounded-2xl transform rotate-3"></div>
              <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-2xl -rotate-3 border border-white/10"></div>
              <div className="absolute inset-8 flex items-center justify-center">
                <div className="text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-akin-purple to-akin-blue">AI</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIsSection;
