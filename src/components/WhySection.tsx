
import React, { useRef, useEffect } from 'react';
import { Lightbulb } from 'lucide-react';

const WhySection = () => {
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
    elementsToAnimate?.forEach((el, index) => {
      el.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-1000', 'ease-out');
      // Add staggered delay
      (el as HTMLElement).style.transitionDelay = `${index * 150}ms`;
      observer.observe(el);
    });
    
    return () => {
      elementsToAnimate?.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <section id="why" ref={sectionRef} className="py-32 relative">
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#685B60]/30 to-transparent z-0"></div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#685B60]/30 to-transparent z-0"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#403E43]/5 rounded-full blur-3xl -z-10"></div>
      <div className="noise-overlay"></div>
      
      <div className="container relative z-10">
        <div className="mb-16 text-center animate-on-scroll">
          <span className="inline-block px-4 py-1 bg-[#333333]/20 rounded-full text-sm font-medium text-white mb-4">
            THE AKINAI DIFFERENCE
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-gradient">Why akinAI?</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#403E43] to-transparent rounded-full mx-auto"></div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="md:w-1/2 animate-on-scroll">
            <div className="p-6 border-l-4 border-[#403E43] relative">
              <div className="shimmer premium-card relative">
                <div className="absolute -top-4 -left-4 bg-[#685B60] p-2 rounded-full border border-white/20 shadow-lg transform transition-transform hover:scale-110 hover:rotate-12 duration-300">
                  <Lightbulb className="text-[#403E43] h-6 w-6" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-6 mt-4">Your Perfect AI Companion</h3>
                <p className="text-lg md:text-xl text-[#F5F5F5] max-w-3xl leading-relaxed">
                  Other tools just help you "do."<br />
                  akinAI helps you <span className="font-semibold underline decoration-dotted underline-offset-4">think</span>. 
                  It organizes not just tasks but ideas, insights, and intentions.<br />
                  It's built for thinkers, builders, dreamers — anyone who wants to extend their mind.
                </p>
                <div className="mt-8 flex space-x-2">
                  <span className="inline-block w-2 h-2 bg-[#403E43] rounded-full animate-pulse"></span>
                  <span className="inline-block w-2 h-2 bg-[#403E43] rounded-full animate-pulse animate-delay-300"></span>
                  <span className="inline-block w-2 h-2 bg-[#403E43] rounded-full animate-pulse animate-delay-500"></span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <div className="grid grid-cols-2 gap-6">
              {[
                {
                  title: "Thinkers",
                  color: "[#403E43]",
                  description: "Extend your cognitive capacity and organize complex thoughts."
                },
                {
                  title: "Builders",
                  color: "[#333333]",
                  description: "Convert ideas into structured plans and actionable steps."
                },
                {
                  title: "Creators",
                  color: "[#333333]",
                  description: "Find connections between ideas and spark creative insights."
                },
                {
                  title: "Dreamers",
                  color: "[#403E43]",
                  description: "Explore possibilities and expand your mental horizons."
                }
              ].map((item, index) => (
                <div key={index} className="animate-on-scroll">
                  <div className="premium-card h-full hover:translate-y-[-5px] hover:rotate-1">
                    <h3 className="text-xl font-bold mb-3 text-black">{item.title}</h3>
                    <div className={`w-12 h-1 bg-${item.color} mb-4 rounded-full`}></div>
                    <p className="text-[#F5F5F5] leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhySection;
