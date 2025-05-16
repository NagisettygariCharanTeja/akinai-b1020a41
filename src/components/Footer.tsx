
import React from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const Footer = () => {
  return (
    <footer className="py-8 relative">
      <div className="absolute inset-0 bg-black/10 -z-10"></div>
      <div className="container">
        <div className="border-t border-white/20 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            <div>
              <div className="mb-6 flex flex-col items-center md:items-start">
                <div className="w-16 h-16 flex justify-center">
                  <AspectRatio ratio={1/1} className="w-full">
                    <img 
                      src="/lovable-uploads/25eb766e-0b57-479d-9349-2f3b20e6fdb9.png" 
                      alt="akinAI logo" 
                      className="w-full h-full object-contain"
                    />
                  </AspectRatio>
                </div>
              </div>
              <p className="text-sm text-[#F5F5F5] max-w-xs">
                Your mind's second brain, helping you think better, plan smarter, and never forget what matters.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-[#F5F5F5]">
                <li><a href="#what-is" className="hover:text-white transition-colors">What is akinAI?</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">Key Features</a></li>
                <li><a href="#why" className="hover:text-white transition-colors">Why akinAI?</a></li>
                <li><a href="#mission" className="hover:text-white transition-colors">Our Mission</a></li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-center border-t border-white/10 pt-4">
            <p className="text-sm text-[#F5F5F5]">© 2025 akinAI. All rights reserved.</p>
            <p className="text-sm text-[#F5F5F5] mt-2 sm:mt-0">Built with ❤️ by the akinAI Team</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
