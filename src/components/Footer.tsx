
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 relative">
      <div className="absolute inset-0 bg-black/20 -z-10"></div>
      <div className="noise-overlay"></div>
      
      <div className="container relative z-10">
        <div className="border-t border-white/20 pt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-10">
            <div>
              <div className="mb-6 flex flex-col items-center md:items-start">
                <div className="font-dm-sans font-bold text-3xl flex items-center">
                  <div className="w-8 h-8 mr-2">
                    <img 
                      src="/lovable-uploads/25eb766e-0b57-479d-9349-2f3b20e6fdb9.png" 
                      alt="akinAI logo" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-black">akin</span>
                  <span className="text-[#D9D9D9]">AI</span>
                </div>
              </div>
              <p className="text-sm text-[#F5F5F5] max-w-xs leading-relaxed text-center md:text-left">
                Your mind's second brain, helping you think better, plan smarter, and never forget what matters.
              </p>
              
              <div className="mt-6 flex space-x-4 justify-center md:justify-start">
                <a href="#" className="glass p-2 rounded-full hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                  </svg>
                </a>
                <a href="#" className="glass p-2 rounded-full hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a href="#" className="glass p-2 rounded-full hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-xl mb-5">Quick Links</h3>
              <ul className="space-y-3 text-[#F5F5F5]">
                <li>
                  <a href="#what-is" className="hover:text-white transition-colors flex items-center">
                    <span className="w-1.5 h-1.5 bg-[#403E43] rounded-full inline-block mr-2"></span>
                    What is akinAI?
                  </a>
                </li>
                <li>
                  <a href="#features" className="hover:text-white transition-colors flex items-center">
                    <span className="w-1.5 h-1.5 bg-[#403E43] rounded-full inline-block mr-2"></span>
                    Key Features
                  </a>
                </li>
                <li>
                  <a href="#why" className="hover:text-white transition-colors flex items-center">
                    <span className="w-1.5 h-1.5 bg-[#403E43] rounded-full inline-block mr-2"></span>
                    Why akinAI?
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-white transition-colors flex items-center">
                    <span className="w-1.5 h-1.5 bg-[#403E43] rounded-full inline-block mr-2"></span>
                    FAQs
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-xl mb-5">Contact</h3>
              <div className="space-y-3">
                <p className="text-[#F5F5F5] flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 mt-1 flex-shrink-0">
                    <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                  <span>hello@akinai.com</span>
                </p>
                <p className="text-[#F5F5F5] flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 mt-1 flex-shrink-0">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <span>+1 (555) 123-4567</span>
                </p>
                <p className="text-[#F5F5F5] flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 mt-1 flex-shrink-0">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span>San Francisco, CA</span>
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-white/10">
            <p className="text-sm text-[#F5F5F5]">© {currentYear} akinAI. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <a href="#" className="text-sm text-[#F5F5F5] hover:text-white">Privacy Policy</a>
              <a href="#" className="text-sm text-[#F5F5F5] hover:text-white">Terms of Service</a>
              <a href="#" className="text-sm text-[#F5F5F5] hover:text-white">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
