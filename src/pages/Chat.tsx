import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Minimize2, Maximize2, Send, Sparkles, Star, Zap, Image, Trash2, Moon, Sun, Plus, Pin, MoreVertical, Settings, MessageSquare, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { MistralSettings } from '@/components/MistralSettings';
import { useMistralChat } from '@/hooks/useMistralChat';

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
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [pinDialogOpen, setPinDialogOpen] = useState(false);
  const [selectedMessageIndex, setSelectedMessageIndex] = useState<number | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const messageRefs = useRef<Record<string, Record<number, HTMLDivElement | null>>>({});
  const { sendMessage, isCardLoading, isConfigured } = useMistralChat();

  // Initialize with one default chat
  const [chatCards, setChatCards] = useState<ChatCard[]>([
    {
      id: 'new-chat-1',
      title: 'New Chat',
      icon: <MessageSquare className="h-5 w-5 text-blue-500" />,
      messages: []
    }
  ]);

  useEffect(() => {
    setTimeout(() => {
      toast.success("Welcome to AkinAI Premium", {
        description: "Your AI assistant is ready to help",
        icon: <Star className="h-4 w-4 text-blue-500" />
      });
    }, 1000);

    setSelectedCardId('new-chat-1');
  }, []);

  // Function to generate chat title and icon based on conversation
  const generateChatTitleAndIcon = useCallback((messages: Message[]) => {
    if (messages.length === 0) return { title: 'New Chat', icon: <MessageSquare className="h-5 w-5 text-blue-500" /> };
    
    const firstUserMessage = messages.find(m => m.isUser)?.content.toLowerCase() || '';
    
    // Simple keyword matching for title and icon generation
    if (firstUserMessage.includes('code') || firstUserMessage.includes('programming') || firstUserMessage.includes('javascript') || firstUserMessage.includes('python')) {
      return { title: 'Coding Help', icon: <Zap className="h-5 w-5 text-green-500" /> };
    } else if (firstUserMessage.includes('work') || firstUserMessage.includes('business') || firstUserMessage.includes('project')) {
      return { title: 'Work Project', icon: <Zap className="h-5 w-5 text-purple-500" /> };
    } else if (firstUserMessage.includes('study') || firstUserMessage.includes('learn') || firstUserMessage.includes('homework') || firstUserMessage.includes('assignment')) {
      return { title: 'Study Help', icon: <Zap className="h-5 w-5 text-blue-500" /> };
    } else if (firstUserMessage.includes('travel') || firstUserMessage.includes('trip') || firstUserMessage.includes('vacation')) {
      return { title: 'Travel Planning', icon: <Zap className="h-5 w-5 text-orange-500" /> };
    } else if (firstUserMessage.includes('music') || firstUserMessage.includes('song') || firstUserMessage.includes('artist')) {
      return { title: 'Music Chat', icon: <Zap className="h-5 w-5 text-pink-500" /> };
    } else if (firstUserMessage.includes('book') || firstUserMessage.includes('read') || firstUserMessage.includes('story')) {
      return { title: 'Literature', icon: <Zap className="h-5 w-5 text-indigo-500" /> };
    } else if (firstUserMessage.includes('game') || firstUserMessage.includes('gaming') || firstUserMessage.includes('play')) {
      return { title: 'Gaming', icon: <Zap className="h-5 w-5 text-red-500" /> };
    } else if (firstUserMessage.includes('recipe') || firstUserMessage.includes('food') || firstUserMessage.includes('cook')) {
      return { title: 'Cooking', icon: <Zap className="h-5 w-5 text-yellow-500" /> };
    } else if (firstUserMessage.includes('love') || firstUserMessage.includes('relationship') || firstUserMessage.includes('dating')) {
      return { title: 'Relationship', icon: <Zap className="h-5 w-5 text-red-400" /> };
    } else {
      // Generate a simple title from the first few words
      const words = firstUserMessage.split(' ').slice(0, 3).join(' ');
      const title = words.length > 20 ? words.substring(0, 20) + '...' : words;
      return { title: title || 'General Chat', icon: <Zap className="h-5 w-5 text-purple-500" /> };
    }
  }, []);

  const toggleCardState = useCallback((cardId: string) => {
    setMinimizedCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  }, []);

  const handleDeleteChat = useCallback((cardId: string) => {
    // Don't allow deleting if it's the only chat
    if (chatCards.length === 1) {
      toast.error("Cannot delete the last chat");
      return;
    }

    setChatCards(prev => prev.filter(card => card.id !== cardId));
    
    // If the deleted chat was selected, select another one
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
          description: "Please select a chat first",
        });
      }
      return;
    }

    if (!isConfigured()) {
      toast.error("API not configured", {
        description: "Please configure your API settings first",
      });
      setSettingsOpen(true);
      return;
    }

    // Check if this specific card is already loading
    if (isCardLoading(selectedCardId)) {
      toast.error("Chat is busy", {
        description: "Please wait for the current response to complete",
      });
      return;
    }

    // Add user message immediately
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

    const userInput = inputMessage;
    setInputMessage('');

    try {
      // Get current conversation history
      const currentCard = chatCards.find(card => card.id === selectedCardId);
      const conversationHistory = currentCard?.messages || [];

      // Send to Together.ai API with card ID
      const response = await sendMessage(userInput, conversationHistory, selectedCardId);

      // Add AI response and update title/icon if it's the first exchange
      setChatCards(prev => {
        return prev.map(card => {
          if (card.id === selectedCardId) {
            const updatedMessages = [
              ...card.messages,
              {
                content: response,
                isUser: false
              }
            ];

            // Update title and icon if this is the first exchange and title is still "New Chat"
            if (card.title === 'New Chat' && updatedMessages.length >= 2) {
              const { title, icon } = generateChatTitleAndIcon(updatedMessages);
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
      // Remove the user message if API call failed
      setChatCards(prev => {
        return prev.map(card => {
          if (card.id === selectedCardId) {
            return {
              ...card,
              messages: card.messages.slice(0, -1) // Remove last message (user message)
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
      icon: <Image className="h-4 w-4 text-green-500" />
    });
  }, []);

  const handleSelectCard = useCallback((cardId: string) => {
    setSelectedCardId(cardId);
  }, []);

  const handleClearChat = useCallback((cardId: string) => {
    setChatCards(prev => prev.map(card => 
      card.id === cardId 
        ? { ...card, messages: [], title: 'New Chat', icon: <MessageSquare className="h-5 w-5 text-blue-500" /> }
        : card
    ));
    toast.success("Chat cleared");
  }, []);

  const handleNewChat = useCallback(() => {
    const newChatId = `new-chat-${Date.now()}`;
    const newChat = {
      id: newChatId,
      title: 'New Chat',
      icon: <MessageSquare className="h-5 w-5 text-blue-500" />,
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
      setChatCards(prev => prev.map(card => 
        card.id === editingCardId 
          ? { ...card, title: editingTitle.trim() }
          : card
      ));
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
          return { ...card, messages: updatedMessages };
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
        return { ...card, messages: updatedMessages };
      }
      return card;
    }));
    toast.success("Message unpinned");
  }, []);

  const scrollToMessage = useCallback((cardId: string, messageIndex: number) => {
    const messageRef = messageRefs.current[cardId]?.[messageIndex];
    if (messageRef) {
      messageRef.scrollIntoView({ behavior: 'smooth', block: 'center' });
      messageRef.style.backgroundColor = isDarkMode ? '#1e40af' : '#bfdbfe';
      setTimeout(() => {
        messageRef.style.backgroundColor = '';
      }, 1000);
    }
  }, [isDarkMode]);

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
      
      <div className="container mx-auto max-w-7xl px-4 py-4">
        {/* Header */}
        <motion.div 
          className="flex justify-between items-center mb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
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
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSettingsOpen(true)}
              className={isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-700' : 'text-gray-600 hover:bg-gray-100'}
            >
              <Settings className="h-4 w-4" />
            </Button>
            
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

        {/* Maximized Chat Grid */}
        <AnimatePresence>
          {maximizedCards.length > 0 && (
            <motion.div 
              className={`grid gap-6 transition-all duration-200 ease-out ${
                hasOnlyOneMaximized 
                  ? 'grid-cols-1' 
                  : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
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
                    whileHover={{ y: -3, transition: { duration: 0.2, ease: "easeOut" } }}
                    className="flex h-full"
                    onClick={() => handleSelectCard(card.id)}
                    layout
                    layoutId={card.id}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <Card 
                      className={`overflow-hidden shadow-sm border cursor-pointer flex flex-col w-full h-full transition-all duration-200 ease-out ${
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
                          {cardIsLoading && (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mr-2"></div>
                          )}
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
                        <div className="flex items-center space-x-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleClearChat(card.id);
                            }} 
                            className={`h-8 w-8 transition-colors duration-200 ${isDarkMode ? 'text-slate-400 hover:text-orange-400 hover:bg-slate-700' : 'text-gray-600 hover:text-orange-600 hover:bg-gray-100'}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteChat(card.id);
                            }} 
                            className={`h-8 w-8 transition-colors duration-200 ${isDarkMode ? 'text-slate-400 hover:text-red-400 hover:bg-slate-700' : 'text-gray-600 hover:text-red-600 hover:bg-gray-100'}`}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleCardState(card.id);
                            }} 
                            className={`h-8 w-8 transition-colors duration-200 ${isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-700' : 'text-gray-600 hover:bg-gray-100'}`}
                          >
                            <Minimize2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="p-4 flex-1 flex flex-col">
                        {/* Pinned Messages Section */}
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

        {/* Minimized Cards Section */}
        <AnimatePresence>
          {minimizedCardsList.length > 0 && (
            <motion.div 
              className="mt-8 mb-6"
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="flex flex-wrap gap-2">
                {minimizedCardsList.map((card) => {
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
                            {cardIsLoading && (
                              <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-500 mr-2 flex-shrink-0"></div>
                            )}
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
                          <div className="flex items-center space-x-1 ml-2">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteChat(card.id);
                              }} 
                              className={`h-6 w-6 flex-shrink-0 transition-colors duration-200 ${isDarkMode ? 'text-slate-400 hover:text-red-400 hover:bg-slate-700' : 'text-gray-600 hover:text-red-600 hover:bg-gray-100'}`}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleCardState(card.id);
                              }} 
                              className={`h-6 w-6 flex-shrink-0 transition-colors duration-200 ${isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-700' : 'text-gray-600 hover:bg-gray-100'}`}
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
          <div className={`border rounded-xl p-4 shadow-sm transition-all duration-200 ${
            isDarkMode 
              ? 'bg-slate-800/50 border-slate-700' 
              : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center space-x-2">
              <Input 
                className={`flex-1 border-0 bg-transparent focus:ring-0 h-12 transition-all duration-200 ${
                  isDarkMode ? 'text-white placeholder:text-gray-400' : 'text-gray-900'
                } ${!selectedCardId || currentCardLoading ? 'opacity-70' : ''}`}
                placeholder={selectedCardId 
                  ? currentCardLoading 
                    ? `"${chatCards.find(card => card.id === selectedCardId)?.title}" is thinking...`
                    : `Type in "${chatCards.find(card => card.id === selectedCardId)?.title}" chat...`
                  : "Select a chat first..."}
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
                className={`h-12 transition-all duration-200 ${
                  isDarkMode ? 'border-slate-600 text-green-400 hover:text-green-300 hover:bg-slate-700/50' : 'border-gray-300 text-green-600 hover:text-green-700 hover:bg-green-50'
                } ${(!selectedCardId || currentCardLoading) ? 'opacity-70' : ''}`}
              >
                <Image className="h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                onClick={handleSendMessage}
                disabled={!selectedCardId || currentCardLoading}
                className={`bg-blue-600 hover:bg-blue-700 text-white h-12 transition-all duration-200 ${
                  (!selectedCardId || currentCardLoading) ? 'opacity-70' : ''
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
          className="mt-8 flex flex-wrap gap-2"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.2, ease: "easeOut" }}
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
          transition={{ delay: 0.3, duration: 0.2, ease: "easeOut" }}
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
              transition={{ delay: 0.4 + i * 0.02, duration: 0.2, ease: "easeOut" }}
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

      {/* API Settings Dialog */}
      <MistralSettings 
        open={settingsOpen} 
        onOpenChange={setSettingsOpen} 
        isDarkMode={isDarkMode} 
      />
    </div>
  );
};

export default Chat;
