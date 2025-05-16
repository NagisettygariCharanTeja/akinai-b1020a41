
import React from 'react';

const FAQSection = () => {
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

  return (
    <section id="faq" className="py-24">
      <div className="container">
        <div className="mb-12">
          <div className="text-2xl mb-2">🤔</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
        </div>
        
        <div className="space-y-8 max-w-3xl">
          {faqs.map((faq, index) => (
            <div key={index}>
              <h3 className="text-xl font-bold mb-2">Q: {faq.question}</h3>
              <p className="text-[#F5F5F5]">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
