import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';
import { Settings, TestTube } from 'lucide-react';
import { mistralService, MistralConfig } from '@/services/mistralService';
interface MistralSettingsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isDarkMode: boolean;
}
const defaultConfig: MistralConfig = {
  apiKey: '',
  model: 'mistral-7b-instruct',
  temperature: 0.7,
  maxTokens: 1000,
  systemPrompt: 'You are a helpful AI assistant. Please provide clear, accurate, and helpful responses.'
};
const models = [{
  value: 'mistral-7b-instruct',
  label: 'Mistral 7B Instruct'
}, {
  value: 'mistral-medium',
  label: 'Mistral Medium'
}, {
  value: 'mistral-large-latest',
  label: 'Mistral Large'
}, {
  value: 'mistral-small',
  label: 'Mistral Small'
}];
export const MistralSettings: React.FC<MistralSettingsProps> = ({
  open,
  onOpenChange,
  isDarkMode
}) => {
  const [config, setConfig] = useState<MistralConfig>(defaultConfig);
  const [testing, setTesting] = useState(false);
  useEffect(() => {
    const savedConfig = localStorage.getItem('mistralConfig');
    if (savedConfig) {
      setConfig(JSON.parse(savedConfig));
    }
  }, []);
  const handleSave = () => {
    if (!config.apiKey.trim()) {
      toast.error('API key is required');
      return;
    }
    localStorage.setItem('mistralConfig', JSON.stringify(config));
    toast.success('Settings saved successfully');
    onOpenChange(false);
  };
  const handleTestConnection = async () => {
    if (!config.apiKey.trim()) {
      toast.error('Please enter an API key first');
      return;
    }
    setTesting(true);
    try {
      const isValid = await mistralService.testConnection(config.apiKey);
      if (isValid) {
        toast.success('Connection successful!');
      } else {
        toast.error('Connection failed. Please check your API key.');
      }
    } catch (error) {
      toast.error('Connection test failed');
    } finally {
      setTesting(false);
    }
  };
  return <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`max-w-md ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
        <DialogHeader>
          <DialogTitle className={`flex items-center space-x-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            <Settings className="h-5 w-5" />
            <span>Mistral AI Settings</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label className={isDarkMode ? 'text-slate-300' : 'text-gray-700'}>API Key</Label>
            <div className="flex space-x-2">
              <Input type="password" placeholder="Enter your Mistral API key" value={config.apiKey} onChange={e => setConfig({
              ...config,
              apiKey: e.target.value
            })} className={isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-300'} />
              <Button variant="outline" size="sm" onClick={handleTestConnection} disabled={testing} className={isDarkMode ? 'border-slate-600 text-blue-400 hover:bg-slate-700' : 'border-gray-300 text-blue-600 hover:bg-blue-50'}>
                <TestTube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <Label className={isDarkMode ? 'text-slate-300' : 'text-gray-700'}>Model</Label>
            <Select value={config.model} onValueChange={value => setConfig({
            ...config,
            model: value
          })}>
              <SelectTrigger className={isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-300'}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className={isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}>
                {models.map(model => <SelectItem key={model.value} value={model.value}>
                    {model.label}
                  </SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className={isDarkMode ? 'text-slate-300' : 'text-gray-700'}>
              Temperature: {config.temperature}
            </Label>
            <Slider value={[config.temperature]} onValueChange={([value]) => setConfig({
            ...config,
            temperature: value
          })} max={2} min={0} step={0.1} className="mt-2" />
          </div>

          <div>
            <Label className={isDarkMode ? 'text-slate-300' : 'text-gray-700'}>Max Tokens</Label>
            <Input type="number" value={config.maxTokens} onChange={e => setConfig({
            ...config,
            maxTokens: parseInt(e.target.value) || 1000
          })} className={isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-300'} />
          </div>

          <div>
            <Label className={isDarkMode ? 'text-slate-300' : 'text-gray-700'}>
              System Prompt
              <span className={`text-xs block mt-1 mb-3 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                Defines the AI's behavior, personality, and response style for all conversations
              </span>
            </Label>
            <Textarea value={config.systemPrompt} onChange={e => setConfig({
            ...config,
            systemPrompt: e.target.value
          })} className={isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-300'} rows={3} />
          </div>

          <div className="flex space-x-2 pt-4">
            <Button onClick={handleSave} className="flex-1">
              Save Settings
            </Button>
            <Button variant="outline" onClick={() => onOpenChange(false)} className="text-slate-50 bg-gray-900 hover:bg-gray-800">
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>;
};