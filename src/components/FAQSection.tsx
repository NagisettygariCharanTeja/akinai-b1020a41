
import React, { useState } from 'react';

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  
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

  return (
    <section id="faq" className="py-24 relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#333333]/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#333333]/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-shadow-lg relative inline-block">
            Frequently Asked Questions
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-black to-transparent"></span>
          </h2>
          <p className="text-xl text-[#F5F5F5] max-w-3xl mx-auto">Everything you need to know about akinAI</p>
        </div>
        
        <div className="max-w-3xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`frost-glass rounded-2xl border transition-all duration-500 overflow-hidden ${
                activeIndex === index
                  ? "border-white/30 shadow-2xl"
                  : "border-white/10 hover:border-white/20"
              }`}
            >
              <button 
                className="w-full text-left p-6 md:p-8 flex justify-between items-center hover:bg-black/10 transition-colors duration-300"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-xl md:text-2xl font-bold text-shadow-sm">{faq.question}</h3>
                <span className={`transform transition-transform duration-500 text-white ${activeIndex === index ? 'rotate-180' : ''}`}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </button>
              <div 
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  activeIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <p className="p-6 md:p-8 pt-0 text-[#F5F5F5] border-t border-white/10 text-lg leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
