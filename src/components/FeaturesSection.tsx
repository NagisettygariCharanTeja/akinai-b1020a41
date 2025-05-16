
import React from 'react';
import { 
  SquareSplitVertical,
  Pin,
  Moon
} from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: <SquareSplitVertical size={28} />,
      emoji: "🔲",
      title: "Split Screen Multitasking",
      description: "Use multiple AI threads side by side. Compare ideas, plan projects, or talk with two different personas — all in one view. Imagine ChatGPT meets your personal workspace — and they work together."
    },
    {
      icon: <Pin size={28} />,
      emoji: "📌",
      title: "Pin a Prompt",
      description: "Got a mantra, plan, or question you want to keep in sight? Pin it. Set how long it stays visible. Stay focused without retyping. Think of it like sticky notes for your digital brain."
    },
    {
      icon: <Moon size={28} />,
      emoji: "🌙",
      title: "Dream Mode",
      description: "AkinAI \"dreams\" when you're away. It scans your previous interactions and generates: What to prioritize tomorrow, creative ideas based on patterns and habits, subtle reminders you may have forgotten. Like an AI that reflects while you sleep."
    }
  ];

  return (
    <section id="features" className="pt-24 pb-32 relative overflow-hidden">
      <div className="absolute top-40 right-0 w-96 h-96 bg-[#403E43]/5 rounded-full blur-3xl z-10"></div>
      <div className="absolute bottom-40 left-0 w-80 h-80 bg-[#403E43]/5 rounded-full blur-3xl z-10"></div>
      
      <div className="container">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Key Features</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div key={index} className="group">
              <div className="bg-black/10 backdrop-blur-sm p-8 rounded-xl border border-white/10 h-full transition-all duration-300 hover:border-[#403E43]/30 hover:bg-black/20">
                <div className="flex items-center mb-6">
                  <div className="mr-4 p-3 rounded-lg bg-gradient-to-r from-[#403E43]/20 to-[#222222]/20 backdrop-blur-sm group-hover:from-[#403E43]/30 group-hover:to-[#222222]/30 transition-all duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold">{feature.title}</h3>
                </div>
                <p className="text-lg text-[#F5F5F5]">{feature.description}</p>
                <div className="mt-6 w-12 h-1 bg-gradient-to-r from-[#403E43] to-[#222222] rounded-full group-hover:w-24 transition-all duration-300"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
