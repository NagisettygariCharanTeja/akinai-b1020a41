
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const CallToActionSection = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Intersection Observer for animation on scroll
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const elementsToAnimate = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    elementsToAnimate?.forEach(el => {
      el.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-1000', 'ease-out');
      observer.observe(el);
    });
    
    return () => {
      elementsToAnimate?.forEach(el => observer.unobserve(el));
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address to join the waitlist.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setEmail('');
      toast({
        title: "Success!",
        description: "You've been added to our waitlist. We'll be in touch soon!",
      });
    }, 1500);
  };

  return (
    <section id="early-access" ref={sectionRef} className="py-32 relative">
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#685B60]/30 to-transparent z-0"></div>
      <div className="noise-overlay"></div>
      
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto relative animate-on-scroll">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#333333]/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#222222]/10 rounded-full blur-3xl"></div>
          
          <div className="premium-card p-12 md:p-16 relative z-10">
            <div className="absolute inset-0 bg-gradient-mesh opacity-10 rounded-xl"></div>
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1 bg-[#333333]/20 rounded-full text-sm font-medium text-white mb-4">
                LIMITED EARLY ACCESS
              </span>
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="text-gradient">Be the First to Know</span>
              </h2>
              <p className="text-xl md:text-2xl text-[#F5F5F5] mb-8 max-w-2xl mx-auto leading-relaxed">
                We're building something truly different and you're invited to be part of it.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="h-14 bg-white/10 border-white/20 text-white placeholder:text-white/60 rounded-lg px-6 text-lg focus:ring-2 focus:ring-[#403E43] transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Button 
                type="submit" 
                className="h-14 bg-gradient-to-r from-[#333333] to-[#222222] text-white hover:opacity-90 font-semibold px-8 rounded-lg text-lg shadow-premium hover:shadow-premium-hover transition-all"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </div>
                ) : (
                  "Request Early Access"
                )}
              </Button>
            </form>
            <p className="text-sm text-[#F5F5F5] opacity-70 mt-5 text-center">
              We respect your inbox. No spam — only launch updates & early access opportunities.
            </p>
            
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass text-center p-4 rounded-xl">
                <div className="text-3xl font-bold text-gradient mb-2">500+</div>
                <p className="text-[#F5F5F5] text-sm">Beta Testers</p>
              </div>
              <div className="glass text-center p-4 rounded-xl">
                <div className="text-3xl font-bold text-gradient mb-2">12</div>
                <p className="text-[#F5F5F5] text-sm">Months in Development</p>
              </div>
              <div className="glass text-center p-4 rounded-xl">
                <div className="text-3xl font-bold text-gradient mb-2">100%</div>
                <p className="text-[#F5F5F5] text-sm">Privacy Focused</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
