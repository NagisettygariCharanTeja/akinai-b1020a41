
import React, { useState, useEffect, useRef } from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const HeroSection = () => {
  const [days, setDays] = useState<number>(69);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const sectionRef = useRef<HTMLElement>(null);

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
    
    // Reveal animation
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const elementsToAnimate = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    elementsToAnimate?.forEach(el => {
      el.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-1000', 'ease-out');
      observer.observe(el);
    });
    
    return () => {
      clearInterval(interval);
      elementsToAnimate?.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <section 
      id="hero" 
      ref={sectionRef}
      className="relative min-h-[100vh] flex items-center justify-center overflow-hidden py-32"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-mesh opacity-30"></div>
        <div className="noise-overlay"></div>
      </div>
      
      <div className="container relative z-10 px-4 md:px-6">
        <div className="flex flex-col items-center">
          <div className="mb-12 text-center">
            {/* Logo with floating animation */}
            <div className="mb-10 flex flex-col items-center animate-on-scroll">
              <div className="w-36 h-36 flex justify-center animate-float">
                <img 
                  src="/lovable-uploads/25eb766e-0b57-479d-9349-2f3b20e6fdb9.png" 
                  alt="akinAI logo" 
                  className="w-full h-full object-contain drop-shadow-2xl"
                />
              </div>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-black leading-tight mb-8 max-w-5xl mx-auto animate-on-scroll">
              Your Mind's<br />
              <span className="relative">
                <span className="text-gradient">Second Brain</span>
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#403E43] to-transparent rounded-full"></span>
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-[#F5F5F5] max-w-2xl mx-auto leading-relaxed animate-on-scroll">
              Welcome to the future of productivity, creativity, and memory.
              akinAI isn't just another AI app — it's your cognitive companion, learning from you, helping you
              think better, plan smarter, and never forget what matters.
            </p>
            
            {/* Launch Countdown */}
            <div className="mt-14 mb-10 animate-on-scroll">
              <p className="text-lg text-[#F5F5F5] mb-6 opacity-90">Launching in:</p>
              <div className="flex justify-center space-x-4 sm:space-x-8">
                <div className="flex flex-col items-center">
                  <div className="glass w-16 sm:w-24 h-16 sm:h-24 rounded-xl flex items-center justify-center glass-hover animate-breathe">
                    <span className="text-2xl sm:text-4xl font-bold text-white">{days}</span>
                  </div>
                  <span className="text-sm mt-2 text-[#F5F5F5]">Days</span>
                </div>
                <div className="flex flex-col items-center animate-delay-300">
                  <div className="glass w-16 sm:w-24 h-16 sm:h-24 rounded-xl flex items-center justify-center glass-hover animate-breathe">
                    <span className="text-2xl sm:text-4xl font-bold text-white">{hours}</span>
                  </div>
                  <span className="text-sm mt-2 text-[#F5F5F5]">Hours</span>
                </div>
                <div className="flex flex-col items-center animate-delay-500">
                  <div className="glass w-16 sm:w-24 h-16 sm:h-24 rounded-xl flex items-center justify-center glass-hover animate-breathe">
                    <span className="text-2xl sm:text-4xl font-bold text-white">{minutes}</span>
                  </div>
                  <span className="text-sm mt-2 text-[#F5F5F5]">Minutes</span>
                </div>
                <div className="flex flex-col items-center animate-delay-700">
                  <div className="glass w-16 sm:w-24 h-16 sm:h-24 rounded-xl flex items-center justify-center glass-hover animate-breathe">
                    <span className="text-2xl sm:text-4xl font-bold text-white">{seconds}</span>
                  </div>
                  <span className="text-sm mt-2 text-[#F5F5F5]">Seconds</span>
                </div>
              </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-pulse">
              <span className="text-sm text-[#F5F5F5] mb-2">Scroll to explore</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19M12 19L19 12M12 19L5 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
