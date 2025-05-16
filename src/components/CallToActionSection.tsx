
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const CallToActionSection = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

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
    <section id="early-access" className="py-24">
      <div className="container">
        <div className="max-w-3xl">
          <div className="text-2xl mb-2">🚀</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Be the First to Know</h2>
          <p className="text-lg md:text-xl text-[#F5F5F5] mb-8">
            We're building something truly different — and you're invited to be part of it.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <Input
                type="email"
                placeholder="Your email address"
                className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/60"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button 
              type="submit" 
              className="h-12 bg-white text-black hover:bg-white/90 font-semibold"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Request Early Access"}
            </Button>
          </form>
          <p className="text-sm text-[#F5F5F5] opacity-70 mt-3">
            We respect your inbox. No spam — only launch updates & early access opportunities.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
