
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';

const DemoSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  
  const screenshots = [
    {
      image: "/lovable-uploads/568d5b30-b38f-4d41-86fb-8b7cfad59169.png",
      caption: "Split Screen Multitasking - Compare ideas side by side"
    },
    {
      image: "/lovable-uploads/7a6d40d9-9c7f-4982-ac8c-f2108c83ddc8.png", 
      caption: "Pin-a-Prompt - Keep important notes in sight"
    },
    {
      image: "/lovable-uploads/25eb766e-0b57-479d-9349-2f3b20e6fdb9.png",
      caption: "Dream Mode - Let akinAI generate insights while you're away"
    }
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % screenshots.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % screenshots.length);
  };
  
  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  return (
    <section id="demo" className="py-24 relative overflow-hidden">
      <div className="absolute top-40 right-0 w-96 h-96 bg-[#403E43]/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-40 left-0 w-80 h-80 bg-[#403E43]/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">See AkinAI in Action</h2>
          <p className="text-xl text-[#F5F5F5] max-w-3xl mx-auto">
            A sneak peek of what's coming soon. Experience the natural conversation flow and emotional intelligence that sets AkinAI apart.
          </p>
        </div>
        
        <div className="bg-black/10 backdrop-blur-sm rounded-2xl overflow-hidden max-w-5xl mx-auto border border-white/10">
          <div className="relative">
            {/* Image Slideshow */}
            <div className="aspect-w-16 aspect-h-9 bg-black/20 relative">
              <div className="relative w-full h-full overflow-hidden">
                {screenshots.map((screenshot, index) => (
                  <div 
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out flex items-center justify-center
                      ${activeSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                  >
                    <img 
                      src={screenshot.image}
                      alt={`akinAI screenshot ${index + 1}`}
                      className="max-h-full max-w-full object-contain p-6"
                    />
                  </div>
                ))}
              </div>
              
              {/* Navigation arrows */}
              <button 
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 rounded-full p-2 z-20 text-white transition-all"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button 
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 rounded-full p-2 z-20 text-white transition-all"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
              
              {/* Indicators */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-20">
                {screenshots.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all ${
                      activeSlide === index ? 'bg-white scale-125' : 'bg-white/40'
                    }`}
                    onClick={() => setActiveSlide(index)}
                  />
                ))}
              </div>
            </div>
            
            <div className="p-6 text-center">
              <p className="text-lg text-[#F5F5F5] mb-4">
                {screenshots[activeSlide].caption}
              </p>
              <a href="#early-access">
                <Button className="bg-gradient-to-r from-[#333333] to-[#222222] text-white hover:opacity-90">
                  Join the Waitlist
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
