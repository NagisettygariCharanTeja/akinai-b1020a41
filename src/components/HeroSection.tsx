
import React, { useState, useEffect } from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ArrowRight } from 'lucide-react';

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
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-black/10 blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-black/10 blur-3xl"></div>
      </div>
      
      <div className="container relative z-10">
        <div className="flex flex-col items-center">
          <div className="mb-12 text-center">
            {/* Logo with enhanced animation */}
            <div className="mb-10 flex flex-col items-center">
              <div className="w-32 h-32 flex justify-center relative">
                <div className="absolute inset-0 bg-[#685B60] rounded-full blur-md transform scale-90"></div>
                <img 
                  src="/lovable-uploads/25eb766e-0b57-479d-9349-2f3b20e6fdb9.png" 
                  alt="akinAI logo" 
                  className="w-full h-full object-contain relative z-10 animate-pulse"
                  style={{ animationDuration: '4s' }}
                />
                <div className="absolute inset-0 bg-white/5 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
              </div>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-black leading-tight mb-8 max-w-4xl mx-auto text-shadow-lg">
              Your Mind's<br />
              <span className="relative inline-block">
                Second Brain
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-black to-transparent"></span>
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-[#F5F5F5] max-w-2xl mx-auto leading-tight backdrop-blur-sm py-2 text-shadow-sm">
              Welcome to the future of productivity, creativity, and memory.
              akinAI isn't just another AI app it's your cognitive companion, learning from you, helping you
              think better, plan smarter, and never forget what matters.
            </p>
            
            {/* Enhanced Launch Countdown */}
            <div className="mt-12 mb-10">
              <p className="text-lg text-[#F5F5F5] mb-6 fancy-border inline-block">Launching in:</p>
              <div className="flex justify-center space-x-4 sm:space-x-6">
                <div className="flex flex-col items-center group hover-lift">
                  <div className="frost-glass w-16 sm:w-24 h-16 sm:h-24 rounded-2xl flex items-center justify-center border border-white/20 group-hover:border-white/40 transition-all duration-300">
                    <span className="text-2xl sm:text-4xl font-bold text-white text-glow">{days}</span>
                  </div>
                  <span className="text-sm mt-2 text-[#F5F5F5] opacity-80 group-hover:opacity-100 transition-opacity">Days</span>
                </div>
                <div className="flex flex-col items-center group hover-lift">
                  <div className="frost-glass w-16 sm:w-24 h-16 sm:h-24 rounded-2xl flex items-center justify-center border border-white/20 group-hover:border-white/40 transition-all duration-300">
                    <span className="text-2xl sm:text-4xl font-bold text-white text-glow">{hours}</span>
                  </div>
                  <span className="text-sm mt-2 text-[#F5F5F5] opacity-80 group-hover:opacity-100 transition-opacity">Hours</span>
                </div>
                <div className="flex flex-col items-center group hover-lift">
                  <div className="frost-glass w-16 sm:w-24 h-16 sm:h-24 rounded-2xl flex items-center justify-center border border-white/20 group-hover:border-white/40 transition-all duration-300">
                    <span className="text-2xl sm:text-4xl font-bold text-white text-glow">{minutes}</span>
                  </div>
                  <span className="text-sm mt-2 text-[#F5F5F5] opacity-80 group-hover:opacity-100 transition-opacity">Minutes</span>
                </div>
                <div className="flex flex-col items-center group hover-lift">
                  <div className="frost-glass w-16 sm:w-24 h-16 sm:h-24 rounded-2xl flex items-center justify-center border border-white/20 group-hover:border-white/40 transition-all duration-300">
                    <span className="text-2xl sm:text-4xl font-bold text-white text-glow">{seconds}</span>
                  </div>
                  <span className="text-sm mt-2 text-[#F5F5F5] opacity-80 group-hover:opacity-100 transition-opacity">Seconds</span>
                </div>
              </div>
            </div>
            
            {/* Get early access button */}
            <div className="mt-12">
              <a href="#early-access" className="inline-flex items-center group">
                <span className="premium-button px-8 py-4 rounded-xl text-lg font-semibold group-hover:scale-105 transition-transform">
                  Get Early Access
                  <ArrowRight className="ml-2 inline-block group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Animated background elements */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/10 to-transparent z-0"></div>
    </section>
  );
};

export default HeroSection;
