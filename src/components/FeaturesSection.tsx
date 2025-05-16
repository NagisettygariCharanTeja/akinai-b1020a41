
import React from 'react';
import { 
  LayoutGrid, 
  Users, 
  Pin,
  Moon, 
  SquareSplitVertical
} from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: <SquareSplitVertical size={28} />,
      emoji: "🔲",
      title: "Split Screen Multitasking",
      description: "Use multiple AI threads side-by-side. Compare ideas, plan projects, or talk with two different personas — all in one view. Imagine ChatGPT meets your personal workspace — and they work together."
    },
    {
      icon: <Users size={28} />,
      emoji: "👥",
      title: "Multiple User Profiles",
      description: "Switch between different roles and states of mind — effortlessly. Whether you're a student, a founder, a designer, or just browsing — AkinAI adapts. One AI. Multiple yous. Each with its own memory, tone, and focus."
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
    <section id="features" className="pt-10 pb-32">
      <div className="container">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Key Features</h2>
        </div>
        
        <div className="space-y-16">
          {features.map((feature, index) => (
            <div key={index} className="max-w-3xl">
              <div className="text-2xl mb-2">{feature.emoji}</div>
              <h3 className="text-2xl md:text-3xl font-bold mb-3">{feature.title}</h3>
              <p className="text-lg text-[#F5F5F5]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
