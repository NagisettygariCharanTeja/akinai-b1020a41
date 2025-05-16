
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
      description: "Use multiple AI threads side by side. Compare ideas, plan projects, or talk with two different personas all in one view. Imagine ChatGPT meets your personal workspace and they work together."
    },
    {
      icon: <Pin size={28} />,
      emoji: "📌",
      title: "Pin-a-Prompt",
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
      <div className="absolute top-40 right-0 w-96 h-96 bg-[#403E43]/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-40 left-0 w-80 h-80 bg-[#403E43]/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="container">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-shadow-lg relative inline-block">
            Key Features
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-black to-transparent"></span>
          </h2>
          <p className="text-xl text-[#F5F5F5] max-w-3xl mx-auto">Designed to enhance your cognitive abilities and productivity</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div key={index} className="group perspective transform transition-all duration-500 hover:translate-y-[-10px]">
              <div className="frost-glass p-10 rounded-2xl h-full transition-all duration-300 border border-white/10 group-hover:border-white/30 transform group-hover:shadow-2xl relative">
                {/* Subtle animated background */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="flex items-center mb-6 relative z-10">
                  <div className="mr-4 p-4 rounded-xl bg-gradient-to-r from-[#403E43]/20 to-[#222222]/20 backdrop-blur-sm group-hover:from-[#403E43]/40 group-hover:to-[#222222]/40 transition-all duration-300 shadow-lg">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold">{feature.title}</h3>
                </div>
                <p className="text-lg text-[#F5F5F5] relative z-10 leading-relaxed">{feature.description}</p>
                <div className="mt-8 w-12 h-1 bg-gradient-to-r from-[#403E43] to-[#222222] rounded-full group-hover:w-24 transition-all duration-700"></div>
                
                {/* Decorative circle */}
                <div className="absolute bottom-4 right-4 w-16 h-16 bg-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
