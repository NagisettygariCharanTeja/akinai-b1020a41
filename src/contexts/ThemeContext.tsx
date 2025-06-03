
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type ThemeType = 'dark' | 'light';

interface ThemeContextType {
  currentTheme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  getThemeColors: () => ThemeColors;
}

interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  cardBg: string;
  textPrimary: string;
  textSecondary: string;
  border: string;
  gradient: string;
}

const themeConfigs: Record<ThemeType, ThemeColors> = {
  'dark': {
    primary: 'from-violet-600 to-purple-600',
    secondary: 'from-indigo-600 to-purple-600',
    accent: 'violet-500',
    background: 'slate-950',
    cardBg: 'slate-900/80',
    textPrimary: 'white',
    textSecondary: 'gray-400',
    border: 'slate-700/50',
    gradient: 'bg-gradient-to-br from-violet-600/20 to-purple-600/20'
  },
  'light': {
    primary: 'from-slate-600 to-gray-600',
    secondary: 'from-gray-600 to-slate-600',
    accent: 'slate-500',
    background: 'gray-50',
    cardBg: 'white/90',
    textPrimary: 'gray-900',
    textSecondary: 'gray-600',
    border: 'gray-200/50',
    gradient: 'bg-gradient-to-br from-gray-100/20 to-slate-100/20'
  }
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>('dark');

  const setTheme = (theme: ThemeType) => {
    setCurrentTheme(theme);
  };

  const getThemeColors = (): ThemeColors => {
    return themeConfigs[currentTheme];
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, getThemeColors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
