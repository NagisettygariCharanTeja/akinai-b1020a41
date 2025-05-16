
import React, { useRef, useEffect } from 'react';
import { 
  SquareSplitVertical,
  Pin,
  Moon
} from 'lucide-react';

const FeaturesSection = () => {
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
      (el as HTMLElement).style.transitionDelay = `${index * 200}ms`;
      observer.observe(el);
    });
    
    return () => {
      elementsToAnimate?.forEach(el => observer.unobserve(el));
    };
  }, []);
  
  const features = [
    {
      icon: <SquareSplitVertical size={28} />,
      emoji: "🔲",
      title: "Split Screen Multitasking",
      description: "Use multiple AI threads side by side. Compare ideas, plan projects, or talk with two different personas all in one view. Imagine ChatGPT meets your personal workspace and they work together."
    },
    {
      icon: <Pin size={28} />,
      emoji: "📌",
      title: "Pin-a-Prompt",
      description: "Got a mantra, plan, or question you want to keep in sight? Pin it. Set how long it stays visible. Stay focused without retyping. Think of it like sticky notes for your digital brain."
    },
    {
      icon: <Moon size={28} />,
      emoji: "🌙",
      title: "Dream Mode",
      description: "AkinAI \"dreams\" when you're away. It scans your previous interactions and generates: What to prioritize tomorrow, creative ideas based on patterns and habits, subtle reminders you may have forgotten. Like an AI that reflects while you sleep."
    }
  ];

  return (
    <section id="features" ref={sectionRef} className="pt-24 pb-32 relative overflow-hidden">
      <div className="absolute top-40 right-0 w-96 h-96 bg-[#403E43]/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-40 left-0 w-80 h-80 bg-[#403E43]/5 rounded-full blur-3xl -z-10"></div>
      <div className="noise-overlay"></div>
      
      <div className="container">
        <div className="mb-20 text-center animate-on-scroll">
          <span className="inline-block px-4 py-1 bg-[#333333]/20 rounded-full text-sm font-medium text-white mb-4">
            POWERFUL CAPABILITIES
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-gradient">Key Features</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#403E43] to-transparent rounded-full mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div key={index} className="group animate-on-scroll">
              <div className="premium-card h-full relative">
                <span className="absolute -top-5 -right-5 text-4xl transform rotate-12">{feature.emoji}</span>
                
                <div className="flex items-center mb-6">
                  <div className="mr-4 p-3 rounded-lg bg-gradient-to-r from-[#403E43]/20 to-[#222222]/20 backdrop-blur-sm group-hover:from-[#403E43]/30 group-hover:to-[#222222]/30 transition-all duration-500 shadow-inner-glow">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold">{feature.title}</h3>
                </div>
                <p className="text-lg text-[#F5F5F5] leading-relaxed">{feature.description}</p>
                <div className="mt-8 w-12 h-1 bg-gradient-to-r from-[#403E43] to-[#222222] rounded-full group-hover:w-24 transition-all duration-500"></div>
                
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/5 to-transparent rounded-b-xl"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
