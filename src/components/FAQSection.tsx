
import React, { useState } from 'react';

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
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
      answer: "Yes. A mobile friendly experience is part of our plan after the desktop version rolls out."
    }
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#333333]/5 rounded-full blur-3xl z-10"></div>
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
        </div>
        
        <div className="max-w-3xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-black/10 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
              <button 
                className="w-full text-left p-6 flex justify-between items-center hover:bg-black/20 transition-all duration-300"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-xl font-bold">{faq.question}</h3>
                <span className={`transform transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9L12 15L18 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  activeIndex === index ? 'max-h-40' : 'max-h-0'
                }`}
              >
                <p className="p-6 pt-0 text-[#F5F5F5] border-t border-white/5">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
