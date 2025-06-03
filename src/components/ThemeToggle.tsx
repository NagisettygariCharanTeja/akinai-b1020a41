
import React from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const ThemeToggle = () => {
  const { currentTheme, setTheme, getThemeColors } = useTheme();
  const colors = getThemeColors();
  const isDark = currentTheme === 'dark';

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={toggleTheme}
      className={`rounded-xl border transition-all duration-200 ${
        isDark 
          ? `text-${colors.textSecondary} hover:text-${colors.textPrimary} hover:bg-${colors.cardBg} border-${colors.border}` 
          : `text-${colors.textSecondary} hover:text-${colors.textPrimary} hover:bg-gray-100 border-${colors.border}`
      }`}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
};

export default ThemeToggle;
