
import React from 'react';
import { Lightbulb } from 'lucide-react';

const WhySection = () => {
  return (
    <section id="why" className="py-24 relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#403E43]/5 rounded-full blur-3xl"></div>
      <div className="container">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <div className="p-6 border-l-4 border-[#403E43]">
              <div className="bg-black/20 backdrop-blur-sm p-6 rounded-tr-xl rounded-br-xl relative">
                <div className="absolute -top-4 -left-4 bg-[#685B60] p-2 rounded-full border border-white/20">
                  <Lightbulb className="text-[#403E43] h-6 w-6" />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 mt-4">
                  <span className="relative inline-block">
                    Why <span className="text-black">akin</span><span className="text-[#D9D9D9]">AI</span>?
                    <div className="absolute -bottom-2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                  </span>
                </h2>
                <p className="text-lg md:text-xl text-[#F5F5F5] max-w-3xl">
                  Other tools just help you "do."<br />
                  akinAI helps you think. It organizes not just tasks but ideas, insights, and intentions.<br />
                  It's built for thinkers, builders, dreamers anyone who wants to extend their mind.
                </p>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-black/10 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-[#403E43]/50 transition-all duration-300 transform hover:-translate-y-1">
                <h3 className="text-xl font-bold mb-2 text-black">Thinkers</h3>
                <div className="w-12 h-1 bg-[#403E43] mb-3"></div>
                <p className="text-[#F5F5F5]">Extend your cognitive capacity and organize complex thoughts.</p>
              </div>
              
              <div className="bg-black/10 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-[#333333]/50 transition-all duration-300 transform hover:-translate-y-1">
                <h3 className="text-xl font-bold mb-2 text-black">Builders</h3>
                <div className="w-12 h-1 bg-[#333333] mb-3"></div>
                <p className="text-[#F5F5F5]">Convert ideas into structured plans and actionable steps.</p>
              </div>
              
              <div className="bg-black/10 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-[#333333]/50 transition-all duration-300 transform hover:-translate-y-1">
                <h3 className="text-xl font-bold mb-2 text-black">Creators</h3>
                <div className="w-12 h-1 bg-[#333333] mb-3"></div>
                <p className="text-[#F5F5F5]">Find connections between ideas and spark creative insights.</p>
              </div>
              
              <div className="bg-black/10 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-[#403E43]/50 transition-all duration-300 transform hover:-translate-y-1">
                <h3 className="text-xl font-bold mb-2 text-black">Dreamers</h3>
                <div className="w-12 h-1 bg-[#403E43] mb-3"></div>
                <p className="text-[#F5F5F5]">Explore possibilities and expand your mental horizons.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhySection;
