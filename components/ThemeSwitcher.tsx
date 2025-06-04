
import React from 'react';
import { Theme } from '../types';

interface ThemeSwitcherProps {
  currentTheme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ currentTheme, setTheme }) => {
  const themes: { name: string; value: Theme }[] = [
    { name: 'Claro', value: 'light' },
    { name: 'Oscuro', value: 'dark' },
    { name: 'Sistema', value: 'system' },
  ];

  return (
    <div className="flex items-center space-x-2 p-2 bg-slate-200 dark:bg-slate-800 rounded-md">
      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Tema:</span>
      {themes.map((themeOption) => (
        <button
          key={themeOption.value}
          onClick={() => setTheme(themeOption.value)}
          className={`px-3 py-1 text-sm rounded-md transition-colors
            ${
              currentTheme === themeOption.value
                ? 'bg-primary-500 text-white'
                : 'bg-slate-300 dark:bg-slate-700 hover:bg-primary-400 dark:hover:bg-primary-600 text-slate-800 dark:text-slate-200'
            }`}
        >
          {themeOption.name}
        </button>
      ))}
    </div>
  );
};

export default ThemeSwitcher;
