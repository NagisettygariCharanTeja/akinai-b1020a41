
import React from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Maximize2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatCard {
  id: string;
  title: string;
  icon: React.ReactNode;
  messages: any[];
}

interface MinimizedChatTabsProps {
  minimizedCardsList: ChatCard[];
  selectedCardId: string | null;
  isDarkMode: boolean;
  editingCardId: string | null;
  editingTitle: string;
  setEditingCardId: (id: string | null) => void;
  setEditingTitle: (title: string) => void;
  handleSelectCard: (id: string) => void;
  handleDeleteChat: (id: string) => void;
  toggleCardState: (id: string) => void;
  handleDoubleClickTitle: (id: string, title: string) => void;
  handleSaveTitle: () => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
}

export const MinimizedChatTabs: React.FC<MinimizedChatTabsProps> = ({
  minimizedCardsList,
  selectedCardId,
  isDarkMode,
  editingCardId,
  editingTitle,
  setEditingCardId,
  setEditingTitle,
  handleSelectCard,
  handleDeleteChat,
  toggleCardState,
  handleDoubleClickTitle,
  handleSaveTitle,
  handleKeyPress
}) => {
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

  if (minimizedCardsList.length === 0) return null;

  return (
    <AnimatePresence>
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
              layoutId={`minimized-${card.id}`}
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
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
