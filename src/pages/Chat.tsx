import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Minimize2, Maximize2, Send, Sparkles, Star, Zap, Image, Trash2, Plus, Pin, MoreVertical, Settings, MessageSquare, X, Search, Crown, Copy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { MistralSettings } from '@/components/MistralSettings';
import { useMistralChat } from '@/hooks/useMistralChat';
import { useTheme } from '@/contexts/ThemeContext';
import ThemeSelector from '@/components/ThemeSelector';
import FloatingParticles from '@/components/FloatingParticles';
import ChatSearch from '@/components/ChatSearch';

interface Message {
  content: string;
  isUser: boolean;
  isPinned?: boolean;
  pinnedUntil?: Date | null;
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
  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [pinDialogOpen, setPinDialogOpen] = useState(false);
  const [selectedMessageIndex, setSelectedMessageIndex] = useState<number | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const messageRefs = useRef<Record<string, Record<number, HTMLDivElement | null>>>({});
  
  const { currentTheme, getThemeColors } = useTheme();
  const colors = getThemeColors();
  const isDark = currentTheme !== 'opennote';

  const {
    sendMessage,
    isCardLoading,
    isConfigured
  } = useMistralChat();

  // Initialize with one default chat
  const [chatCards, setChatCards] = useState<ChatCard[]>([{
    id: 'new-chat-1',
    title: 'New Chat',
    icon: <MessageSquare className="h-4 w-4 text-violet-400" />,
    messages: []
  }]);

  useEffect(() => {
    setTimeout(() => {
      toast.success("Welcome to AkinAI Premium", {
        description: "Your AI assistant is ready to help",
        icon: <Crown className="h-4 w-4 text-violet-500" />
      });
    }, 1000);
    setSelectedCardId('new-chat-1');
  }, []);

  // Function to generate chat title and icon based on conversation
  const generateChatTitleAndIcon = useCallback((messages: Message[]) => {
    if (messages.length === 0) return {
      title: 'New Chat',
      icon: <MessageSquare className="h-4 w-4 text-violet-400" />
    };
    const firstUserMessage = messages.find(m => m.isUser)?.content.toLowerCase() || '';

    if (firstUserMessage.includes('code') || firstUserMessage.includes('programming') || firstUserMessage.includes('javascript') || firstUserMessage.includes('python')) {
      return {
        title: 'Coding Help',
        icon: <Zap className="h-4 w-4 text-emerald-400" />
      };
    } else if (firstUserMessage.includes('work') || firstUserMessage.includes('business') || firstUserMessage.includes('project')) {
      return {
        title: 'Work Project',
        icon: <Zap className="h-4 w-4 text-purple-400" />
      };
    } else if (firstUserMessage.includes('study') || firstUserMessage.includes('learn') || firstUserMessage.includes('homework') || firstUserMessage.includes('assignment')) {
      return {
        title: 'Study Help',
        icon: <Zap className="h-4 w-4 text-violet-400" />
      };
    } else if (firstUserMessage.includes('travel') || firstUserMessage.includes('trip') || firstUserMessage.includes('vacation')) {
      return {
        title: 'Travel Planning',
        icon: <Zap className="h-4 w-4 text-orange-400" />
      };
    } else if (firstUserMessage.includes('music') || firstUserMessage.includes('song') || firstUserMessage.includes('artist')) {
      return {
        title: 'Music Chat',
        icon: <Zap className="h-4 w-4 text-pink-400" />
      };
    } else if (firstUserMessage.includes('book') || firstUserMessage.includes('read') || firstUserMessage.includes('story')) {
      return {
        title: 'Literature',
        icon: <Zap className="h-4 w-4 text-indigo-400" />
      };
    } else if (firstUserMessage.includes('game') || firstUserMessage.includes('gaming') || firstUserMessage.includes('play')) {
      return {
        title: 'Gaming',
        icon: <Zap className="h-4 w-4 text-red-400" />
      };
    } else if (firstUserMessage.includes('recipe') || firstUserMessage.includes('food') || firstUserMessage.includes('cook')) {
      return {
        title: 'Cooking',
        icon: <Zap className="h-4 w-4 text-yellow-400" />
      };
    } else if (firstUserMessage.includes('love') || firstUserMessage.includes('relationship') || firstUserMessage.includes('dating')) {
      return {
        title: 'Relationship',
        icon: <Zap className="h-4 w-4 text-rose-400" />
      };
    } else {
      const words = firstUserMessage.split(' ').slice(0, 3).join(' ');
      const title = words.length > 20 ? words.substring(0, 20) + '...' : words;
      return {
        title: title || 'General Chat',
        icon: <Zap className="h-4 w-4 text-purple-400" />
      };
    }
  }, []);

