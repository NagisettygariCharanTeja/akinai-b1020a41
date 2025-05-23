
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Minimize2, Maximize2, Send, Sparkles, Star, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const Chat = () => {
  const [minimizedCards, setMinimizedCards] = useState<Record<string, boolean>>({});
  const [showConnections, setShowConnections] = useState(false);

  useEffect(() => {
    // Animate neural connections
    setTimeout(() => setShowConnections(true), 800);
    
    // Welcome toast
    setTimeout(() => {
      toast.success("Welcome to AkinAI Premium", {
        description: "Your AI assistant is ready to help",
        icon: <Star className="h-4 w-4 text-yellow-400" />
      });
    }, 1000);
  }, []);

  const toggleCardState = (cardId: string) => {
    setMinimizedCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  const chatCards = [
    {
      id: 'assignment',
      title: 'Assignment Help',
      icon: <Sparkles className="h-5 w-5 text-yellow-400" />,
      messages: [
        { content: 'I need help with my English Literature essay on the parallels between modern politics and Orwell\'s 1984.', isUser: true },
        { content: 'Great topic choice! Let\'s break this down:', isUser: false },
        { content: '• Compare surveillance themes with modern data collection', isUser: false },
        { content: '• Analyze "doublethink" in contemporary political discourse', isUser: false },
        { content: '• Examine language manipulation ("Newspeak") in today\'s media', isUser: false },
        { content: 'Would you like me to help you develop any of these points further?', isUser: false }
      ]
    },
    {
      id: 'trip',
      title: 'Bangkok Trip',
      icon: <Star className="h-5 w-5 text-purple-400" />,
      messages: [
        { content: 'I\'m planning a trip to Bangkok next month. What are some must-see places?', isUser: true },
        { content: 'Here\'s what I recommend for Bangkok:', isUser: false },
        { content: '• Grand Palace & Wat Phra Kaew - Historic royal complex', isUser: false },
        { content: '• Chatuchak Weekend Market - Massive outdoor shopping', isUser: false },
        { content: '• Wat Arun - Iconic temple on the river', isUser: false },
        { content: '• Try street food on Yaowarat Road (Chinatown)', isUser: false },
        { content: 'When exactly are you going? I can check for any special events happening then!', isUser: false }
      ]
    },
    {
      id: 'meal',
      title: 'Meal Ideas',
      icon: <Zap className="h-5 w-5 text-blue-400" />,
      messages: [
        { content: 'I need meal ideas for the week that are healthy and quick to prepare.', isUser: true },
        { content: 'Here are some quick, healthy meal ideas:', isUser: false },
        { content: '• Overnight oats with fruit and nuts', isUser: false },
        { content: '• Sheet pan chicken with roasted vegetables', isUser: false },
        { content: '• Greek yogurt bowls with honey and berries', isUser: false },
        { content: '• Quinoa salad with mixed vegetables and chickpeas', isUser: false },
        { content: 'Would you like specific recipes for any of these?', isUser: false }
      ]
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#685B60] to-[#322e30] font-dm-sans pt-24 pb-16 px-4 md:px-6 relative overflow-hidden">
      {/* Neural network background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute w-full h-full bg-neural-pattern"></div>
      </div>
      
      {/* Animated connections */}
      {showConnections && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-gradient-to-r from-akin-purple/20 to-akin-blue/20 h-0.5 rounded-full"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: '30%', opacity: 0.5 }}
              transition={{ 
                duration: 2, 
                delay: i * 0.3,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut'
              }}
              style={{
                top: `${20 + i * 8}%`,
                left: `${i % 2 === 0 ? 5 : 65}%`,
                transformOrigin: i % 2 === 0 ? 'left' : 'right'
              }}
            />
          ))}
        </div>
      )}

      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-akin-purple/10 to-akin-blue/10 blur-xl"
            animate={{
              x: [0, 30, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              repeatType: 'mirror',
              ease: 'easeInOut',
              delay: i * 2
            }}
            style={{
              top: `${10 + i * 15}%`,
              left: `${10 + i * 18}%`,
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <motion.div 
          className="flex justify-between items-center mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-akin-purple via-akin-electric-purple to-akin-blue blur-sm opacity-70"></div>
              <h1 className="relative text-3xl font-bold text-white">AkinAI</h1>
            </div>
            <span className="bg-white/10 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">PREMIUM</span>
          </div>
          <Button 
            className="bg-gradient-to-r from-akin-purple to-akin-electric-purple hover:bg-akin-electric-purple text-white shadow-lg shadow-akin-purple/20 border border-white/10 backdrop-blur-sm"
            onClick={() => toast.success("Creating new task...")}
          >
            <Sparkles className="h-4 w-4 mr-1" />
            New Task
          </Button>
        </motion.div>

        {/* Chat Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {chatCards.map((card, idx) => (
            <motion.div 
              key={card.id} 
              variants={itemVariants}
              transition={{ duration: 0.4, delay: idx * 0.1 + 0.3 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Card className="bg-white/5 backdrop-blur-md border-white/10 text-white overflow-hidden shadow-xl shadow-black/5 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-akin-purple/5 to-akin-blue/5 rounded-lg opacity-30"></div>
                <CardHeader className="flex flex-row items-center justify-between p-4 bg-black/20 border-b border-white/5">
                  <div className="flex items-center">
                    <span className="mr-2">{card.icon}</span>
                    <CardTitle className="text-lg font-medium text-white">{card.title}</CardTitle>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleCardState(card.id)}
                    className="text-white hover:bg-white/10"
                  >
                    {minimizedCards[card.id] ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                  </Button>
                </CardHeader>
                
                {!minimizedCards[card.id] && (
                  <>
                    <CardContent className="p-4 space-y-3">
                      {card.messages.map((message, idx) => (
                        <motion.div 
                          key={idx} 
                          className={`${message.isUser ? 'text-right' : 'text-left'}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                        >
                          <div 
                            className={`inline-block p-3 rounded-lg max-w-[85%] ${
                              message.isUser 
                                ? 'bg-gradient-to-r from-akin-purple to-akin-electric-purple text-white ml-auto' 
                                : 'bg-white/10 text-white border border-white/5'
                            }`}
                          >
                            {message.content}
                          </div>
                        </motion.div>
                      ))}
                    </CardContent>
                    <CardFooter className="p-4 border-t border-white/10">
                      <div className="flex w-full items-center space-x-2">
                        <Input 
                          className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-sm focus:ring-2 focus:ring-akin-purple/50"
                          placeholder="Type a message..."
                        />
                        <Button size="icon" className="bg-gradient-to-r from-akin-purple to-akin-electric-purple hover:bg-akin-electric-purple text-white shadow-lg shadow-akin-purple/20">
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardFooter>
                  </>
                )}
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Tags Section */}
        <motion.div 
          className="mt-8 flex flex-wrap gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-yellow-400 mr-2"></span>
            #assignment
          </Button>
          <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-purple-400 mr-2"></span>
            #travel
          </Button>
          <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-blue-400 mr-2"></span>
            #food
          </Button>
          <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-green-400 mr-2"></span>
            #ideas
          </Button>
        </motion.div>
        
        {/* Stats cards */}
        <motion.div 
          className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {['Tasks Completed', 'Premium Credits', 'Response Time', 'Satisfaction'].map((stat, i) => (
            <motion.div 
              key={stat} 
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 text-center"
              whileHover={{ 
                scale: 1.03, 
                boxShadow: "0 10px 30px -10px rgba(58, 12, 163, 0.3)",
                transition: { duration: 0.2 }
              }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 + i * 0.1 }}
            >
              <div className="text-sm text-white/70">{stat}</div>
              <div className="text-2xl font-bold text-white mt-1">
                {i === 0 ? '27' : i === 1 ? '850' : i === 2 ? '1.2s' : '98%'}
              </div>
              <div className="text-xs text-white/50 mt-1">
                {i === 0 ? '+5 this week' : i === 1 ? '150 remaining' : i === 2 ? 'Avg. response' : 'User rating'}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Chat;
