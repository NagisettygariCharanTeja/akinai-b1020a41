
import React from 'react';
import { Pin } from 'lucide-react';

interface Message {
  content: string;
  isUser: boolean;
  isPinned?: boolean;
  pinnedUntil?: Date | null;
}

interface PinnedMessage {
  message: Message;
  index: number;
}

interface PinnedMessagesProps {
  pinnedMessages: PinnedMessage[];
  isDarkMode: boolean;
  scrollToMessage: (cardId: string, messageIndex: number) => void;
  cardId: string;
}

export const PinnedMessages: React.FC<PinnedMessagesProps> = ({
  pinnedMessages,
  isDarkMode,
  scrollToMessage,
  cardId
}) => {
  if (pinnedMessages.length === 0) return null;

  return (
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
              scrollToMessage(cardId, index);
            }}
          >
            <div className="text-sm line-clamp-2">
              {message.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