  const toggleCardState = useCallback((cardId: string) => {
    setMinimizedCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  }, []);

  const handleDeleteChat = useCallback((cardId: string) => {
    if (chatCards.length === 1) {
      toast.error("Cannot delete the last chat");
      return;
    }
    setChatCards(prev => prev.filter(card => card.id !== cardId));

    if (selectedCardId === cardId) {
      const remainingCards = chatCards.filter(card => card.id !== cardId);
      if (remainingCards.length > 0) {
        setSelectedCardId(remainingCards[0].id);
      }
    }
    toast.success("Chat deleted");
  }, [chatCards.length, selectedCardId, chatCards]);

  const handleSendMessage = useCallback(async () => {
    if (!inputMessage.trim() || !selectedCardId) {
      if (!selectedCardId) {
        toast.error("No chat selected", {
          description: "Please select a chat first"
        });
      }
      return;
    }
    if (!isConfigured()) {
      toast.error("API not configured", {
        description: "Please configure your API settings first"
      });
      setSettingsOpen(true);
      return;
    }

    if (isCardLoading(selectedCardId)) {
      toast.error("Chat is busy", {
        description: "Please wait for the current response to complete"
      });
      return;
    }

    setChatCards(prev => {
      return prev.map(card => {
        if (card.id === selectedCardId) {
          return {
            ...card,
            messages: [...card.messages, {
              content: inputMessage,
              isUser: true
            }]
          };
        }
        return card;
      });
    });
    const userInput = inputMessage;
    setInputMessage('');
    try {
      const currentCard = chatCards.find(card => card.id === selectedCardId);
      const conversationHistory = currentCard?.messages || [];

      const response = await sendMessage(userInput, conversationHistory, selectedCardId);

      setChatCards(prev => {
        return prev.map(card => {
          if (card.id === selectedCardId) {
            const updatedMessages = [...card.messages, {
              content: response,
              isUser: false
            }];

            if (card.title === 'New Chat' && updatedMessages.length >= 2) {
              const {
                title,
                icon
              } = generateChatTitleAndIcon(updatedMessages);
              return {
                ...card,
                title,
                icon,
                messages: updatedMessages
              };
            }
            return {
              ...card,
              messages: updatedMessages
            };
          }
          return card;
        });
      });
    } catch (error) {
      console.error('Failed to get response:', error);
      setChatCards(prev => {
        return prev.map(card => {
          if (card.id === selectedCardId) {
            return {
              ...card,
              messages: card.messages.slice(0, -1)
            };
          }
          return card;
        });
      });
    }
  }, [inputMessage, selectedCardId, isConfigured, isCardLoading, sendMessage, chatCards, generateChatTitleAndIcon]);

  const handleAddImage = useCallback(() => {
    toast.info("Add Image", {
      description: "Image upload feature coming soon",
      icon: <Image className="h-4 w-4 text-emerald-500" />
    });
  }, []);

  const handleSelectCard = useCallback((cardId: string) => {
    setSelectedCardId(cardId);
  }, []);

  const handleClearChat = useCallback((cardId: string) => {
    setChatCards(prev => prev.map(card => card.id === cardId ? {
      ...card,
      messages: [],
      title: 'New Chat',
      icon: <MessageSquare className="h-4 w-4 text-violet-400" />
    } : card));
    toast.success("Chat cleared");
  }, []);

