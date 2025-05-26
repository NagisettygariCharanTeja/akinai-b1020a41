
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Image } from 'lucide-react';
import { motion } from 'framer-motion';

interface ChatCard {
  id: string;
  title: string;
  icon: React.ReactNode;
  messages: any[];
}

interface ChatInputProps {
  inputMessage: string;
  setInputMessage: (message: string) => void;
  selectedCardId: string | null;
  chatCards: ChatCard[];
  loading: boolean;
  isDarkMode: boolean;
  handleSendMessage: () => void;
  handleAddImage: () => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  inputMessage,
  setInputMessage,
  selectedCardId,
  chatCards,
  loading,
  isDarkMode,
  handleSendMessage,
  handleAddImage
}) => {
  return (
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
            } ${!selectedCardId ? 'opacity-70' : ''}`}
            placeholder={selectedCardId 
              ? `Type in "${chatCards.find(card => card.id === selectedCardId)?.title}" chat...` 
              : "Select a chat first..."}
            value={inputMessage}
            onChange={e => setInputMessage(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && !loading && handleSendMessage()}
            disabled={!selectedCardId || loading}
          />
          <Button 
            size="lg" 
            variant="outline"
            onClick={handleAddImage}
            disabled={!selectedCardId || loading}
            className={`h-12 transition-all duration-200 ${
              isDarkMode ? 'border-slate-600 text-green-400 hover:text-green-300 hover:bg-slate-700/50' : 'border-gray-300 text-green-600 hover:text-green-700 hover:bg-green-50'
            } ${(!selectedCardId || loading) ? 'opacity-70' : ''}`}
          >
            <Image className="h-5 w-5" />
          </Button>
          <Button 
            size="lg" 
            onClick={handleSendMessage}
            disabled={!selectedCardId || loading}
            className={`bg-blue-600 hover:bg-blue-700 text-white h-12 transition-all duration-200 ${
              (!selectedCardId || loading) ? 'opacity-70' : ''
            }`}
          >
            {loading ? (
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
  );
};
