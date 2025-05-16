
import React from 'react';
import { Mail, Github, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-16 relative">
      <div className="absolute inset-0 bg-black/20 -z-10"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      
      <div className="container">
        <div className="flex flex-col space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-1">
              <div className="mb-8 flex flex-col items-center md:items-start">
                <div className="font-dm-sans font-bold text-3xl mb-2 relative">
                  <span className="text-black">akin</span>
                  <span className="text-[#D9D9D9]">AI</span>
                  <span className="absolute -bottom-2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></span>
                </div>
              </div>
              <p className="text-md text-[#F5F5F5] max-w-xs leading-relaxed text-center md:text-left">
                Your mind's second brain, helping you think better, plan smarter, and never forget what matters.
              </p>
              
              <div className="flex space-x-4 mt-6 justify-center md:justify-start">
                <a href="#" className="p-2 frost-glass rounded-full hover:bg-white/10 transition-colors duration-300">
                  <Github size={20} className="text-white/80 hover:text-white transition-colors" />
                </a>
                <a href="#" className="p-2 frost-glass rounded-full hover:bg-white/10 transition-colors duration-300">
                  <Linkedin size={20} className="text-white/80 hover:text-white transition-colors" />
                </a>
                <a href="#" className="p-2 frost-glass rounded-full hover:bg-white/10 transition-colors duration-300">
                  <Mail size={20} className="text-white/80 hover:text-white transition-colors" />
                </a>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="font-bold text-xl mb-4 text-shadow-sm">Product</h3>
                  <ul className="space-y-3 text-[#F5F5F5]">
                    <li><a href="#what-is" className="hover:text-white transition-colors fancy-border">What is akinAI?</a></li>
                    <li><a href="#faq" className="hover:text-white transition-colors fancy-border">FAQs</a></li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-bold text-xl mb-4 text-shadow-sm">Company</h3>
                  <ul className="space-y-3 text-[#F5F5F5]">
                    <li><a href="#" className="hover:text-white transition-colors fancy-border">About Us</a></li>
                    <li><a href="#" className="hover:text-white transition-colors fancy-border">Blog</a></li>
                    <li><a href="#" className="hover:text-white transition-colors fancy-border">Careers</a></li>
                    <li><a href="#" className="hover:text-white transition-colors fancy-border">Contact Us</a></li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-bold text-xl mb-4 text-shadow-sm">Legal</h3>
                  <ul className="space-y-3 text-[#F5F5F5]">
                    <li><a href="#" className="hover:text-white transition-colors fancy-border">Privacy Policy</a></li>
                    <li><a href="#" className="hover:text-white transition-colors fancy-border">Terms of Service</a></li>
                    <li><a href="#" className="hover:text-white transition-colors fancy-border">Cookie Policy</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-white/10">
            <p className="text-sm text-[#F5F5F5] mb-4 sm:mb-0">© {currentYear} akinAI. All rights reserved.</p>
            <p className="text-sm text-[#F5F5F5] flex items-center">
              <span className="mr-1">Built with</span>
              <span className="inline-block animate-pulse" style={{ animationDuration: '2s' }}>❤️</span>
              <span className="ml-1">by the akinAI Team</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
