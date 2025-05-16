
import React, { useState, useRef, useEffect } from 'react';

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  
  const faqs = [
    {
      question: "Is AkinAI available right now?",
      answer: "Not yet — but it's in development. Leave your email to get notified when we launch."
    },
    {
      question: "Will it be free?",
      answer: "There will be a free version with core features. Premium plans will unlock deeper customizations and \"Dream Mode\" enhancements."
    },
    {
      question: "How is it different from ChatGPT or Notion AI?",
      answer: "AkinAI focuses on you — not just answering questions, but analyzing patterns, remembering your context, and surfacing what you need before you ask."
    },
    {
      question: "Can I use it on mobile?",
      answer: "Yes. A mobile-friendly experience is part of our plan after the desktop version rolls out."
    }
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  
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
    <section id="faq" ref={sectionRef} className="py-32 relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#333333]/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#403E43]/5 rounded-full blur-3xl -z-10"></div>
      <div className="noise-overlay"></div>
      
      <div className="container">
        <div className="text-center mb-20 animate-on-scroll">
          <span className="inline-block px-4 py-1 bg-[#333333]/20 rounded-full text-sm font-medium text-white mb-4">
            GOT QUESTIONS?
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-gradient">Frequently Asked Questions</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#403E43] to-transparent rounded-full mx-auto"></div>
        </div>
        
        <div className="max-w-3xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="animate-on-scroll">
              <div className="premium-card overflow-hidden transform transition-all duration-500 hover:shadow-premium-hover">
                <button 
                  className="w-full text-left p-6 flex justify-between items-center hover:bg-black/10 transition-all duration-300"
                  onClick={() => toggleFAQ(index)}
                >
                  <h3 className="text-xl font-bold">{faq.question}</h3>
                  <span className={`transform transition-transform duration-300 bg-[#403E43]/10 rounded-full p-2 ${activeIndex === index ? 'rotate-180' : ''}`}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 9L12 15L18 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-500 ${
                    activeIndex === index ? 'max-h-40' : 'max-h-0'
                  }`}
                >
                  <div className="p-6 pt-0 text-[#F5F5F5] border-t border-white/5 bg-gradient-to-b from-transparent to-black/10">
                    <p className="leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
