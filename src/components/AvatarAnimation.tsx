
import React, { useEffect, useState } from 'react';

const AvatarAnimation = () => {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className={`relative w-72 h-72 md:w-96 md:h-96 transition-all duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-akin-purple via-akin-purple/70 to-akin-blue/50 blur-xl animate-pulse opacity-60"></div>
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-akin-blue/30 to-akin-purple/20 animate-float"></div>
      <div className="absolute inset-4 sm:inset-6 rounded-full bg-white dark:bg-gray-900 flex items-center justify-center animate-float" style={{ animationDelay: "-2s" }}>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 200 200" 
          width="70%" 
          height="70%" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="text-akin-purple">
          {/* Simplistic AI face */}
          <circle cx="100" cy="100" r="50" className="stroke-akin-purple fill-white/10" />
          <path d="M80 90 A10 10 0 0 1 90 100" className="stroke-akin-purple stroke-2" />
          <path d="M110 90 A10 10 0 0 0 120 100" className="stroke-akin-purple stroke-2" />
          <path d="M85 120 C90 125 110 125 115 120" className="stroke-akin-purple stroke-2" />
          
          {/* Neural connections */}
          <line x1="60" y1="50" x2="75" y2="65" className="opacity-70 animate-pulse" />
          <line x1="140" y1="50" x2="125" y2="65" className="opacity-70 animate-pulse" />
          <line x1="60" y1="150" x2="75" y2="135" className="opacity-70 animate-pulse" />
          <line x1="140" y1="150" x2="125" y2="135" className="opacity-70 animate-pulse" />
          
          {/* Orbital rings */}
          <circle cx="100" cy="100" r="70" className="stroke-akin-blue/50 stroke-1 animate-pulse opacity-70" />
          <circle cx="100" cy="100" r="85" className="stroke-akin-purple/50 stroke-1 animate-pulse opacity-50" style={{ animationDelay: "-1s" }} />
        </svg>
      </div>
    </div>
  );
};

export default AvatarAnimation;
