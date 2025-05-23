
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Minimize2, Maximize2, Send, Sparkles, Star, Zap, Image, Download, Trash2, Search, Moon, Sun, Plus, Menu } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const Chat = () => {
  const [minimizedCards, setMinimizedCards] = useState<Record<string, boolean>>({});
  const [inputMessage, setInputMessage] = useState('');
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatCards, setChatCards] = useState([
    {
      id: 'assignment',
      title: 'Assignment Help',
      icon: <Sparkles className="h-5 w-5 text-blue-500" />,
      messages: [{
        content: 'I need help with my English Literature essay on the parallels between modern politics and Orwell\'s 1984.',
        isUser: true
      }, {
        content: 'Great topic choice! Let\'s break this down:',
        isUser: false
      }, {
        content: '• Compare surveillance themes with modern data collection',
        isUser: false
      }, {
        content: '• Analyze "doublethink" in contemporary political discourse',
        isUser: false
      }, {
        content: '• Examine language manipulation ("Newspeak") in today\'s media',
        isUser: false
      }, {
        content: 'Would you like me to help you develop any of these points further?',
        isUser: false
      }]
    }, 
    {
      id: 'trip',
      title: 'Bangkok Trip',
      icon: <Star className="h-5 w-5 text-green-500" />,
      messages: [{
        content: 'I\'m planning a trip to Bangkok next month. What are some must-see places?',
        isUser: true
      }, {
        content: 'Here\'s what I recommend for Bangkok:',
        isUser: false
      }, {
        content: '• Grand Palace & Wat Phra Kaew - Historic royal complex',
        isUser: false
      }, {
        content: '• Chatuchak Weekend Market - Massive outdoor shopping',
        isUser: false
      }, {
        content: '• Wat Arun - Iconic temple on the river',
        isUser: false
      }, {
        content: '• Try street food on Yaowarat Road (Chinatown)',
        isUser: false
      }, {
        content: 'When exactly are you going? I can check for any special events happening then!',
        isUser: false
      }]
    }, 
    {
      id: 'meal',
      title: 'Meal Ideas',
      icon: <Zap className="h-5 w-5 text-purple-500" />,
      messages: [{
        content: 'I need meal ideas for the week that are healthy and quick to prepare.',
        isUser: true
      }, {
        content: 'Here are some quick, healthy meal ideas:',
        isUser: false
      }, {
        content: '• Overnight oats with fruit and nuts',
        isUser: false
      }, {
        content: '• Sheet pan chicken with roasted vegetables',
        isUser: false
      }, {
        content: '• Greek yogurt bowls with honey and berries',
        isUser: false
      }, {
        content: '• Quinoa salad with mixed vegetables and chickpeas',
        isUser: false
      }, {
        content: 'Would you like specific recipes for any of these?',
        isUser: false
      }]
    }
  ]);

  const chatTemplates = [
    { name: 'Study Help', prompt: 'I need help studying for...' },
    { name: 'Trip Planning', prompt: 'Help me plan a trip to...' },
    { name: 'Recipe Ideas', prompt: 'I need healthy meal ideas for...' },
    { name: 'Work Project', prompt: 'I need assistance with my work project about...' }
  ];

  useEffect(() => {
    setTimeout(() => {
      toast.success("Welcome to AkinAI Premium", {
        description: "Your AI assistant is ready to help",
        icon: <Star className="h-4 w-4 text-blue-500" />
      });
    }, 1000);

    setSelectedCardId('assignment');
  }, []);

  const toggleCardState = (cardId: string) => {
    setMinimizedCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() && selectedCardId) {
      setChatCards(prev => {
        return prev.map(card => {
          if (card.id === selectedCardId) {
            return {
              ...card,
              messages: [
                ...card.messages,
                {
                  content: inputMessage,
                  isUser: true
                }
              ]
            };
          }
          return card;
        });
      });

      toast.info("Message sent", {
        description: "Your message is being processed",
        icon: <Sparkles className="h-4 w-4 text-blue-500" />
      });
      
      setTimeout(() => {
        setChatCards(prev => {
          return prev.map(card => {
            if (card.id === selectedCardId) {
              return {
                ...card,
                messages: [
                  ...card.messages,
                  {
                    content: `Thank you for your message: "${inputMessage}". How can I assist further with this topic?`,
                    isUser: false
                  }
                ]
              };
            }
            return card;
          });
        });
      }, 1000);
      
      setInputMessage('');
    } else if (!selectedCardId) {
      toast.error("No chat selected", {
        description: "Please select a chat first",
      });
    }
  };

  const handleAddImage = () => {
    toast.info("Add Image", {
      description: "Image upload feature coming soon",
      icon: <Image className="h-4 w-4 text-green-500" />
    });
  };

  const handleSelectCard = (cardId: string) => {
    setSelectedCardId(cardId);
  };

  const handleExportChat = () => {
    if (selectedCardId) {
      const selectedChat = chatCards.find(card => card.id === selectedCardId);
      if (selectedChat) {
        const chatData = JSON.stringify(selectedChat, null, 2);
        const blob = new Blob([chatData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${selectedChat.title}-chat.json`;
        a.click();
        toast.success("Chat exported successfully");
      }
    }
  };

  const handleClearChat = () => {
    if (selectedCardId) {
      setChatCards(prev => prev.map(card => 
        card.id === selectedCardId 
          ? { ...card, messages: [] }
          : card
      ));
      toast.success("Chat cleared");
    }
  };

  const handleNewChat = () => {
    const newChatId = `chat-${Date.now()}`;
    const newChat = {
      id: newChatId,
      title: 'New Chat',
      icon: <Sparkles className="h-5 w-5 text-blue-500" />,
      messages: []
    };
    setChatCards(prev => [...prev, newChat]);
    setSelectedCardId(newChatId);
    toast.success("New chat created");
  };

  const filteredCards = chatCards.filter(card => 
    card.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' 
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
    }`}>
      
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-80 transform transition-transform duration-300 z-20 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } ${isDarkMode ? 'bg-slate-800/95' : 'bg-white/95'} backdrop-blur-md border-r ${
        isDarkMode ? 'border-slate-700' : 'border-gray-200'
      }`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Chat Templates
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
              className={isDarkMode ? 'text-white hover:bg-slate-700' : 'text-gray-600 hover:bg-gray-100'}
            >
              ×
            </Button>
          </div>
          
          <div className="space-y-3">
            {chatTemplates.map((template, idx) => (
              <Button
                key={idx}
                variant="ghost"
                className={`w-full justify-start ${
                  isDarkMode ? 'text-white hover:bg-slate-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => {
                  setInputMessage(template.prompt);
                  setSidebarOpen(false);
                }}
              >
                {template.name}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-10"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <motion.div 
          className="flex justify-between items-center mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(true)}
              className={`${isDarkMode ? 'text-white hover:bg-slate-700' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center space-x-3">
              <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                akinAI
              </h1>
              <span className={`text-xs px-2 py-1 rounded-full ${
                isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'
              }`}>
                PREMIUM
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <Input
                placeholder="Search chats..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`pl-10 w-48 ${
                  isDarkMode 
                    ? 'bg-slate-800 border-slate-600 text-white placeholder:text-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={isDarkMode ? 'text-white hover:bg-slate-700' : 'text-gray-600 hover:bg-gray-100'}
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            
            <Button
              onClick={handleNewChat}
              className={`${
                isDarkMode 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              <Plus className="h-4 w-4 mr-1" />
              New Chat
            </Button>
          </div>
        </motion.div>

        {/* Chat Actions */}
        {selectedCardId && (
          <motion.div 
            className="flex justify-end space-x-2 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportChat}
              className={isDarkMode ? 'border-slate-600 text-white hover:bg-slate-700' : 'border-gray-300'}
            >
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearChat}
              className={isDarkMode ? 'border-slate-600 text-white hover:bg-slate-700' : 'border-gray-300'}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Clear
            </Button>
          </motion.div>
        )}

        {/* Chat Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[600px]"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {filteredCards.map((card, idx) => (
            <motion.div 
              key={card.id} 
              variants={itemVariants} 
              whileHover={{ y: -2 }}
              className="flex h-full"
              onClick={() => handleSelectCard(card.id)}
            >
              <Card 
                className={`overflow-hidden shadow-sm border cursor-pointer flex flex-col w-full h-full transition-all duration-200 ${
                  selectedCardId === card.id 
                    ? (isDarkMode 
                        ? 'ring-2 ring-blue-500 bg-slate-800 border-blue-500' 
                        : 'ring-2 ring-blue-500 bg-blue-50 border-blue-500')
                    : (isDarkMode 
                        ? 'bg-slate-800/50 border-slate-700 hover:bg-slate-800' 
                        : 'bg-white border-gray-200 hover:bg-gray-50')
                }`}
              >
                <CardHeader className={`flex flex-row items-center justify-between p-4 border-b ${
                  isDarkMode ? 'border-slate-700' : 'border-gray-200'
                }`}>
                  <div className="flex items-center">
                    <span className="mr-2">{card.icon}</span>
                    <CardTitle className={`text-lg font-medium ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {card.title}
                    </CardTitle>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleCardState(card.id);
                    }} 
                    className={isDarkMode ? 'text-white hover:bg-slate-700' : 'text-gray-600 hover:bg-gray-100'}
                  >
                    {minimizedCards[card.id] ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                  </Button>
                </CardHeader>
                
                {!minimizedCards[card.id] && (
                  <CardContent className="p-4 flex-1">
                    <ScrollArea className="h-[500px] w-full">
                      <div className="space-y-3 pr-4">
                        {card.messages.map((message, idx) => (
                          <motion.div 
                            key={idx} 
                            className={`${message.isUser ? 'text-right' : 'text-left'}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                          >
                            <div className={`inline-block p-3 rounded-lg max-w-[85%] ${
                              message.isUser 
                                ? 'bg-blue-600 text-white ml-auto' 
                                : (isDarkMode 
                                    ? 'bg-slate-700 text-white border border-slate-600' 
                                    : 'bg-gray-100 text-gray-900 border border-gray-200')
                            }`}>
                              {message.content}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                )}
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Input Field */}
        <motion.div 
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className={`border rounded-xl p-4 shadow-sm ${
            isDarkMode 
              ? 'bg-slate-800/50 border-slate-700' 
              : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center space-x-2">
              <Input 
                className={`flex-1 border-0 bg-transparent focus:ring-0 h-12 ${
                  isDarkMode ? 'text-white placeholder:text-gray-400' : 'text-gray-900'
                } ${!selectedCardId ? 'opacity-70' : ''}`}
                placeholder={selectedCardId 
                  ? `Type in "${chatCards.find(card => card.id === selectedCardId)?.title}" chat...` 
                  : "Select a chat first..."
                }
                value={inputMessage}
                onChange={e => setInputMessage(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
                disabled={!selectedCardId}
              />
              <Button 
                size="lg" 
                variant="outline"
                onClick={handleAddImage}
                disabled={!selectedCardId}
                className={`h-12 ${
                  isDarkMode ? 'border-slate-600 text-white hover:bg-slate-700' : 'border-gray-300'
                } ${!selectedCardId ? 'opacity-70' : ''}`}
              >
                <Image className="h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                onClick={handleSendMessage}
                disabled={!selectedCardId}
                className={`bg-blue-600 hover:bg-blue-700 text-white h-12 ${
                  !selectedCardId ? 'opacity-70' : ''
                }`}
              >
                <Send className="h-5 w-5 mr-2" />
                Send
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Tags Section */}
        <motion.div 
          className="mt-8 flex flex-wrap gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          {['#assignment', '#travel', '#food', '#ideas'].map((tag, idx) => (
            <Button 
              key={tag}
              variant="outline" 
              className={`${
                isDarkMode 
                  ? 'bg-slate-800/50 text-white border-slate-600 hover:bg-slate-700' 
                  : 'bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
            >
              <span className={`w-2 h-2 rounded-full mr-2 ${
                idx === 0 ? 'bg-blue-500' : 
                idx === 1 ? 'bg-green-500' : 
                idx === 2 ? 'bg-purple-500' : 'bg-yellow-500'
              }`}></span>
              {tag}
            </Button>
          ))}
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
              className={`rounded-xl p-4 text-center border ${
                isDarkMode 
                  ? 'bg-slate-800/50 border-slate-700' 
                  : 'bg-white border-gray-200'
              }`}
              whileHover={{ scale: 1.02 }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 + i * 0.1 }}
            >
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {stat}
              </div>
              <div className={`text-2xl font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {i === 0 ? '27' : i === 1 ? '850' : i === 2 ? '1.2s' : '98%'}
              </div>
              <div className={`text-xs mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
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
