
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Minimize2, Maximize2, Send } from 'lucide-react';

const Chat = () => {
  const [minimizedCards, setMinimizedCards] = useState<Record<string, boolean>>({});

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

  return (
    <div className="min-h-screen bg-[#685B60] font-dm-sans pt-24 pb-16 px-4 md:px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">AkinAI</h1>
          <Button className="bg-akin-purple hover:bg-akin-electric-purple text-white">
            New Task
          </Button>
        </div>

        {/* Chat Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chatCards.map((card) => (
            <Card key={card.id} className={`bg-white/10 backdrop-blur-sm border-white/10 text-white overflow-hidden ${minimizedCards[card.id] ? 'h-auto' : 'h-auto'}`}>
              <CardHeader className="flex flex-row items-center justify-between p-4 bg-black/20">
                <CardTitle className="text-lg font-medium text-white">{card.title}</CardTitle>
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
                      <div 
                        key={idx} 
                        className={`${message.isUser ? 'text-right' : 'text-left'}`}
                      >
                        <div 
                          className={`inline-block p-3 rounded-lg max-w-[85%] ${
                            message.isUser 
                              ? 'bg-akin-purple text-white ml-auto' 
                              : 'bg-white/10 text-white'
                          }`}
                        >
                          {message.content}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter className="p-4 border-t border-white/10">
                    <div className="flex w-full items-center space-x-2">
                      <Input 
                        className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        placeholder="Type a message..."
                      />
                      <Button size="icon" className="bg-akin-purple hover:bg-akin-electric-purple text-white">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardFooter>
                </>
              )}
            </Card>
          ))}
        </div>

        {/* Tags Section */}
        <div className="mt-8 flex flex-wrap gap-2">
          <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
            #assignment
          </Button>
          <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
            #travel
          </Button>
          <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
            #food
          </Button>
          <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
            #ideas
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
