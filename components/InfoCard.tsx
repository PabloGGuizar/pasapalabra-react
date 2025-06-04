
import React, { useState, useEffect, useRef } from 'react';
import Icon from './Icon';

interface InfoCardProps {
  timeLeft: number;
  correctAnswers: number;
  incorrectAnswers: number;
  currentClue: string;
  currentLetter: string;
  onAnswer: (answer: string) => void;
  onPass: () => void;
  onRestart: () => void;
  isGameOver: boolean;
}

const InfoCard: React.FC<InfoCardProps> = ({
  timeLeft,
  correctAnswers,
  incorrectAnswers,
  currentClue,
  currentLetter,
  onAnswer,
  onPass,
  onRestart,
  isGameOver,
}) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isGameOver && inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentClue, isGameOver]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isGameOver) {
      onAnswer(inputValue.trim());
      setInputValue('');
    }
  };

  const handlePass = () => {
    if (!isGameOver) {
      onPass();
      setInputValue('');
    }
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="w-full bg-white dark:bg-slate-800 p-6 rounded-lg shadow-xl flex flex-col space-y-4">
      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-xs uppercase text-slate-500 dark:text-slate-400">Tiempo</div>
          <div className={`text-2xl font-bold ${timeLeft <= 10 && timeLeft > 0 ? 'text-red-500 animate-pulse' : 'text-primary-600 dark:text-primary-400'}`}>
            {formatTime(timeLeft)}
          </div>
        </div>
        <div>
          <div className="text-xs uppercase text-slate-500 dark:text-slate-400">Aciertos</div>
          <div className="text-2xl font-bold text-green-500">{correctAnswers}</div>
        </div>
        <div>
          <div className="text-xs uppercase text-slate-500 dark:text-slate-400">Fallos</div>
          <div className="text-2xl font-bold text-red-500">{incorrectAnswers}</div>
        </div>
      </div>

      {/* Clue Section */}
      <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded-md min-h-[80px] flex flex-col justify-center">
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-1">
          {currentLetter ? `Con la ${currentLetter}:` : 'Juego terminado'}
        </p>
        <p className="text-slate-800 dark:text-slate-100 font-medium text-base">
          {isGameOver ? (correctAnswers === ALPHABET_ES.length ? '¡Has ganado! ¡Felicidades!' : '¡Juego Terminado!') : currentClue}
        </p>
      </div>
      
      {/* Input and Actions */}
      {!isGameOver && (
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.toUpperCase())}
            placeholder="Escribe tu respuesta aquí..."
            className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
            disabled={isGameOver}
          />
          <div className="grid grid-cols-2 gap-3">
            <button
              type="submit"
              className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 rounded-md transition-colors duration-150 disabled:opacity-50"
              disabled={isGameOver || !inputValue.trim()}
            >
              Responder
            </button>
            <button
              type="button"
              onClick={handlePass}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 rounded-md transition-colors duration-150 disabled:opacity-50"
              disabled={isGameOver}
            >
              Pasapalabra
            </button>
          </div>
        </form>
      )}

      {/* Restart Button */}
      <button
        onClick={onRestart}
        className="w-full mt-2 bg-slate-500 hover:bg-slate-600 dark:bg-slate-600 dark:hover:bg-slate-500 text-white font-semibold py-3 rounded-md transition-colors duration-150 flex items-center justify-center space-x-2"
      >
        <Icon name="restart" size={20} />
        <span>{isGameOver ? 'Jugar de Nuevo' : 'Reiniciar Juego'}</span>
      </button>
    </div>
  );
};
// Dummy ALPHABET_ES for InfoCard props check, actual one used in GameScreen
const ALPHABET_ES = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");
export default InfoCard;
