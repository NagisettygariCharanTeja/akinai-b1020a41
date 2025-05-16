
import React from 'react';

const Footer = () => {
  return (
    <footer className="py-16 relative">
      <div className="absolute inset-0 bg-black/10 -z-10"></div>
      <div className="container">
        <div className="border-t border-white/20 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <div className="flex items-center mb-6">
                <div className="mr-3">
                  <div className="w-10 h-10 transform rotate-90">
                    <img src="/lovable-uploads/568d5b30-b38f-4d41-86fb-8b7cfad59169.png" alt="akinAI logo" className="w-full h-full" />
                  </div>
                </div>
                <div className="text-xl font-bold">
                  <span className="text-black">akin</span><span className="text-[#D9D9D9]">AI</span>
                </div>
              </div>
              <p className="text-sm text-[#F5F5F5] max-w-xs">
                Your mind's second brain - helping you think better, plan smarter, and never forget what matters.
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
          
          <div className="flex flex-col sm:flex-row justify-between items-center border-t border-white/10 pt-6">
            <p className="text-sm text-[#F5F5F5]">© 2025 akinAI. All rights reserved.</p>
            <p className="text-sm text-[#F5F5F5] mt-2 sm:mt-0">Built with ❤️ by the akinAI Team</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
