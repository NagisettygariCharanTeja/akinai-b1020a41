
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
  
  // Calculate days remaining (example date)
  const launchDate = new Date('2025-06-30');
  const today = new Date();
  const daysRemaining = Math.floor((launchDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <section id="early-access" className="bg-gradient-to-br from-akin-purple to-akin-electric-purple text-white">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Be the First to Experience AkinAI</h2>
          <p className="text-xl mb-8 opacity-90">
            Join our beta and help shape the future of AI. Early access members will receive exclusive benefits and features.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-10">
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
              className="h-12 bg-white text-akin-purple hover:bg-white/90 hover:text-akin-electric-purple font-semibold"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Request Early Access"}
            </Button>
          </form>
          
          <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm border border-white/20">
            <h3 className="font-semibold text-xl mb-4">Launching in</h3>
            <div className="flex justify-center gap-4 text-center">
              <div className="bg-white/20 rounded-lg p-4 min-w-[80px]">
                <span className="text-3xl font-bold">{daysRemaining}</span>
                <p className="text-sm opacity-80">days</p>
              </div>
              <div className="bg-white/20 rounded-lg p-4 min-w-[80px]">
                <span className="text-3xl font-bold">00</span>
                <p className="text-sm opacity-80">hours</p>
              </div>
              <div className="bg-white/20 rounded-lg p-4 min-w-[80px]">
                <span className="text-3xl font-bold">00</span>
                <p className="text-sm opacity-80">minutes</p>
              </div>
              <div className="bg-white/20 rounded-lg p-4 min-w-[80px]">
                <span className="text-3xl font-bold">00</span>
                <p className="text-sm opacity-80">seconds</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
