
import React from 'react';
import { Lightbulb } from 'lucide-react';

const WhySection = () => {
  return (
    <section id="why" className="py-24 relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#403E43]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-[#403E43]/5 rounded-full blur-3xl"></div>
      
      <div className="container">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <div className="p-6 border-l-4 border-[#403E43] transform transition-all duration-500 hover:scale-[1.02]">
              <div className="frost-glass p-8 rounded-tr-2xl rounded-br-2xl relative shadow-xl">
                <div className="absolute -top-6 -left-6 bg-[#685B60] p-3 rounded-full border border-white/20 shadow-lg">
                  <Lightbulb className="text-[#403E43] h-8 w-8" />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-8 mt-4 text-shadow-lg">
                  Why <span className="text-black">akin</span><span className="text-[#D9D9D9]">AI</span>?
                </h2>
                <p className="text-lg md:text-xl text-[#F5F5F5] max-w-3xl leading-relaxed">
                  Other tools just help you "do."<br />
                  akinAI helps you <span className="font-bold text-white text-glow">think</span>. It organizes not just tasks but ideas, insights, and intentions.<br />
                  It's built for thinkers, builders, dreamers — anyone who wants to extend their mind.
                </p>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <div className="grid grid-cols-2 gap-6">
              <div className="frost-glass p-8 rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl">
                <h3 className="text-2xl font-bold mb-3 text-black">Thinkers</h3>
                <div className="w-12 h-1 bg-[#403E43] mb-4"></div>
                <p className="text-[#F5F5F5] leading-relaxed">Extend your cognitive capacity and organize complex thoughts with intuitive AI assistance.</p>
              </div>
              
              <div className="frost-glass p-8 rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl">
                <h3 className="text-2xl font-bold mb-3 text-black">Builders</h3>
                <div className="w-12 h-1 bg-[#333333] mb-4"></div>
                <p className="text-[#F5F5F5] leading-relaxed">Convert ideas into structured plans and actionable steps with intelligent organization tools.</p>
              </div>
              
              <div className="frost-glass p-8 rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl">
                <h3 className="text-2xl font-bold mb-3 text-black">Creators</h3>
                <div className="w-12 h-1 bg-[#333333] mb-4"></div>
                <p className="text-[#F5F5F5] leading-relaxed">Find connections between ideas and spark creative insights through pattern recognition.</p>
              </div>
              
              <div className="frost-glass p-8 rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl">
                <h3 className="text-2xl font-bold mb-3 text-black">Dreamers</h3>
                <div className="w-12 h-1 bg-[#403E43] mb-4"></div>
                <p className="text-[#F5F5F5] leading-relaxed">Explore possibilities and expand your mental horizons with AI-powered imagination tools.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhySection;
