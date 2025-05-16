
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight, Mail } from 'lucide-react';

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
    <section id="early-access" className="py-24 relative">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-black/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-black/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto relative">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#333333]/10 rounded-full blur-xl"></div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#222222]/10 rounded-full blur-xl"></div>
          
          <div className="frost-glass p-12 rounded-2xl relative z-10 border border-white/20 transform transition-all duration-500 hover:border-white/30 hover:shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-shadow-lg">Be the First to Know</h2>
            <p className="text-lg md:text-xl text-[#F5F5F5] mb-10 leading-relaxed">
              We're building something truly different — and you're invited to be part of it.
            </p>
            
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 relative z-10">
              <div className="flex-1 relative group">
                <div className="absolute inset-0 bg-white/5 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 group-hover:text-white transition-colors duration-300" size={18} />
                  <Input
                    type="email"
                    placeholder="Your email address"
                    className="h-14 bg-white/10 border-white/20 text-white placeholder:text-white/60 pl-12 rounded-xl focus:border-white/50 focus:ring focus:ring-white/10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <Button 
                type="submit" 
                className="h-14 bg-gradient-to-r from-[#333333] to-[#222222] text-white font-semibold px-8 rounded-xl flex items-center justify-center group hover:shadow-xl transition-all duration-300"
                disabled={isLoading}
              >
                <span>{isLoading ? "Processing..." : "Request Early Access"}</span>
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={18} />
              </Button>
            </form>
            <p className="text-sm text-[#F5F5F5] opacity-70 mt-4">
              We respect your inbox. No spam — only launch updates & early access opportunities.
            </p>
            
            {/* Decorative elements */}
            <div className="absolute top-8 right-8 w-16 h-16 rounded-full bg-white/5 blur-xl"></div>
            <div className="absolute bottom-12 left-12 w-12 h-12 rounded-full bg-white/5 blur-lg"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
