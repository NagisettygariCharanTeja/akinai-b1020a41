
import React from 'react';
import { Lightbulb } from 'lucide-react';

const WhySection = () => {
  return (
    <section id="why" className="py-24 relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-akin-purple/5 rounded-full blur-3xl"></div>
      <div className="container">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <div className="p-6 border-l-4 border-akin-purple">
              <div className="bg-black/20 backdrop-blur-sm p-6 rounded-tr-xl rounded-br-xl relative">
                <div className="absolute -top-4 -left-4 bg-[#685B60] p-2 rounded-full border border-white/20">
                  <Lightbulb className="text-akin-purple h-6 w-6" />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 mt-4">Why AkinAI?</h2>
                <p className="text-lg md:text-xl text-[#F5F5F5] max-w-3xl">
                  Other tools just help you "do."<br />
                  AkinAI helps you think. It organizes not just tasks — but ideas, insights, and intentions.<br />
                  It's built for thinkers, builders, dreamers — anyone who wants to extend their mind.
                </p>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-black/10 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-akin-purple/50 transition-all duration-300 transform hover:-translate-y-1">
                <h3 className="text-xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-akin-purple to-white">Thinkers</h3>
                <div className="w-12 h-1 bg-akin-purple mb-3"></div>
                <p className="text-[#F5F5F5]">Extend your cognitive capacity and organize complex thoughts.</p>
              </div>
              
              <div className="bg-black/10 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-akin-blue/50 transition-all duration-300 transform hover:-translate-y-1">
                <h3 className="text-xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-akin-blue to-white">Builders</h3>
                <div className="w-12 h-1 bg-akin-blue mb-3"></div>
                <p className="text-[#F5F5F5]">Convert ideas into structured plans and actionable steps.</p>
              </div>
              
              <div className="bg-black/10 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-akin-blue/50 transition-all duration-300 transform hover:-translate-y-1">
                <h3 className="text-xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-akin-blue">Creators</h3>
                <div className="w-12 h-1 bg-akin-blue mb-3"></div>
                <p className="text-[#F5F5F5]">Find connections between ideas and spark creative insights.</p>
              </div>
              
              <div className="bg-black/10 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-akin-purple/50 transition-all duration-300 transform hover:-translate-y-1">
                <h3 className="text-xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-akin-purple">Dreamers</h3>
                <div className="w-12 h-1 bg-akin-purple mb-3"></div>
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
