
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "What is AkinAI", href: "#what-is" },
    { name: "FAQs", href: "#faq" },
    { name: "Early Access", href: "#early-access" },
  ];

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-[#685B60]/80 backdrop-blur-lg shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-5">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="font-bold text-black text-2xl flex items-center group">
            <span className="mr-1">akin</span>
            <span className="bg-[#685B60]/80 backdrop-blur-md text-[#D9D9D9] px-2 py-1 rounded-md group-hover:bg-[#685B60] transition-colors">AI</span>
          </a>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href}
                className="text-[#F5F5F5] hover:text-white font-medium relative fancy-border transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden frost-glass shadow-xl border-t border-white/10">
          <div className="container mx-auto px-6 py-6 flex flex-col space-y-6">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href}
                className="text-white hover:text-white/80 py-2 text-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
