
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { Send, Settings, Plus, Moon, Sun, MessageSquare, Bot, User, Zap, Brain, Sparkles } from 'lucide-react';
import { useMistralChat } from '@/hooks/useMistralChat';
import { MistralSettings } from '@/components/MistralSettings';

interface ChatCard {
  id: string;
  title: string;
  icon: React.ReactNode;
  lastMessage: string;
  timestamp: string;
  messages: Message[];
}

interface Message {
  content: string;
  role: 'user' | 'assistant';
}

const getTopicIcon = (title: string) => {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes('code') || lowerTitle.includes('programming') || lowerTitle.includes('develop')) {
    return <Bot className="h-4 w-4" />;
  }
  if (lowerTitle.includes('creative') || lowerTitle.includes('art') || lowerTitle.includes('design')) {
    return <Sparkles className="h-4 w-4" />;
  }
  if (lowerTitle.includes('analysis') || lowerTitle.includes('data') || lowerTitle.includes('research')) {
    return <Brain className="h-4 w-4" />;
  }
  if (lowerTitle.includes('quick') || lowerTitle.includes('fast') || lowerTitle.includes('help')) {
    return <Zap className="h-4 w-4" />;
  }
  return <MessageSquare className="h-4 w-4" />;
};

const generateChatTitle = (message: string): string => {
  const words = message.split(' ').slice(0, 4);
  return words.join(' ') + (message.split(' ').length > 4 ? '...' : '');
};

