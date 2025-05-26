
import React from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Pin, MoreVertical } from 'lucide-react';
import { motion } from 'framer-motion';

interface Message {
  content: string;
  isUser: boolean;
  isPinned?: boolean;
  pinnedUntil?: Date | null;
}

interface MessageListProps {
  messages: Message[];
  cardId: string;
  isDarkMode: boolean;
  isMessagePinned: (message: Message) => boolean;
  handlePinMessage: (cardId: string, messageIndex: number) => void;
  handleUnpinMessage: (cardId: string, messageIndex: number) => void;
  messageRefs: React.MutableRefObject<Record<string, Record<number, HTMLDivElement | null>>>;
}

export const MessageList: React.FC<MessageListProps> = ({
  messages,
  cardId,
  isDarkMode,
  isMessagePinned,
  handlePinMessage,
  handleUnpinMessage,
  messageRefs
}) => {
  return (
    <div className="space-y-3 pr-4">
      {messages.map((message, idx) => (
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
            if (!messageRefs.current[cardId]) {
              messageRefs.current[cardId] = {};
            }
            messageRefs.current[cardId][idx] = el;
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
                    onClick={() => handleUnpinMessage(cardId, idx)}
                    className={isDarkMode ? 'text-slate-300 hover:text-white hover:bg-slate-700' : 'text-gray-700 hover:bg-gray-100'}
                  >
                    <Pin className="h-4 w-4 mr-2" />
                    Unpin message
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem
                    onClick={() => handlePinMessage(cardId, idx)}
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
  );
};