  const handleNewChat = useCallback(() => {
    const newChatId = `new-chat-${Date.now()}`;
    const newChat = {
      id: newChatId,
      title: 'New Chat',
      icon: <MessageSquare className="h-4 w-4 text-violet-400" />,
      messages: []
    };
    setChatCards(prev => [...prev, newChat]);
    setSelectedCardId(newChatId);
    toast.success("New chat created");
  }, []);

  const handleDoubleClickTitle = useCallback((cardId: string, currentTitle: string) => {
    setEditingCardId(cardId);
    setEditingTitle(currentTitle);
  }, []);

  const handleSaveTitle = useCallback(() => {
    if (editingCardId && editingTitle.trim()) {
      setChatCards(prev => prev.map(card => card.id === editingCardId ? {
        ...card,
        title: editingTitle.trim()
      } : card));
      toast.success("Chat title updated");
    }
    setEditingCardId(null);
    setEditingTitle('');
  }, [editingCardId, editingTitle]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveTitle();
    } else if (e.key === 'Escape') {
      setEditingCardId(null);
      setEditingTitle('');
    }
  }, [handleSaveTitle]);

  const handlePinMessage = useCallback((cardId: string, messageIndex: number) => {
    setSelectedCardId(cardId);
    setSelectedMessageIndex(messageIndex);
    setPinDialogOpen(true);
  }, []);

  const handlePinWithDuration = useCallback((duration: '8hours' | '1week' | 'forever') => {
    if (selectedCardId && selectedMessageIndex !== null) {
      let pinnedUntil: Date | null = null;
      if (duration === '8hours') {
        pinnedUntil = new Date(Date.now() + 8 * 60 * 60 * 1000);
      } else if (duration === '1week') {
        pinnedUntil = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      }
      setChatCards(prev => prev.map(card => {
        if (card.id === selectedCardId) {
          const updatedMessages = [...card.messages];
          updatedMessages[selectedMessageIndex] = {
            ...updatedMessages[selectedMessageIndex],
            isPinned: true,
            pinnedUntil
          };
          return {
            ...card,
            messages: updatedMessages
          };
        }
        return card;
      }));
      const durationText = duration === 'forever' ? 'forever' : duration === '8hours' ? '8 hours' : '1 week';
      toast.success(`Message pinned for ${durationText}`);
    }
    setPinDialogOpen(false);
    setSelectedMessageIndex(null);
  }, [selectedCardId, selectedMessageIndex]);

  const handleUnpinMessage = useCallback((cardId: string, messageIndex: number) => {
    setChatCards(prev => prev.map(card => {
      if (card.id === cardId) {
        const updatedMessages = [...card.messages];
        updatedMessages[messageIndex] = {
          ...updatedMessages[messageIndex],
          isPinned: false,
          pinnedUntil: undefined
        };
        return {
          ...card,
          messages: updatedMessages
        };
      }
      return card;
    }));
    toast.success("Message unpinned");
  }, []);

  const handleCopyMessage = useCallback((content: string) => {
    navigator.clipboard.writeText(content);
    toast.success("Message copied to clipboard");
  }, []);

  const handleMessageFound = useCallback((cardId: string, messageIndex: number) => {
    setSelectedCardId(cardId);
    setTimeout(() => {
      const messageRef = messageRefs.current[cardId]?.[messageIndex];
      if (messageRef) {
        messageRef.scrollIntoView({ behavior: 'smooth', block: 'center' });
        messageRef.style.backgroundColor = colors.accent;
        setTimeout(() => {
          messageRef.style.backgroundColor = '';
        }, 1000);
      }
    }, 100);
  }, [colors.accent]);

  const scrollToMessage = useCallback((cardId: string, messageIndex: number) => {
    const messageRef = messageRefs.current[cardId]?.[messageIndex];
    if (messageRef) {
      messageRef.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
      messageRef.style.backgroundColor = '#7c3aed';
      setTimeout(() => {
        messageRef.style.backgroundColor = '';
      }, 1000);
    }
  }, []);

  const isMessagePinned = useCallback((message: Message) => {
    if (!message.isPinned) return false;
    if (!message.pinnedUntil) return true;
    return new Date() < message.pinnedUntil;
  }, []);

  // Calculate layout based on minimized cards
  const maximizedCards = chatCards.filter(card => !minimizedCards[card.id]);
  const minimizedCardsList = chatCards.filter(card => minimizedCards[card.id]);
  const hasOnlyOneMaximized = maximizedCards.length === 1;

  // Get current card loading state
  const currentCardLoading = selectedCardId ? isCardLoading(selectedCardId) : false;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
        delayChildren: 0.02
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
    hidden: { opacity: 0, scale: 0.8, y: 10 },
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
    <div className={`min-h-screen transition-colors duration-300 relative overflow-hidden ${isDark ? `bg-${colors.background}` : `bg-${colors.background}`}`}>
      {/* Floating Particles Background */}
      <FloatingParticles />
      
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] z-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, rgba(139, 92, 246, 0.3) 2px, transparent 0),
                             radial-gradient(circle at 75px 75px, rgba(236, 72, 153, 0.2) 1px, transparent 0)`,
          backgroundSize: '100px 100px'
        }}></div>
      </div>
      
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className={`absolute -top-40 -right-40 w-80 h-80 ${colors.gradient} rounded-full blur-3xl animate-pulse`}></div>
        <div className={`absolute -bottom-40 -left-40 w-80 h-80 ${colors.gradient} rounded-full blur-3xl animate-pulse`} style={{
          animationDelay: '2s'
        }}></div>
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 ${colors.gradient} rounded-full blur-3xl animate-pulse`} style={{
          animationDelay: '4s'
        }}></div>
      </div>
      
      <div className="container mx-auto max-w-7xl px-6 py-6 relative z-10">
        {/* Header */}
        <motion.div 
          className="flex justify-between items-center mb-8" 
          initial={{ y: -20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <h1 className={`text-4xl font-light tracking-tight text-${colors.textPrimary}`}>
                akinAI
              </h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Search Button */}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setSearchOpen(true)}
              className={`rounded-xl border transition-all duration-200 ${
                isDark 
                  ? `text-${colors.textSecondary} hover:text-${colors.textPrimary} hover:bg-${colors.cardBg} border-${colors.border}` 
                  : `text-${colors.textSecondary} hover:text-${colors.textPrimary} hover:bg-gray-100 border-${colors.border}`
              }`}
            >
              <Search className="h-4 w-4" />
            </Button>

            {/* Theme Selector */}
            <ThemeSelector />
            
            {/* Settings Button */}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setSettingsOpen(true)} 
              className={`rounded-xl border transition-all duration-200 ${
                isDark 
                  ? `text-${colors.textSecondary} hover:text-${colors.textPrimary} hover:bg-${colors.cardBg} border-${colors.border}` 
                  : `text-${colors.textSecondary} hover:text-${colors.textPrimary} hover:bg-gray-100 border-${colors.border}`
              }`}
            >
              <Settings className="h-4 w-4" />
            </Button>
            
            {/* New Chat Button */}
            <Button 
              onClick={handleNewChat} 
              className={`bg-gradient-to-r ${colors.primary} hover:shadow-lg text-white rounded-xl font-medium px-6 border-0 transition-all duration-200`}
            >
              <Plus className="h-4 w-4 mr-2" />
              New Chat
            </Button>
          </div>
        </motion.div>

        {/* Maximized Chat Grid */}
        <AnimatePresence>
          {maximizedCards.length > 0 && (
            <motion.div 
              className={`grid gap-6 transition-all duration-200 ease-out ${
                hasOnlyOneMaximized ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              }`} 
              variants={containerVariants} 
              initial="hidden" 
              animate="show" 
              layout 
              transition={{ duration: 0.2, ease: "easeOut" }} 
              style={{ minHeight: 'auto' }}
            >
              {maximizedCards.map((card, idx) => {
                const pinnedMessages = card.messages.filter((message, index) => isMessagePinned(message)).map((message, originalIndex) => {
                  const actualIndex = card.messages.findIndex(m => m === message);
                  return { message, index: actualIndex };
                });
                const cardIsLoading = isCardLoading(card.id);
                
                return (
                  <motion.div 
                    key={card.id} 
                    variants={itemVariants} 
                    whileHover={{
                      y: -4,
                      transition: { duration: 0.2, ease: "easeOut" }
                    }} 
                    className="flex h-full" 
                    onClick={() => handleSelectCard(card.id)} 
                    layout 
                    layoutId={card.id} 
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <Card className={`overflow-hidden border cursor-pointer flex flex-col w-full min-h-[500px] transition-all duration-300 ease-out backdrop-blur-sm ${
                      selectedCardId === card.id 
                        ? `ring-2 ring-${colors.accent}/50 bg-${colors.cardBg} border-${colors.accent}/30 shadow-2xl` 
                        : `bg-${colors.cardBg} border-${colors.border} hover:bg-${colors.cardBg} hover:shadow-xl hover:border-${colors.accent}/20`
                    } rounded-2xl`}>
                      <CardHeader className={`flex flex-row items-center justify-between p-6 border-b border-${colors.border}`}>
                        <div className="flex items-center flex-1">
                          <span className="mr-3">{card.icon}</span>
                          {cardIsLoading && <div className={`animate-spin rounded-full h-4 w-4 border-b-2 border-${colors.accent} mr-3`}></div>}
                          {editingCardId === card.id ? (
                            <Input 
                              value={editingTitle} 
                              onChange={e => setEditingTitle(e.target.value)} 
                              onKeyDown={handleKeyPress} 
                              onBlur={handleSaveTitle} 
                              className={`text-lg font-medium bg-transparent border-none p-0 h-auto focus:ring-0 text-${colors.textPrimary}`} 
                              autoFocus 
                              onClick={e => e.stopPropagation()} 
                            />
                          ) : (
                            <CardTitle 
                              className={`text-lg font-medium cursor-pointer text-${colors.textPrimary}`} 
                              onDoubleClick={e => {
                                e.stopPropagation();
                                handleDoubleClickTitle(card.id, card.title);
                              }}
                            >
                              {card.title}
                            </CardTitle>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={e => {
                              e.stopPropagation();
                              handleClearChat(card.id);
                            }} 
                            className={`h-8 w-8 transition-colors duration-200 rounded-xl text-${colors.textSecondary} hover:text-orange-400 hover:bg-${colors.cardBg}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={e => {
                              e.stopPropagation();
                              handleDeleteChat(card.id);
                            }} 
                            className={`h-8 w-8 transition-colors duration-200 rounded-xl text-${colors.textSecondary} hover:text-red-400 hover:bg-${colors.cardBg}`}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={e => {
                              e.stopPropagation();
                              toggleCardState(card.id);
                            }} 
                            className={`h-8 w-8 transition-colors duration-200 rounded-xl text-${colors.textSecondary} hover:text-${colors.textPrimary} hover:bg-${colors.cardBg}`}
                          >
                            <Minimize2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="p-6 flex-1 flex flex-col">
                        {/* Pinned Messages Section */}
                        {pinnedMessages.length > 0 && (
                          <div className={`mb-6 p-4 rounded-xl border-l-4 border-amber-500 ${
                            isDark ? 'bg-amber-500/10 backdrop-blur-sm' : 'bg-amber-50/80'
                          }`}>
                            <div className="flex items-center mb-3">
                              <Pin className="h-4 w-4 text-amber-500 mr-2" />
                              <span className={`text-sm font-medium ${
                                isDark ? 'text-amber-400' : 'text-amber-700'
                              }`}>
                                Pinned Messages
                              </span>
                            </div>
                            <div className="space-y-2">
                              {pinnedMessages.map(({ message, index }) => (
                                <div 
                                  key={index} 
                                  className={`p-3 rounded-xl cursor-pointer transition-colors duration-200 ${
                                    isDark 
                                      ? `bg-${colors.cardBg} hover:bg-${colors.cardBg} text-${colors.textSecondary}` 
                                      : `bg-white/80 hover:bg-white/90 text-${colors.textPrimary}`
                                  }`} 
                                  onClick={e => {
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
                        
                        <ScrollArea className="h-[320px] w-full flex-1">
                          <div className="space-y-4 pr-4">
                            {card.messages.map((message, idx) => (
                              <motion.div 
                                key={idx} 
                                className={`${message.isUser ? 'text-right' : 'text-left'} group relative`} 
                                initial={{ opacity: 0, y: 8 }} 
                                animate={{ opacity: 1, y: 0 }} 
                                transition={{
                                  delay: idx * 0.02,
                                  duration: 0.2,
                                  ease: "easeOut"
                                }} 
                                ref={el => {
                                  if (!messageRefs.current[card.id]) {
                                    messageRefs.current[card.id] = {};
                                  }
                                  messageRefs.current[card.id][idx] = el;
                                }}
                              >
                                <div className={`inline-block p-4 rounded-2xl max-w-[85%] relative transition-all duration-200 ease-out ${
                                  message.isUser 
                                    ? `bg-gradient-to-r ${colors.primary} text-white ml-auto shadow-lg` 
                                    : `bg-${colors.cardBg} text-${colors.textPrimary} border border-${colors.border} shadow-lg backdrop-blur-sm`
                                } ${isMessagePinned(message) ? 'ring-2 ring-amber-500/60' : ''}`}>
                                  {isMessagePinned(message) && (
                                    <Pin className={`absolute -top-2 -right-2 h-4 w-4 text-amber-500 bg-${colors.background} rounded-full p-0.5`} />
                                  )}
                                  <div className="text-sm leading-relaxed">
                                    {message.content}
                                  </div>
                                </div>
                                {!message.isUser && (
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button 
                                        variant="ghost" 
                                        size="sm" 
                                        className={`opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-2 text-${colors.textSecondary} hover:text-${colors.textPrimary} hover:bg-${colors.cardBg} rounded-xl`} 
                                        onClick={e => e.stopPropagation()}
                                      >
                                        <MoreVertical className="h-3 w-3" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className={`bg-${colors.cardBg} border-${colors.border} rounded-xl shadow-xl backdrop-blur-md`}>
                                      <DropdownMenuItem 
                                        onClick={() => handleCopyMessage(message.content)} 
                                        className={`text-${colors.textSecondary} hover:text-${colors.textPrimary} hover:bg-${colors.cardBg} rounded-lg`}
                                      >
                                        <Copy className="h-4 w-4 mr-2" />
                                        Copy message
                                      </DropdownMenuItem>
                                      {isMessagePinned(message) ? (
                                        <DropdownMenuItem 
                                          onClick={() => handleUnpinMessage(card.id, idx)} 
                                          className={`text-${colors.textSecondary} hover:text-${colors.textPrimary} hover:bg-${colors.cardBg} rounded-lg`}
                                        >
                                          <Pin className="h-4 w-4 mr-2" />
                                          Unpin message
                                        </DropdownMenuItem>
                                      ) : (
                                        <DropdownMenuItem 
                                          onClick={() => handlePinMessage(card.id, idx)} 
                                          className={`text-${colors.textSecondary} hover:text-${colors.textPrimary} hover:bg-${colors.cardBg} rounded-lg`}
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

        {/* Minimized Cards Section */}
        <AnimatePresence>
          {minimizedCardsList.length > 0 && (
            <motion.div className="mt-8 mb-8" initial="hidden" animate="visible" exit="exit">
              <div className="flex flex-wrap gap-3">
                {minimizedCardsList.map(card => {
                  const cardIsLoading = isCardLoading(card.id);
                  return (
                    <motion.div 
                      key={`minimized-${card.id}`} 
                      variants={minimizedTabVariants} 
                      initial="hidden" 
                      animate="visible" 
                      exit="exit" 
                      layout 
                      layoutId={`minimized-${card.id}`} 
                      className="inline-block"
                    >
                      <Card className={`overflow-hidden border cursor-pointer transition-all duration-200 ease-out hover:shadow-lg min-w-[220px] max-w-[300px] backdrop-blur-sm ${
                        selectedCardId === card.id 
                          ? `ring-2 ring-${colors.accent}/50 bg-${colors.cardBg} border-${colors.accent}/30 shadow-lg` 
                          : `bg-${colors.cardBg} border-${colors.border} hover:bg-${colors.cardBg} hover:border-${colors.accent}/20`
                      } rounded-2xl`} onClick={() => handleSelectCard(card.id)}>
                        <CardHeader className={`flex flex-row items-center justify-between p-4 border-${colors.border}`}>
                          <div className="flex items-center flex-1 min-w-0">
                            <span className="mr-3 flex-shrink-0">{card.icon}</span>
                            {cardIsLoading && <div className={`animate-spin rounded-full h-3 w-3 border-b-2 border-${colors.accent} mr-2 flex-shrink-0`}></div>}
                            {editingCardId === card.id ? (
                              <Input 
                                value={editingTitle} 
                                onChange={e => setEditingTitle(e.target.value)} 
                                onKeyDown={handleKeyPress} 
                                onBlur={handleSaveTitle} 
                                className={`text-sm font-medium bg-transparent border-none p-0 h-auto focus:ring-0 flex-1 min-w-0 text-${colors.textPrimary}`} 
                                autoFocus 
                                onClick={e => e.stopPropagation()} 
                              />
                            ) : (
                              <CardTitle 
                                className={`text-sm font-medium cursor-pointer truncate flex-1 min-w-0 text-${colors.textPrimary}`} 
                                onDoubleClick={e => {
                                  e.stopPropagation();
                                  handleDoubleClickTitle(card.id, card.title);
                                }}
                              >
                                {card.title}
                              </CardTitle>
                            )}
                          </div>
                          <div className="flex items-center space-x-1 ml-3">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={e => {
                                e.stopPropagation();
                                handleDeleteChat(card.id);
                              }} 
                              className={`h-6 w-6 flex-shrink-0 transition-colors duration-200 rounded-xl text-${colors.textSecondary} hover:text-red-400 hover:bg-${colors.cardBg}`}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={e => {
                                e.stopPropagation();
                                toggleCardState(card.id);
                              }} 
                              className={`h-6 w-6 flex-shrink-0 transition-colors duration-200 rounded-xl text-${colors.textSecondary} hover:text-${colors.textPrimary} hover:bg-${colors.cardBg}`}
                            >
                              <Maximize2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </CardHeader>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input Field */}
        <motion.div 
          className="mt-8" 
          initial={{ opacity: 0, y: 15 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.1, duration: 0.2, ease: "easeOut" }}
        >
          <div className={`border rounded-2xl p-6 transition-all duration-200 backdrop-blur-sm bg-${colors.cardBg} border-${colors.border} shadow-xl`}>
            <div className="flex items-center space-x-4">
              <Input 
                className={`flex-1 border-0 bg-transparent focus:ring-0 h-12 text-base transition-all duration-200 text-${colors.textPrimary} placeholder:text-${colors.textSecondary} ${
                  !selectedCardId || currentCardLoading ? 'opacity-70' : ''
                }`} 
                placeholder={selectedCardId 
                  ? currentCardLoading 
                    ? `"${chatCards.find(card => card.id === selectedCardId)?.title}" is thinking...` 
                    : `Type in "${chatCards.find(card => card.id === selectedCardId)?.title}" chat...`
                  : "Select a chat first..."
                } 
                value={inputMessage} 
                onChange={e => setInputMessage(e.target.value)} 
                onKeyPress={e => e.key === 'Enter' && !currentCardLoading && handleSendMessage()} 
                disabled={!selectedCardId || currentCardLoading} 
              />
              <Button 
                size="lg" 
                variant="outline" 
                onClick={handleAddImage} 
                disabled={!selectedCardId || currentCardLoading} 
                className={`h-12 transition-all duration-200 rounded-xl border-emerald-500/30 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 hover:border-emerald-400/50 ${
                  !selectedCardId || currentCardLoading ? 'opacity-70' : ''
                }`}
              >
                <Image className="h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                onClick={handleSendMessage} 
                disabled={!selectedCardId || currentCardLoading} 
                className={`bg-gradient-to-r ${colors.primary} hover:shadow-lg text-white h-12 transition-all duration-200 rounded-xl font-medium px-6 shadow-lg ${
                  !selectedCardId || currentCardLoading ? 'opacity-70' : ''
                }`}
              >
                {currentCardLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing
                  </div>
                ) : (
                  <>
                    <Send className="h-5 w-5 mr-2" />
                    Send
                  </>
                )}
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Tags Section */}
        <motion.div 
          className="mt-8 flex flex-wrap gap-3" 
          initial={{ opacity: 0, y: 15 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.2, duration: 0.2, ease: "easeOut" }}
        >
          {['#assignment', '#travel', '#food', '#ideas'].map((tag, idx) => (
            <Button 
              key={tag} 
              variant="outline" 
              className={`transition-all duration-200 rounded-xl font-medium backdrop-blur-sm bg-${colors.cardBg} text-${colors.textSecondary} border-${colors.border} hover:text-${colors.textPrimary} hover:bg-${colors.cardBg} hover:border-${colors.accent}/30`}
            >
              <span className={`w-2 h-2 rounded-full mr-2 ${
                idx === 0 ? 'bg-violet-500' : 
                idx === 1 ? 'bg-emerald-500' : 
                idx === 2 ? 'bg-purple-500' : 'bg-amber-500'
              }`}></span>
              {tag}
            </Button>
          ))}
        </motion.div>
        
        {/* Stats cards */}
        <motion.div 
          className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6" 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.3, duration: 0.2, ease: "easeOut" }}
        >
          {['Tasks Completed', 'Premium Credits', 'Response Time', 'Satisfaction'].map((stat, i) => (
            <motion.div 
              key={stat} 
              className={`rounded-2xl p-6 text-center border transition-all duration-200 hover:shadow-xl backdrop-blur-sm bg-${colors.cardBg} border-${colors.border} hover:border-${colors.accent}/30`} 
              whileHover={{
                scale: 1.02,
                y: -2,
                transition: { duration: 0.2, ease: "easeOut" }
              }} 
              initial={{ y: 15, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              transition={{
                delay: 0.4 + i * 0.02,
                duration: 0.2,
                ease: "easeOut"
              }}
            >
              <div className={`text-sm font-medium text-${colors.textSecondary}`}>
                {stat}
              </div>
              <div className={`text-3xl font-light mt-2 bg-gradient-to-r ${colors.primary} bg-clip-text text-transparent`}>
                {i === 0 ? '27' : i === 1 ? '850' : i === 2 ? '1.2s' : '98%'}
              </div>
              <div className={`text-xs mt-2 text-${colors.textSecondary}`}>
                {i === 0 ? '+5 this week' : i === 1 ? '150 remaining' : i === 2 ? 'Avg. response' : 'User rating'}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Search Dialog */}
      <ChatSearch
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        chatCards={chatCards}
        onMessageFound={handleMessageFound}
      />

      {/* Pin Message Dialog */}
      <Dialog open={pinDialogOpen} onOpenChange={setPinDialogOpen}>
        <DialogContent className={`bg-${colors.cardBg} border-${colors.border} rounded-2xl shadow-2xl backdrop-blur-md`}>
          <DialogHeader>
            <DialogTitle className={`text-${colors.textPrimary} text-lg font-medium`}>
              Pin Message
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className={`text-sm text-${colors.textSecondary}`}>
              How long would you like to pin this message?
            </p>
            <div className="space-y-3">
              <Button 
                onClick={() => handlePinWithDuration('8hours')} 
                variant="outline" 
                className={`w-full justify-start transition-all duration-200 rounded-xl border-${colors.border} text-orange-400 hover:text-orange-300 hover:bg-orange-500/10 hover:border-orange-400/50`}
              >
                ⏰ 8 Hours
              </Button>
              <Button 
                onClick={() => handlePinWithDuration('1week')} 
                variant="outline" 
                className={`w-full justify-start transition-all duration-200 rounded-xl border-${colors.border} text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 hover:border-purple-400/50`}
              >
                📅 1 Week
              </Button>
              <Button 
                onClick={() => handlePinWithDuration('forever')} 
                variant="outline" 
                className={`w-full justify-start transition-all duration-200 rounded-xl border-${colors.border} text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 hover:border-amber-400/50`}
              >
                ♾️ Forever
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* API Settings Dialog */}
      <MistralSettings open={settingsOpen} onOpenChange={setSettingsOpen} isDarkMode={isDark} />
    </div>
  );
};

export default Chat;
