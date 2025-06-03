
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Search, X } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface Message {
  content: string;
  isUser: boolean;
}

interface ChatCard {
  id: string;
  title: string;
  messages: Message[];
}

interface ChatSearchProps {
  isOpen: boolean;
  onClose: () => void;
  chatCards: ChatCard[];
  onMessageFound: (cardId: string, messageIndex: number) => void;
}

const ChatSearch: React.FC<ChatSearchProps> = ({ isOpen, onClose, chatCards, onMessageFound }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Array<{
    cardId: string;
    cardTitle: string;
    messageIndex: number;
    message: Message;
    snippet: string;
  }>>([]);
  const { getThemeColors, currentTheme } = useTheme();
  const colors = getThemeColors();
  const isDark = currentTheme !== 'opennote';

  useEffect(() => {
    if (searchQuery.length < 2) {
      setSearchResults([]);
      return;
    }

    const results: typeof searchResults = [];
    chatCards.forEach((card) => {
      card.messages.forEach((message, index) => {
        if (message.content.toLowerCase().includes(searchQuery.toLowerCase())) {
          const queryIndex = message.content.toLowerCase().indexOf(searchQuery.toLowerCase());
          const start = Math.max(0, queryIndex - 50);
          const end = Math.min(message.content.length, queryIndex + searchQuery.length + 50);
          const snippet = message.content.substring(start, end);
          
          results.push({
            cardId: card.id,
            cardTitle: card.title,
            messageIndex: index,
            message,
            snippet: start > 0 ? '...' + snippet : snippet
          });
        }
      });
    });

    setSearchResults(results);
  }, [searchQuery, chatCards]);

  const handleResultClick = (cardId: string, messageIndex: number) => {
    onMessageFound(cardId, messageIndex);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`max-w-2xl rounded-2xl shadow-2xl backdrop-blur-md ${
        isDark ? `bg-${colors.background}/95 border-${colors.border}` : `bg-${colors.cardBg} border-${colors.border}`
      }`}>
        <DialogHeader>
          <DialogTitle className={`text-lg font-medium ${isDark ? `text-${colors.textPrimary}` : `text-${colors.textPrimary}`}`}>
            Search Messages
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${isDark ? `text-${colors.textSecondary}` : `text-${colors.textSecondary}`}`} />
            <Input
              placeholder="Search across all chats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`pl-10 border-0 h-12 text-base rounded-xl ${
                isDark 
                  ? `bg-slate-800/50 text-${colors.textPrimary} placeholder:text-${colors.textSecondary}` 
                  : `bg-gray-100/50 text-${colors.textPrimary} placeholder:text-${colors.textSecondary}`
              }`}
              autoFocus
            />
          </div>

          {searchResults.length > 0 && (
            <div className="max-h-96 overflow-y-auto space-y-2">
              {searchResults.map((result, index) => (
                <div
                  key={index}
                  onClick={() => handleResultClick(result.cardId, result.messageIndex)}
                  className={`p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                    isDark 
                      ? `bg-slate-800/60 hover:bg-slate-800/80 border-${colors.border}` 
                      : `bg-white/80 hover:bg-white/90 border-${colors.border}`
                  } border`}
                >
                  <div className={`text-sm font-medium mb-2 ${isDark ? `text-${colors.accent}` : `text-${colors.accent}`}`}>
                    {result.cardTitle}
                  </div>
                  <div className={`text-sm ${isDark ? `text-${colors.textPrimary}` : `text-${colors.textPrimary}`} line-clamp-2`}>
                    {result.snippet}
                  </div>
                  <div className={`text-xs mt-2 ${isDark ? `text-${colors.textSecondary}` : `text-${colors.textSecondary}`}`}>
                    {result.message.isUser ? 'You' : 'AI'} • Message {result.messageIndex + 1}
                  </div>
                </div>
              ))}
            </div>
          )}

          {searchQuery.length >= 2 && searchResults.length === 0 && (
            <div className={`text-center py-8 ${isDark ? `text-${colors.textSecondary}` : `text-${colors.textSecondary}`}`}>
              No messages found for "{searchQuery}"
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatSearch;
