import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Minimize2, Maximize2, Send, Sparkles, Star, Zap, Image, Download, Trash2, Search, Moon, Sun, Plus, Menu, Pin, MoreVertical } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

interface Message {
  content: string;
  isUser: boolean;
  isPinned?: boolean;
  pinnedUntil?: Date | null; // null means forever
}

interface ChatCard {
  id: string;
  title: string;
  icon: React.ReactNode;
  messages: Message[];
}

const Chat = () => {
  const [minimizedCards, setMinimizedCards] = useState<Record<string, boolean>>({});
  const [inputMessage, setInputMessage] = useState('');
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [pinDialogOpen, setPinDialogOpen] = useState(false);
  const [selectedMessageIndex, setSelectedMessageIndex] = useState<number | null>(null);
  const messageRefs = useRef<Record<string, Record<number, HTMLDivElement | null>>>({});
  const [chatCards, setChatCards] = useState<ChatCard[]>([
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

  const handleDoubleClickTitle = (cardId: string, currentTitle: string) => {
    setEditingCardId(cardId);
    setEditingTitle(currentTitle);
  };

  const handleSaveTitle = () => {
    if (editingCardId && editingTitle.trim()) {
      setChatCards(prev => prev.map(card => 
        card.id === editingCardId 
          ? { ...card, title: editingTitle.trim() }
          : card
      ));
      toast.success("Chat title updated");
    }
    setEditingCardId(null);
    setEditingTitle('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveTitle();
    } else if (e.key === 'Escape') {
      setEditingCardId(null);
      setEditingTitle('');
    }
  };

  const handlePinMessage = (cardId: string, messageIndex: number) => {
    setSelectedCardId(cardId);
    setSelectedMessageIndex(messageIndex);
    setPinDialogOpen(true);
  };

  const handlePinWithDuration = (duration: '8hours' | '1week' | 'forever') => {
    if (selectedCardId && selectedMessageIndex !== null) {
      let pinnedUntil: Date | null = null;
      
      if (duration === '8hours') {
        pinnedUntil = new Date(Date.now() + 8 * 60 * 60 * 1000);
      } else if (duration === '1week') {
        pinnedUntil = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      }
      // forever = null (default)

      setChatCards(prev => prev.map(card => {
        if (card.id === selectedCardId) {
          const updatedMessages = [...card.messages];
          updatedMessages[selectedMessageIndex] = {
            ...updatedMessages[selectedMessageIndex],
            isPinned: true,
            pinnedUntil
          };
          return { ...card, messages: updatedMessages };
        }
        return card;
      }));

      const durationText = duration === 'forever' ? 'forever' : duration === '8hours' ? '8 hours' : '1 week';
      toast.success(`Message pinned for ${durationText}`);
    }
    setPinDialogOpen(false);
    setSelectedMessageIndex(null);
  };

  const handleUnpinMessage = (cardId: string, messageIndex: number) => {
    setChatCards(prev => prev.map(card => {
      if (card.id === cardId) {
        const updatedMessages = [...card.messages];
        updatedMessages[messageIndex] = {
          ...updatedMessages[messageIndex],
          isPinned: false,
          pinnedUntil: undefined
        };
        return { ...card, messages: updatedMessages };
      }
      return card;
    }));
    toast.success("Message unpinned");
  };

  const scrollToMessage = (cardId: string, messageIndex: number) => {
    const messageRef = messageRefs.current[cardId]?.[messageIndex];
    if (messageRef) {
      messageRef.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Add a brief highlight effect
      messageRef.style.backgroundColor = isDarkMode ? '#1e40af' : '#bfdbfe';
      setTimeout(() => {
        messageRef.style.backgroundColor = '';
      }, 1000);
    }
  };

  const isMessagePinned = (message: Message) => {
    if (!message.isPinned) return false;
    if (!message.pinnedUntil) return true; // forever
    return new Date() < message.pinnedUntil;
  };

  const filteredCards = chatCards.filter(card => 
    card.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate layout based on minimized cards
  const maximizedCards = filteredCards.filter(card => !minimizedCards[card.id]);
  const minimizedCardsList = filteredCards.filter(card => minimizedCards[card.id]);
  const hasOnlyOneMaximized = maximizedCards.length === 1;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.05,
        delayChildren: 0.1 
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    }
  };

  const minimizedTabVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 10
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 400,
        damping: 25,
        mass: 0.8
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      y: -10,
      transition: { 
        duration: 0.2,
        ease: "easeInOut"
      }
    }
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
              className={isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-700' : 'text-gray-600 hover:bg-gray-100'}
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
                  isDarkMode ? 'text-slate-300 hover:text-white hover:bg-slate-700' : 'text-gray-700 hover:bg-gray-100'
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
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(true)}
              className={`${isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-700' : 'text-gray-600 hover:bg-gray-100'}`}
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
              className={isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-700' : 'text-gray-600 hover:bg-gray-100'}
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
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportChat}
              className={isDarkMode ? 'border-slate-600 text-blue-400 hover:text-blue-300 hover:bg-slate-700/50' : 'border-gray-300 text-blue-600 hover:text-blue-700 hover:bg-blue-50'}
            >
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearChat}
              className={isDarkMode ? 'border-slate-600 text-red-400 hover:text-red-300 hover:bg-slate-700/50' : 'border-gray-300 text-red-600 hover:text-red-700 hover:bg-red-50'}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Clear
            </Button>
          </motion.div>
        )}

        {/* Maximized Chat Grid */}
        <AnimatePresence mode="wait">
          {maximizedCards.length > 0 && (
            <motion.div 
              className={`grid gap-6 min-h-[600px] transition-all duration-400 ease-out ${
                hasOnlyOneMaximized 
                  ? 'grid-cols-1' 
                  : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              }`}
              variants={containerVariants}
              initial="hidden"
              animate="show"
              layout
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {maximizedCards.map((card, idx) => {
                const pinnedMessages = card.messages.filter((message, index) => isMessagePinned(message)).map((message, originalIndex) => {
                  const actualIndex = card.messages.findIndex(m => m === message);
                  return { message, index: actualIndex };
                });
                
                return (
                  <motion.div 
                    key={card.id} 
                    variants={itemVariants} 
                    whileHover={{ y: -3, transition: { duration: 0.2, ease: "easeOut" } }}
                    className="flex h-full"
                    onClick={() => handleSelectCard(card.id)}
                    layout
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <Card 
                      className={`overflow-hidden shadow-sm border cursor-pointer flex flex-col w-full h-full transition-all duration-300 ease-out ${
                        selectedCardId === card.id 
                          ? (isDarkMode 
                              ? 'ring-2 ring-blue-500/80 bg-slate-800 border-blue-500/50 shadow-lg' 
                              : 'ring-2 ring-blue-500/80 bg-blue-50 border-blue-500/50 shadow-lg')
                          : (isDarkMode 
                              ? 'bg-slate-800/50 border-slate-700 hover:bg-slate-800 hover:shadow-md' 
                              : 'bg-white border-gray-200 hover:bg-gray-50 hover:shadow-md')
                      }`}
                    >
                      <CardHeader className={`flex flex-row items-center justify-between p-4 border-b ${
                        isDarkMode ? 'border-slate-700' : 'border-gray-200'
                      }`}>
                        <div className="flex items-center flex-1">
                          <span className="mr-2">{card.icon}</span>
                          {editingCardId === card.id ? (
                            <Input
                              value={editingTitle}
                              onChange={(e) => setEditingTitle(e.target.value)}
                              onKeyDown={handleKeyPress}
                              onBlur={handleSaveTitle}
                              className={`text-lg font-medium bg-transparent border-none p-0 h-auto focus:ring-0 ${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                              }`}
                              autoFocus
                              onClick={(e) => e.stopPropagation()}
                            />
                          ) : (
                            <CardTitle 
                              className={`text-lg font-medium cursor-pointer ${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                              }`}
                              onDoubleClick={(e) => {
                                e.stopPropagation();
                                handleDoubleClickTitle(card.id, card.title);
                              }}
                            >
                              {card.title}
                            </CardTitle>
                          )}
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleCardState(card.id);
                          }} 
                          className={`transition-colors duration-200 ${isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-700' : 'text-gray-600 hover:bg-gray-100'}`}
                        >
                          <Minimize2 className="h-4 w-4" />
                        </Button>
                      </CardHeader>
                      
                      <CardContent className="p-4 flex-1 flex flex-col">
                        {/* Pinned Messages Section - Sticky at top */}
                        {pinnedMessages.length > 0 && (
                          <div className={`mb-4 p-3 rounded-lg border-l-4 border-yellow-500 ${
                            isDarkMode ? 'bg-yellow-500/10 border-yellow-500/50' : 'bg-yellow-50 border-yellow-500'
                          }`}>
                            <div className="flex items-center mb-2">
                              <Pin className="h-4 w-4 text-yellow-500 mr-2" />
                              <span className={`text-sm font-medium ${isDarkMode ? 'text-yellow-400' : 'text-yellow-700'}`}>
                                Pinned Messages
                              </span>
                            </div>
                            <div className="space-y-2">
                              {pinnedMessages.map(({ message, index }) => (
                                <div 
                                  key={index}
                                  className={`p-2 rounded cursor-pointer transition-colors duration-200 ${
                                    isDarkMode ? 'bg-slate-800/50 hover:bg-slate-700/50 text-slate-200' : 'bg-white hover:bg-gray-50 text-gray-800'
                                  }`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    scrollToMessage(card.id, index);
                                  }}
                                >
                                  <div className="text-sm line-clamp-2">
                                    {message.content}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        <ScrollArea className="h-[500px] w-full flex-1">
                          <div className="space-y-3 pr-4">
                            {card.messages.map((message, idx) => (
                              <motion.div 
                                key={idx} 
                                className={`${message.isUser ? 'text-right' : 'text-left'} group relative`}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ 
                                  delay: idx * 0.05,
                                  duration: 0.3,
                                  ease: "easeOut"
                                }}
                                ref={el => {
                                  if (!messageRefs.current[card.id]) {
                                    messageRefs.current[card.id] = {};
                                  }
                                  messageRefs.current[card.id][idx] = el;
                                }}
                              >
                                <div className={`inline-block p-3 rounded-lg max-w-[85%] relative transition-all duration-200 ease-out ${
                                  message.isUser 
                                    ? 'bg-blue-600 text-white ml-auto' 
                                    : (isDarkMode 
                                        ? 'bg-slate-700 text-white border border-slate-600' 
                                        : 'bg-gray-100 text-gray-900 border border-gray-200')
                                } ${isMessagePinned(message) ? 'ring-2 ring-yellow-500/60' : ''}`}>
                                  {isMessagePinned(message) && (
                                    <Pin className="absolute -top-2 -right-2 h-4 w-4 text-yellow-500 bg-slate-800 rounded-full p-0.5" />
                                  )}
                                  {message.content}
                                </div>
                                {!message.isUser && (
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className={`opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-2 ${
                                          isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-700' : 'text-gray-600 hover:bg-gray-100'
                                        }`}
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        <MoreVertical className="h-3 w-3" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className={isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}>
                                      {isMessagePinned(message) ? (
                                        <DropdownMenuItem
                                          onClick={() => handleUnpinMessage(card.id, idx)}
                                          className={isDarkMode ? 'text-slate-300 hover:text-white hover:bg-slate-700' : 'text-gray-700 hover:bg-gray-100'}
                                        >
                                          <Pin className="h-4 w-4 mr-2" />
                                          Unpin message
                                        </DropdownMenuItem>
                                      ) : (
                                        <DropdownMenuItem
                                          onClick={() => handlePinMessage(card.id, idx)}
                                          className={isDarkMode ? 'text-slate-300 hover:text-white hover:bg-slate-700' : 'text-gray-700 hover:bg-gray-100'}
                                        >
                                          <Pin className="h-4 w-4 mr-2" />
                                          Pin message
                                        </DropdownMenuItem>
                                      )}
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                )}
                              </motion.div>
                            ))}
                          </div>
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Minimized Cards Section - Chrome Tab Style */}
        <AnimatePresence>
          {minimizedCardsList.length > 0 && (
            <motion.div 
              className="mt-8 mb-6"
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="flex flex-wrap gap-2">
                {minimizedCardsList.map((card) => (
                  <motion.div
                    key={`minimized-${card.id}`}
                    variants={minimizedTabVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    layout
                    className="inline-block"
                  >
                    <Card 
                      className={`overflow-hidden shadow-sm border cursor-pointer transition-all duration-200 ease-out hover:shadow-md min-w-[200px] max-w-[280px] ${
                        selectedCardId === card.id 
                          ? (isDarkMode 
                              ? 'ring-2 ring-blue-500/80 bg-slate-800 border-blue-500/50' 
                              : 'ring-2 ring-blue-500/80 bg-blue-50 border-blue-500/50')
                          : (isDarkMode 
                              ? 'bg-slate-800/70 border-slate-700 hover:bg-slate-800' 
                              : 'bg-white border-gray-200 hover:bg-gray-50')
                      }`}
                      onClick={() => handleSelectCard(card.id)}
                    >
                      <CardHeader className={`flex flex-row items-center justify-between p-3 ${
                        isDarkMode ? 'border-slate-700' : 'border-gray-200'
                      }`}>
                        <div className="flex items-center flex-1 min-w-0">
                          <span className="mr-2 flex-shrink-0">{card.icon}</span>
                          {editingCardId === card.id ? (
                            <Input
                              value={editingTitle}
                              onChange={(e) => setEditingTitle(e.target.value)}
                              onKeyDown={handleKeyPress}
                              onBlur={handleSaveTitle}
                              className={`text-sm font-medium bg-transparent border-none p-0 h-auto focus:ring-0 flex-1 min-w-0 ${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                              }`}
                              autoFocus
                              onClick={(e) => e.stopPropagation()}
                            />
                          ) : (
                            <CardTitle 
                              className={`text-sm font-medium cursor-pointer truncate flex-1 min-w-0 ${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                              }`}
                              onDoubleClick={(e) => {
                                e.stopPropagation();
                                handleDoubleClickTitle(card.id, card.title);
                              }}
                            >
                              {card.title}
                            </CardTitle>
                          )}
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleCardState(card.id);
                          }} 
                          className={`ml-2 h-6 w-6 flex-shrink-0 transition-colors duration-200 ${isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-700' : 'text-gray-600 hover:bg-gray-100'}`}
                        >
                          <Maximize2 className="h-3 w-3" />
                        </Button>
                      </CardHeader>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input Field */}
        <motion.div 
          className="mt-8"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
        >
          <div className={`border rounded-xl p-4 shadow-sm transition-all duration-200 ${
            isDarkMode 
              ? 'bg-slate-800/50 border-slate-700' 
              : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center space-x-2">
              <Input 
                className={`flex-1 border-0 bg-transparent focus:ring-0 h-12 transition-all duration-200 ${
                  isDarkMode ? 'text-white placeholder:text-gray-400' : 'text-gray-900'
                } ${!selectedCardId ? 'opacity-70' : ''}`}
                placeholder={selectedCardId 
                  ? `Type in "${chatCards.find(card => card.id === selectedCardId)?.title}" chat...` 
                  : "Select a chat first..."}
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
                className={`h-12 transition-all duration-200 ${
                  isDarkMode ? 'border-slate-600 text-green-400 hover:text-green-300 hover:bg-slate-700/50' : 'border-gray-300 text-green-600 hover:text-green-700 hover:bg-green-50'
                } ${!selectedCardId ? 'opacity-70' : ''}`}
              >
                <Image className="h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                onClick={handleSendMessage}
                disabled={!selectedCardId}
                className={`bg-blue-600 hover:bg-blue-700 text-white h-12 transition-all duration-200 ${
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
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4, ease: "easeOut" }}
        >
          {['#assignment', '#travel', '#food', '#ideas'].map((tag, idx) => (
            <Button 
              key={tag}
              variant="outline" 
              className={`transition-all duration-200 ${
                isDarkMode 
                  ? 'bg-slate-800/50 text-slate-300 border-slate-600 hover:text-white hover:bg-slate-700/50' 
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
          transition={{ delay: 0.6, duration: 0.4, ease: "easeOut" }}
        >
          {['Tasks Completed', 'Premium Credits', 'Response Time', 'Satisfaction'].map((stat, i) => (
            <motion.div 
              key={stat} 
              className={`rounded-xl p-4 text-center border transition-all duration-200 hover:shadow-md ${
                isDarkMode 
                  ? 'bg-slate-800/50 border-slate-700' 
                  : 'bg-white border-gray-200'
              }`}
              whileHover={{ scale: 1.02, transition: { duration: 0.2, ease: "easeOut" } }}
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 + i * 0.05, duration: 0.3, ease: "easeOut" }}
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

      {/* Pin Message Dialog */}
      <Dialog open={pinDialogOpen} onOpenChange={setPinDialogOpen}>
        <DialogContent className={isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}>
          <DialogHeader>
            <DialogTitle className={isDarkMode ? 'text-white' : 'text-gray-900'}>
              Pin Message
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`}>
              How long would you like to pin this message?
            </p>
            <div className="space-y-2">
              <Button
                onClick={() => handlePinWithDuration('8hours')}
                variant="outline"
                className={`w-full justify-start transition-all duration-200 ${
                  isDarkMode 
                    ? 'border-slate-600 text-orange-400 hover:text-orange-300 hover:bg-orange-500/10 hover:border-orange-400' 
                    : 'border-gray-300 text-orange-600 hover:text-orange-700 hover:bg-orange-50 hover:border-orange-400'
                }`}
              >
                ⏰ 8 Hours
              </Button>
              <Button
                onClick={() => handlePinWithDuration('1week')}
                variant="outline"
                className={`w-full justify-start transition-all duration-200 ${
                  isDarkMode 
                    ? 'border-slate-600 text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 hover:border-purple-400' 
                    : 'border-gray-300 text-purple-600 hover:text-purple-700 hover:bg-purple-50 hover:border-purple-400'
                }`}
              >
                📅 1 Week
              </Button>
              <Button
                onClick={() => handlePinWithDuration('forever')}
                variant="outline"
                className={`w-full justify-start transition-all duration-200 ${
                  isDarkMode 
                    ? 'border-slate-600 text-yellow-400 hover:text-yellow-300 hover:bg-yellow-500/10 hover:border-yellow-400' 
                    : 'border-gray-300 text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 hover:border-yellow-400'
                }`}
              >
                ♾️ Forever
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Chat;
