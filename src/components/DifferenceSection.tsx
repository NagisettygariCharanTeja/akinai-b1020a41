
import React from 'react';
import { Heart, Terminal, Shield, Smile } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const differenceItems = [
  {
    icon: <Heart className="h-6 w-6" />,
    title: "Emotionally Tuned Dialog",
    description: "AkinAI reads between the lines to understand not just what you say, but how you feel. It adapts its responses to match your emotional state.",
    color: "from-pink-500/20 to-red-500/20"
  },
  {
    icon: <Terminal className="h-6 w-6" />,
    title: "Developer-Ready API",
    description: "Integrate AkinAI's capabilities into your applications with our comprehensive API. Build emotion-aware, context-rich experiences.",
    color: "from-blue-500/20 to-cyan-500/20"
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Secure & Private by Design",
    description: "Your conversations stay private. AkinAI employs end-to-end encryption and gives you control over your data.",
    color: "from-green-500/20 to-emerald-500/20"
  },
  {
    icon: <Smile className="h-6 w-6" />,
    title: "Custom Personality Modes",
    description: "Choose how AkinAI interacts with you—professional, friendly, or creative. Find the perfect fit for every situation.",
    color: "from-yellow-500/20 to-orange-500/20"
  }
];

const DifferenceSection = () => {
  return (
    <section id="why-different" className="bg-white dark:bg-gray-800">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-akin-purple">Why AkinAI is Different</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We've reimagined what an AI assistant can be, focusing on human connection, understanding, and practical utility.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {differenceItems.map((item, index) => (
            <Card key={index} className="overflow-hidden border-none shadow-lg transition-all hover:shadow-xl">
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-30`} />
              <CardHeader className="relative pb-2">
                <div className="flex items-center mb-2">
                  <div className="p-2 rounded-full bg-akin-purple/10 text-akin-purple mr-3">
                    {item.icon}
                  </div>
                  <CardTitle>{item.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="relative">
                <CardDescription className="text-base text-gray-700 dark:text-gray-300">
                  {item.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 bg-gradient-to-r from-akin-purple/5 to-akin-blue/5 rounded-2xl p-6 md:p-10">
          <h3 className="text-2xl font-bold mb-6 text-center">Real Use Cases</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
              <h4 className="font-semibold text-lg mb-3">Student Buddy</h4>
              <p className="text-gray-600 dark:text-gray-300">
                A personalized learning companion that adapts to your study style, encourages progress, and helps overcome academic challenges.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
              <h4 className="font-semibold text-lg mb-3">Mental Health Companion</h4>
              <p className="text-gray-600 dark:text-gray-300">
                A supportive presence that provides emotional check-ins, mindfulness practices, and gentle accountability for well-being.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
              <h4 className="font-semibold text-lg mb-3">Productivity Assistant</h4>
              <p className="text-gray-600 dark:text-gray-300">
                An intelligent partner that helps manage tasks, facilitate decision-making, and optimize your workflow with personalized insights.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DifferenceSection;
