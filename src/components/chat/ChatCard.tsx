
import React, { useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Minimize2, Trash2, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { MessageList } from './MessageList';
import { PinnedMessages } from './PinnedMessages';

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

interface ChatCardProps {
  card: ChatCard;
  selectedCardId: string | null;
  isDarkMode: boolean;
  editingCardId: string | null;
  editingTitle: string;
  setEditingCardId: (id: string | null) => void;
  setEditingTitle: (title: string) => void;
  handleSelectCard: (id: string) => void;
  handleClearChat: (id: string) => void;
  handleDeleteChat: (id: string) => void;
  toggleCardState: (id: string) => void;
  handleDoubleClickTitle: (id: string, title: string) => void;
  handleSaveTitle: () => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
  handlePinMessage: (cardId: string, messageIndex: number) => void;
  handleUnpinMessage: (cardId: string, messageIndex: number) => void;
  scrollToMessage: (cardId: string, messageIndex: number) => void;
  isMessagePinned: (message: Message) => boolean;
  messageRefs: React.MutableRefObject<Record<string, Record<number, HTMLDivElement | null>>>;
  itemVariants: any;
}

export const ChatCard: React.FC<ChatCardProps> = ({
  card,
  selectedCardId,
  isDarkMode,
  editingCardId,
  editingTitle,
  setEditingCardId,
  setEditingTitle,
  handleSelectCard,
  handleClearChat,
  handleDeleteChat,
  toggleCardState,
  handleDoubleClickTitle,
  handleSaveTitle,
  handleKeyPress,
  handlePinMessage,
  handleUnpinMessage,
  scrollToMessage,
  isMessagePinned,
  messageRefs,
  itemVariants
}) => {
  const pinnedMessages = card.messages.filter((message, index) => isMessagePinned(message)).map((message, originalIndex) => {
    const actualIndex = card.messages.findIndex(m => m === message);
    return { message, index: actualIndex };
  });

  return (
    <motion.div 
      key={card.id} 
      layoutId={card.id}
      variants={itemVariants} 
      whileHover={{ y: -3, transition: { duration: 0.1, ease: "easeOut" } }}
      className="flex h-full"
      onClick={() => handleSelectCard(card.id)}
      layout
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
              className={`h-8 w-8 transition-colors duration-200 ${isDarkMode ? 'text-slate-400 hover:text-orange-400 hover:bg-slate-700' : 'text-gray-600 hover:bg-gray-100'}`}
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
          <PinnedMessages 
            pinnedMessages={pinnedMessages}
            isDarkMode={isDarkMode}
            scrollToMessage={scrollToMessage}
            cardId={card.id}
          />
          
          <ScrollArea className="h-[500px] w-full flex-1">
            <MessageList 
              messages={card.messages}
              cardId={card.id}
              isDarkMode={isDarkMode}
              isMessagePinned={isMessagePinned}
              handlePinMessage={handlePinMessage}
              handleUnpinMessage={handleUnpinMessage}
              messageRefs={messageRefs}
            />
          </ScrollArea>
        </CardContent>
      </Card>
    </motion.div>
  );
};
