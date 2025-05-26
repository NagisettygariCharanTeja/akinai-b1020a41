
import { useState } from 'react';
import { mistralService, MistralConfig, MistralMessage } from '@/services/mistralService';
import { toast } from 'sonner';

interface Message {
  content: string;
  isUser: boolean;
  isPinned?: boolean;
  pinnedUntil?: Date | null;
}

export const useMistralChat = () => {
  const [loading, setLoading] = useState(false);

  const getConfig = (): MistralConfig | null => {
    const savedConfig = localStorage.getItem('mistralConfig');
    if (!savedConfig) {
      toast.error('Please configure Mistral API settings first');
      return null;
    }
    return JSON.parse(savedConfig);
  };

  const sendMessage = async (
    userMessage: string,
    conversationHistory: Message[]
  ): Promise<string> => {
    const config = getConfig();
    if (!config) {
      throw new Error('Mistral not configured');
    }

    if (!config.apiKey) {
      toast.error('API key not configured');
      throw new Error('API key missing');
    }

    setLoading(true);

    try {
      // Convert conversation history to Mistral format
      const messages: MistralMessage[] = [
        { role: 'system', content: config.systemPrompt }
      ];

      // Add conversation context
      conversationHistory.forEach(msg => {
        messages.push({
          role: msg.isUser ? 'user' : 'assistant',
          content: msg.content
        });
      });

      // Add current user message
      messages.push({
        role: 'user',
        content: userMessage
      });

      const response = await mistralService.sendMessage(messages, config);
      return response;
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to get response';
      toast.error(`Chat error: ${errorMessage}`);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    sendMessage,
    loading,
    isConfigured: () => {
      const config = getConfig();
      return config && config.apiKey;
    }
  };
};
