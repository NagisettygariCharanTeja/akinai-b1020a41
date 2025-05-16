
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Sun, Moon } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check system preference for dark mode
  useEffect(() => {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(darkModeQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };
    
    darkModeQuery.addEventListener('change', handleChange);
    return () => darkModeQuery.removeEventListener('change', handleChange);
  }, []);
  
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

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const navLinks = [
    { name: "What is akinAI", href: "#what-is" },
    { name: "Features", href: "#features" },
    { name: "Why akinAI", href: "#why" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-black/30 backdrop-blur-lg shadow-lg py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="text-2xl font-bold flex items-center group">
            <div className="w-8 h-8 mr-2 transform group-hover:rotate-12 transition-transform duration-300">
              <img 
                src="/lovable-uploads/25eb766e-0b57-479d-9349-2f3b20e6fdb9.png" 
                alt="akinAI logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-black mr-1">akin</span>
            <span className="text-[#D9D9D9]">AI</span>
          </a>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href}
                className="text-white hover:text-[#F5F5F5] font-medium text-sm transition-all duration-300 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:-bottom-1 after:left-0 after:bg-[#403E43] after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
              >
                {link.name}
              </a>
            ))}
          </div>
          
          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleDarkMode}
              className="glass-hover rounded-full w-10 h-10"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button 
              variant="outline" 
              className="border border-white/30 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300"
            >
              Login
            </Button>
            <Button 
              className="bg-gradient-to-r from-[#333333] to-[#222222] hover:from-[#222222] hover:to-[#111111] text-white border-none shadow-premium hover:shadow-premium-hover transition-all duration-500"
            >
              <span className="shimmer">Join Waitlist</span>
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleDarkMode}
              className="glass-hover rounded-full w-10 h-10"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="glass-hover rounded-full w-10 h-10"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/80 backdrop-blur-lg shadow-lg mt-2 max-h-[80vh] overflow-y-auto animate-slideUp">
          <div className="container mx-auto px-4 py-6 flex flex-col space-y-6">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href}
                className="text-white hover:text-[#F5F5F5] py-2 text-lg font-medium border-b border-white/10 pb-4"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 flex flex-col space-y-4">
              <Button 
                variant="outline" 
                className="w-full justify-center py-6 border border-white/30 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10"
              >
                Login
              </Button>
              <Button 
                className="w-full justify-center py-6 bg-gradient-to-r from-[#333333] to-[#222222] hover:from-[#222222] hover:to-[#111111] text-white"
              >
                Join Waitlist
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
