
import React from 'react';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

const DemoSection = () => {
  return (
    <section id="demo" className="bg-neural-pattern bg-akin-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-akin-purple">See AkinAI in Action</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Experience the natural conversation flow and emotional intelligence that sets AkinAI apart.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden max-w-5xl mx-auto">
          <div className="aspect-w-16 aspect-h-9 bg-gray-200 dark:bg-gray-700 relative">
            {/* Video placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-akin-purple/20 absolute animate-ping opacity-75"></div>
                <Button variant="outline" size="icon" className="w-16 h-16 rounded-full bg-akin-purple text-white hover:bg-akin-electric-purple border-4 border-white">
                  <Play className="h-6 w-6" />
                </Button>
              </div>
              <p className="absolute bottom-6 text-center text-gray-600 dark:text-gray-300 w-full">
                Click to watch demo
              </p>
            </div>
          </div>
          
          <div className="p-6 flex justify-center">
            <Button className="bg-akin-purple hover:bg-akin-electric-purple text-white">
              Try a Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
