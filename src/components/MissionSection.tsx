
import React from 'react';
import { Compass } from 'lucide-react';

const MissionSection = () => {
  return (
    <section id="mission" className="py-24 relative">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#333333]/5 rounded-full blur-3xl z-10"></div>
      <div className="container">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="md:w-2/5">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#403E43]/20 to-[#222222]/20 rounded-full transform rotate-45 scale-90"></div>
              <div className="relative bg-black/20 backdrop-blur-sm p-8 rounded-xl border border-white/10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-[#403E43] to-[#222222] mb-6">
                  <Compass className="text-white h-8 w-8" />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Mission</h2>
                <div className="space-y-4">
                  <p className="text-base md:text-lg text-[#F5F5F5] max-w-3xl">
                    To build an AI that doesn't just answer you, but understands you. To bridge memory and creativity, structure and spontaneity. To make AI feel like a partner, not a tool.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-3/5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="col-span-1 md:col-span-3">
                <div className="bg-[#333333]/10 backdrop-blur-sm p-6 rounded-xl border border-white/10 text-center">
                  <h3 className="text-2xl font-bold mb-3">Our Vision</h3>
                  <p className="text-[#F5F5F5]">A world where AI enhances human potential rather than replacing it.</p>
                </div>
              </div>
              
              <div className="col-span-1">
                <div className="h-full bg-black/10 backdrop-blur-sm p-6 rounded-xl border border-white/10 flex flex-col items-center justify-center text-center hover:bg-black/20 transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-[#403E43]/20 flex items-center justify-center mb-4">
                    <span className="text-xl font-bold">1</span>
                  </div>
                  <h4 className="font-bold mb-2">Understanding</h4>
                  <p className="text-[#F5F5F5] text-sm">AI that learns your thought patterns</p>
                </div>
              </div>
              
              <div className="col-span-1">
                <div className="h-full bg-black/10 backdrop-blur-sm p-6 rounded-xl border border-white/10 flex flex-col items-center justify-center text-center hover:bg-black/20 transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-[#222222]/20 flex items-center justify-center mb-4">
                    <span className="text-xl font-bold">2</span>
                  </div>
                  <h4 className="font-bold mb-2">Connection</h4>
                  <p className="text-[#F5F5F5] text-sm">Bridge between ideas and execution</p>
                </div>
              </div>
              
              <div className="col-span-1">
                <div className="h-full bg-black/10 backdrop-blur-sm p-6 rounded-xl border border-white/10 flex flex-col items-center justify-center text-center hover:bg-black/20 transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#403E43]/20 to-[#222222]/20 flex items-center justify-center mb-4">
                    <span className="text-xl font-bold">3</span>
                  </div>
                  <h4 className="font-bold mb-2">Partnership</h4>
                  <p className="text-[#F5F5F5] text-sm">AI as companion, not just a tool</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
