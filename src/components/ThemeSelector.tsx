
import React from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Palette } from 'lucide-react';
import { useTheme, ThemeType } from '@/contexts/ThemeContext';

const ThemeSelector = () => {
  const { currentTheme, setTheme, getThemeColors } = useTheme();
  const colors = getThemeColors();

  const themes = [
    { id: 'premium-dark' as ThemeType, name: 'Premium Dark', color: 'violet' },
    { id: 'chatgpt' as ThemeType, name: 'ChatGPT', color: 'emerald' },
    { id: 'gemini' as ThemeType, name: 'Gemini', color: 'blue' },
    { id: 'claude' as ThemeType, name: 'Claude', color: 'orange' },
    { id: 'opennote' as ThemeType, name: 'OpenNote', color: 'slate' }
  ];

  const isDark = currentTheme !== 'opennote';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className={`rounded-xl border transition-all duration-200 ${
            isDark 
              ? `text-${colors.textSecondary} hover:text-${colors.textPrimary} hover:bg-${colors.cardBg} border-${colors.border}` 
              : `text-${colors.textSecondary} hover:text-${colors.textPrimary} hover:bg-gray-100 border-${colors.border}`
          }`}
        >
          <Palette className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className={`rounded-xl shadow-xl backdrop-blur-md ${
          isDark 
            ? `bg-${colors.cardBg} border-${colors.border}` 
            : `bg-${colors.cardBg} border-${colors.border}`
        }`}
      >
        {themes.map((theme) => (
          <DropdownMenuItem
            key={theme.id}
            onClick={() => setTheme(theme.id)}
            className={`rounded-lg cursor-pointer transition-all duration-200 ${
              currentTheme === theme.id 
                ? `bg-gradient-to-r ${colors.primary} text-white` 
                : isDark 
                  ? `text-${colors.textSecondary} hover:text-${colors.textPrimary} hover:bg-slate-800/50`
                  : `text-${colors.textSecondary} hover:text-${colors.textPrimary} hover:bg-gray-100`
            }`}
          >
            <div className={`w-3 h-3 rounded-full bg-${theme.color}-500 mr-3`} />
            {theme.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSelector;
