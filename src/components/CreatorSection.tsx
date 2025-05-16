
import React from 'react';

const CreatorSection = () => {
  return (
    <section id="creator" className="py-24">
      <div className="container">
        <div className="max-w-3xl">
          <div className="text-2xl mb-2">💬</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">From the Creator</h2>
          <blockquote className="text-lg md:text-xl text-[#F5F5F5] italic">
            "I built AkinAI because I wanted an assistant that remembered why I said things, not just what I said.
            One that could reflect with me, not just respond to me."
          </blockquote>
          <p className="text-right mt-4 text-[#F5F5F5]">– Charan Teja, Creator of AkinAI</p>
        </div>
      </div>
    </section>
  );
};

export default CreatorSection;
