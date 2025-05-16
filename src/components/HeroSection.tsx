
import React, { useState, useEffect } from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const HeroSection = () => {
  const [days, setDays] = useState<number>(69);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    // Set launch date to 69 days from now for promotional purposes
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 69);
    
    const interval = setInterval(() => {
      const now = new Date();
      const difference = launchDate.getTime() - now.getTime();
      
      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((difference % (1000 * 60)) / 1000);
      
      setDays(d);
      setHours(h);
      setMinutes(m);
      setSeconds(s);
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">      
      <div className="container relative z-10">
        <div className="flex flex-col items-center">
          <div className="mb-12 text-center">
            {/* Just the logo */}
            <div className="mb-6 flex flex-col items-center">
              <div className="w-32 h-32 flex justify-center">
                <img 
                  src="/lovable-uploads/25eb766e-0b57-479d-9349-2f3b20e6fdb9.png" 
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
              akinAI isn't just another AI app it's your cognitive companion, learning from you, helping you
              think better, plan smarter, and never forget what matters.
            </p>
            
            {/* Launch Countdown */}
            <div className="mt-10 mb-8">
              <p className="text-lg text-[#F5F5F5] mb-4">Launching in:</p>
              <div className="flex justify-center space-x-4 sm:space-x-6">
                <div className="flex flex-col items-center">
                  <div className="bg-black/20 backdrop-blur-sm w-16 sm:w-20 h-16 sm:h-20 rounded-xl flex items-center justify-center border border-white/10">
                    <span className="text-2xl sm:text-3xl font-bold text-white">{days}</span>
                  </div>
                  <span className="text-sm mt-2 text-[#F5F5F5]">Days</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-black/20 backdrop-blur-sm w-16 sm:w-20 h-16 sm:h-20 rounded-xl flex items-center justify-center border border-white/10">
                    <span className="text-2xl sm:text-3xl font-bold text-white">{hours}</span>
                  </div>
                  <span className="text-sm mt-2 text-[#F5F5F5]">Hours</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-black/20 backdrop-blur-sm w-16 sm:w-20 h-16 sm:h-20 rounded-xl flex items-center justify-center border border-white/10">
                    <span className="text-2xl sm:text-3xl font-bold text-white">{minutes}</span>
                  </div>
                  <span className="text-sm mt-2 text-[#F5F5F5]">Minutes</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-black/20 backdrop-blur-sm w-16 sm:w-20 h-16 sm:h-20 rounded-xl flex items-center justify-center border border-white/10">
                    <span className="text-2xl sm:text-3xl font-bold text-white">{seconds}</span>
                  </div>
                  <span className="text-sm mt-2 text-[#F5F5F5]">Seconds</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
