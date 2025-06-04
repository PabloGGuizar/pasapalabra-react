import React, { useState, useEffect } from 'react';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
// ThemeSwitcher is now rendered within StartScreen and GameScreen, not globally in App.tsx
import { Theme } from './types';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<'initial' | 'playing'>('initial');
  const [theme, setTheme] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem('theme');
    return (storedTheme as Theme) || 'system';
  });

  useEffect(() => {
    const applyTheme = (t: Theme) => {
      if (t === 'dark' || (t === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    applyTheme(theme);
    localStorage.setItem('theme', theme);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (localStorage.getItem('theme') === 'system') {
         applyTheme('system');
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);


  const handleStartGame = () => {
    setGameState('playing');
  };

  const handleReturnToStart = () => {
    setGameState('initial');
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 transition-colors duration-300">
      {gameState === 'initial' && <StartScreen onStartGame={handleStartGame} currentTheme={theme} setTheme={setTheme} />}
      {gameState === 'playing' && <GameScreen currentTheme={theme} setTheme={setTheme} onGoToStart={handleReturnToStart} />}
    </div>
  );
};

export default App;