export default function Chat() {
  const [chatCards, setChatCards] = useState<ChatCard[]>([
    {
      id: '1',
      title: 'New Chat',
      icon: <MessageSquare className="h-4 w-4" />,
      lastMessage: '',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      messages: []
    }
  ]);
  const [activeChatId, setActiveChatId] = useState<string>('1');
  const [editingTitleId, setEditingTitleId] = useState<string | null>(null);
  const [tempTitle, setTempTitle] = useState<string>('');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const { sendMessage, loading } = useMistralChat();
  
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);

  // Get current chat messages
  const currentChat = chatCards.find(chat => chat.id === activeChatId);
  const messages = currentChat?.messages || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (editingTitleId && titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [editingTitleId]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = input.trim();
    setInput('');
    
    // Add user message to current chat
    const newUserMessage: Message = {
      content: userMessage,
      role: 'user'
    };

    setChatCards(prev => prev.map(chat => {
      if (chat.id === activeChatId) {
        const updatedMessages = [...chat.messages, newUserMessage];
        
        // Update title if it's a new chat
        let updatedChat = { ...chat, messages: updatedMessages };
        if (chat.title === 'New Chat' && chat.lastMessage === '') {
          const newTitle = generateChatTitle(userMessage);
          const newIcon = getTopicIcon(newTitle);
          updatedChat = {
            ...updatedChat,
            title: newTitle,
            icon: newIcon
          };
        }
        
        updatedChat.lastMessage = userMessage;
        updatedChat.timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        return updatedChat;
      }
      return chat;
    }));

    try {
      // Get conversation history for the current chat (excluding the message we just added)
      const conversationHistory = messages.map(msg => ({
        content: msg.content,
        isUser: msg.role === 'user'
      }));

      const response = await sendMessage(userMessage, conversationHistory);
      
      // Add assistant response to current chat
      const assistantMessage: Message = {
        content: response,
        role: 'assistant'
      };

      setChatCards(prev => prev.map(chat => {
        if (chat.id === activeChatId) {
          return {
            ...chat,
            messages: [...chat.messages, assistantMessage],
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
        }
        return chat;
      }));
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const createNewChat = () => {
    const newChatId = Date.now().toString();
    const newChat: ChatCard = {
      id: newChatId,
      title: 'New Chat',
      icon: <MessageSquare className="h-4 w-4" />,
      lastMessage: '',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      messages: []
    };
    
    setChatCards(prev => [newChat, ...prev]);
    setActiveChatId(newChatId);
    setSidebarOpen(false);
  };

  const startEditingTitle = (chatId: string, currentTitle: string) => {
    setEditingTitleId(chatId);
    setTempTitle(currentTitle);
  };

  const saveTitle = () => {
    if (editingTitleId && tempTitle.trim()) {
      const newIcon = getTopicIcon(tempTitle);
      setChatCards(prev => prev.map(chat => 
        chat.id === editingTitleId 
          ? { ...chat, title: tempTitle.trim(), icon: newIcon }
          : chat
      ));
    }
    setEditingTitleId(null);
    setTempTitle('');
  };

  const cancelEditingTitle = () => {
    setEditingTitleId(null);
    setTempTitle('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTitleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      saveTitle();
    } else if (e.key === 'Escape') {
      cancelEditingTitle();
    }
  };

  return (
    <div className={`flex h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 sm:w-72 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r transition-transform duration-200 ease-in-out lg:transition-none`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h1 className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                akinAI
              </h1>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}
                >
                  {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSettingsOpen(true)}
                  className={isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <Button 
              onClick={createNewChat}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Chat
            </Button>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto p-2 sm:p-4">
            <div className="space-y-2">
              {chatCards.map((chat) => (
                <Card 
                  key={chat.id}
                  className={`cursor-pointer transition-all duration-200 ${
                    activeChatId === chat.id 
                      ? (isDarkMode ? 'bg-gray-700 border-blue-500' : 'bg-blue-50 border-blue-500')
                      : (isDarkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' : 'bg-white border-gray-200 hover:bg-gray-50')
                  }`}
                  onClick={() => {
                    setActiveChatId(chat.id);
                    setSidebarOpen(false);
                  }}
                >
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-600' : 'bg-gray-100'}`}>
                        {chat.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        {editingTitleId === chat.id ? (
                          <input
                            ref={titleInputRef}
                            type="text"
                            value={tempTitle}
                            onChange={(e) => setTempTitle(e.target.value)}
                            onKeyDown={handleTitleKeyPress}
                            onBlur={saveTitle}
                            className={`w-full bg-transparent border-none outline-none text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                          />
                        ) : (
                          <h3 
                            className={`text-sm font-medium truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                            onDoubleClick={() => startEditingTitle(chat.id, chat.title)}
                          >
                            {chat.title}
                          </h3>
                        )}
                        {chat.lastMessage && (
                          <p className={`text-xs truncate mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {chat.lastMessage}
                          </p>
                        )}
                        <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                          {chat.timestamp}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <div className={`lg:hidden flex items-center justify-between p-4 border-b ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(true)}
            className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}
          >
            <MessageSquare className="h-5 w-5" />
          </Button>
          <h1 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {chatCards.find(chat => chat.id === activeChatId)?.title || 'Chat'}
          </h1>
          <div className="w-10" />
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start space-x-3 sm:space-x-4 ${
                  message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                  <AvatarFallback className={message.role === 'user' ? 'bg-blue-600' : 'bg-purple-600'}>
                    {message.role === 'user' ? <User className="h-4 w-4 sm:h-5 sm:w-5" /> : <Bot className="h-4 w-4 sm:h-5 sm:w-5" />}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`flex-1 p-3 sm:p-4 rounded-lg text-sm sm:text-base ${
                    message.role === 'user'
                      ? (isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white')
                      : (isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-gray-100 text-gray-900')
                  }`}
                >
                  <div className="whitespace-pre-wrap break-words">{message.content}</div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-start space-x-3 sm:space-x-4">
                <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                  <AvatarFallback className="bg-purple-600">
                    <Bot className="h-4 w-4 sm:h-5 sm:w-5" />
                  </AvatarFallback>
                </Avatar>
                <div className={`flex-1 p-3 sm:p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                  <div className="flex space-x-1">
                    <div className={`w-2 h-2 rounded-full animate-pulse ${isDarkMode ? 'bg-gray-400' : 'bg-gray-600'}`}></div>
                    <div className={`w-2 h-2 rounded-full animate-pulse delay-75 ${isDarkMode ? 'bg-gray-400' : 'bg-gray-600'}`}></div>
                    <div className={`w-2 h-2 rounded-full animate-pulse delay-150 ${isDarkMode ? 'bg-gray-400' : 'bg-gray-600'}`}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className={`border-t p-4 sm:p-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="max-w-3xl mx-auto">
            <div className="flex space-x-2 sm:space-x-4">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here..."
                className={`flex-1 text-sm sm:text-base ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                disabled={loading}
              />
              <Button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4"
              >
                <Send className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <MistralSettings 
        open={settingsOpen} 
        onOpenChange={setSettingsOpen}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}
