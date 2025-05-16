
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import AvatarAnimation from './AvatarAnimation';

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="wave-bg bg-akin-purple/5 animate-wave"></div>
      <div className="wave-bg bg-akin-blue/5 animate-wave" style={{ animationDelay: "-5s", opacity: "0.6" }}></div>
      
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6 max-w-2xl opacity-0 animate-fadeIn">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-akin-purple leading-tight">
              Meet AkinAI — Your Conversational Companion with Real Intelligence
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300">
              AkinAI is not just another chatbot — it's a context-aware, emotionally intelligent assistant that understands you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="bg-akin-purple hover:bg-akin-electric-purple text-white font-semibold">
                Join the Waitlist
              </Button>
              <Button variant="outline" size="lg" className="border-akin-purple text-akin-purple hover:text-akin-electric-purple hover:border-akin-electric-purple">
                Explore Features <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex justify-center lg:justify-end">
            <AvatarAnimation />
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#features" className="text-akin-purple flex flex-col items-center">
          <span className="mb-2 text-sm font-medium">Learn More</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
