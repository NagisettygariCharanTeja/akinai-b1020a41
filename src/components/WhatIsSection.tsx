
import React, { useRef, useEffect } from 'react';
import { Zap } from 'lucide-react';

const WhatIsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Intersection Observer for animation on scroll
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
      elementsToAnimate?.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <section id="what-is" ref={sectionRef} className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#685B60]/30 to-transparent z-0"></div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#685B60]/30 to-transparent z-0"></div>
      <div className="container relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="md:order-2">
            <div className="relative animate-on-scroll" style={{ transitionDelay: '200ms' }}>
              <div className="absolute -top-16 -left-16 w-64 h-64 bg-[#333333]/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-[#222222]/10 rounded-full blur-3xl"></div>
              <div className="premium-card relative z-10">
                <div className="bg-gradient-to-r from-[#403E43] to-[#222222] p-4 inline-flex rounded-full mb-8 shadow-lg transform transition-transform hover:scale-110 hover:rotate-3 duration-300">
                  <Zap className="text-white h-6 w-6" />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">What is <span className="text-black">akin</span><span className="text-[#D9D9D9]">AI</span>?</h2>
                <p className="text-lg md:text-xl text-[#F5F5F5] max-w-3xl leading-relaxed">
                  akinAI is an AI powered digital assistant designed to mirror your thinking patterns, 
                  organize your digital life, and spark creativity like a true second brain.
                  It's not just about answering questions — it's about staying in sync with you.
                </p>
                <div className="mt-8 w-24 h-1 bg-gradient-to-r from-[#403E43] to-transparent rounded-full"></div>
              </div>
            </div>
          </div>
          
          <div className="md:order-1 animate-on-scroll">
            <div className="relative h-80 md:h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-[#403E43]/30 to-[#222222]/30 rounded-2xl transform rotate-3 shadow-premium"></div>
              <div className="absolute inset-0 glass rounded-2xl -rotate-3 shadow-premium">
                <div className="absolute inset-0 opacity-10 overflow-hidden rounded-2xl">
                  <div className="absolute -inset-[10%] bg-neural-pattern opacity-5 animate-spin-slow"></div>
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-gray-100 animate-pulse">AI</div>
              </div>
              <div className="absolute inset-0 glass-hover rounded-2xl opacity-0"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIsSection;
