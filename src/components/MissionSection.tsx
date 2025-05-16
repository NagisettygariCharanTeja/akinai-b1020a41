
import React from 'react';

const MissionSection = () => {
  return (
    <section id="mission" className="py-24 bg-gradient-to-b from-[#403E43]/5 to-transparent relative">
      <div className="absolute inset-0 bg-[url('/lovable-uploads/568d5b30-b38f-4d41-86fb-8b7cfad59169.png')] bg-center bg-no-repeat bg-contain opacity-5"></div>
      <div className="container max-w-4xl text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-8">Our Mission</h2>
        <p className="text-xl md:text-2xl text-[#F5F5F5] mb-12 leading-relaxed">
          We believe AI should work <span className="text-black font-semibold">with</span> you, not just <span className="text-black font-semibold">for</span> you.
          <br /><br />
          We're building something truly different and you're invited to be part of it.
        </p>
        <div className="bg-black/10 backdrop-blur-sm p-6 rounded-xl border border-white/10">
          <blockquote className="italic text-lg md:text-xl text-[#F5F5F5]">
            "The goal isn't to replace human thinking, but to extend it intelligently."
          </blockquote>
          <div className="mt-4">
            <p className="font-bold">AkinAI Team</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
