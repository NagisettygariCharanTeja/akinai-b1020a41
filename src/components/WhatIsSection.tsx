
import React from 'react';
import { Zap } from 'lucide-react';

const WhatIsSection = () => {
  return (
    <section id="what-is" className="py-24 relative overflow-hidden">
      <div className="absolute top-40 left-20 w-64 h-64 bg-black/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-40 w-80 h-80 bg-black/10 rounded-full blur-3xl"></div>
      
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="md:order-2">
            <div className="relative transform hover:scale-[1.02] transition-all duration-500">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#333333]/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#222222]/20 rounded-full blur-xl"></div>
              <div className="frost-glass p-10 rounded-2xl relative z-10 border border-white/20 hover:border-white/30 transition-all duration-300">
                <div className="bg-gradient-to-r from-[#403E43] to-[#222222] p-4 inline-flex rounded-full mb-8 shadow-lg">
                  <Zap className="text-white h-7 w-7" />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-8 relative inline-block">
                  What is <span className="text-black">akin</span><span className="text-[#D9D9D9]">AI</span>?
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"></span>
                </h2>
                <p className="text-lg md:text-xl text-[#F5F5F5] max-w-3xl leading-relaxed">
                  akinAI is an AI powered digital assistant designed to mirror your thinking patterns, 
                  organize your digital life, and spark creativity like a true second brain.
                  It's not just about answering questions — it's about staying in sync with you.
                </p>
              </div>
            </div>
          </div>
          
          <div className="md:order-1">
            <div className="relative h-64 md:h-[400px] perspective">
              <div className="absolute inset-0 bg-gradient-to-r from-[#403E43]/30 to-[#222222]/30 rounded-2xl transform rotate-3 hover:rotate-5 transition-transform duration-500 shadow-xl"></div>
              <div className="absolute inset-0 frost-glass rounded-2xl -rotate-3 hover:-rotate-5 transition-transform duration-500 border border-white/10 shadow-2xl"></div>
              <div className="absolute inset-8 flex items-center justify-center">
                <div className="text-9xl md:text-[12rem] font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-400 via-gray-100 to-gray-400 select-none animate-pulse" style={{ animationDuration: '5s' }}>AI</div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-10 left-10 w-12 h-12 bg-white/5 rounded-full"></div>
              <div className="absolute bottom-10 right-10 w-16 h-16 bg-white/5 rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 w-20 h-20 bg-white/5 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDuration: '7s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIsSection;
