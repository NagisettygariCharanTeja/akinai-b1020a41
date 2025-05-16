
import React from 'react';

const CreatorSection = () => {
  return (
    <section id="creator" className="py-24 relative">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0di00aC0ydjRoLTR2Mmg0djRoMnYtNGg0di0yaC00em0wLTMwVjBoLTJ2NEgtNHYyaDR2NGgyVjZoNFY0aC00ek02IDM0di00SDR2NEgwdjJoNHY0aDJ2LTRoNHYtMkg2ek02IDRWMEg0djRIMHYyaDR2NGgyVjZoNFY0SDZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10 -z-10"></div>
      <div className="container">
        <div className="md:w-2/3 mx-auto">
          <div className="bg-black/10 backdrop-blur-sm p-8 rounded-xl border border-white/10 relative">
            <div className="absolute -top-5 -left-5 text-5xl">"</div>
            <div className="absolute -bottom-5 -right-5 text-5xl">"</div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">From the Creator</h2>
            <blockquote className="text-lg md:text-xl text-[#F5F5F5] italic">
              "I built AkinAI because I wanted an assistant that remembered why I said things, not just what I said.
              One that could reflect with me, not just respond to me."
            </blockquote>
            <div className="border-t border-white/10 mt-6 pt-4 flex justify-end items-center gap-4">
              <div>
                <p className="font-bold text-right">Charan Teja Nagisettygari</p>
                <p className="text-sm text-[#F5F5F5] text-right">Creator of AkinAI</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreatorSection;
