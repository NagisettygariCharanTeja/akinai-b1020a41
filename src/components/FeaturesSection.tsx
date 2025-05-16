
import React, { useEffect, useRef } from 'react';
import { BrainCircuit, Memory, Smartphone, HeartHandshake, Fingerprint, Code } from 'lucide-react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description, delay }) => {
  const featureRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('opacity-100', 'translate-y-0');
          }, delay);
        }
      },
      { threshold: 0.1 }
    );
    
    if (featureRef.current) {
      observer.observe(featureRef.current);
    }
    
    return () => {
      if (featureRef.current) {
        observer.unobserve(featureRef.current);
      }
    };
  }, [delay]);
  
  return (
    <div 
      ref={featureRef} 
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 
        transition-all duration-700 opacity-0 translate-y-10"
    >
      <div className="w-14 h-14 mb-6 rounded-full bg-akin-purple/10 flex items-center justify-center text-akin-purple">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      icon: <BrainCircuit size={28} />,
      title: "Conversational Intelligence",
      description: "AkinAI understands context, remembers details, and engages in meaningful dialog that evolves over time.",
      delay: 0
    },
    {
      icon: <Memory size={28} />,
      title: "Memory-Powered Conversations",
      description: "Unlike standard assistants, AkinAI remembers your previous interactions and builds on shared knowledge.",
      delay: 100
    },
    {
      icon: <Smartphone size={28} />,
      title: "Multimodal Input",
      description: "Communicate through text, voice, or images, giving you flexibility in how you interact with the AI.",
      delay: 200
    },
    {
      icon: <HeartHandshake size={28} />,
      title: "Emotional Awareness",
      description: "AkinAI recognizes emotional cues and responds with appropriate empathy and understanding.",
      delay: 300
    },
    {
      icon: <Fingerprint size={28} />,
      title: "Personalized Experience",
      description: "The more you interact, the more AkinAI adapts to your preferences, interests, and communication style.",
      delay: 400
    },
    {
      icon: <Code size={28} />,
      title: "Cross-Platform Functionality",
      description: "Access AkinAI across all your devices with seamless synchronization and consistent experience.",
      delay: 500
    }
  ];

  return (
    <section id="features" className="bg-gray-50 dark:bg-gray-900">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-akin-purple">Key Features</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            AkinAI combines cutting-edge technology with a human-centered design to create a truly intelligent assistant.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Feature 
              key={index} 
              icon={feature.icon} 
              title={feature.title} 
              description={feature.description} 
              delay={feature.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
