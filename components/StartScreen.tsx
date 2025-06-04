import React from 'react';
import ThemeSwitcher from './ThemeSwitcher';
import { Theme } from '../types';

interface StartScreenProps {
  onStartGame: () => void;
  currentTheme: Theme;
  setTheme: (theme: Theme) => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStartGame, currentTheme, setTheme }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-primary-500 to-primary-700 dark:from-primary-700 dark:to-primary-900 text-white">
      <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-2xl max-w-lg transform hover:scale-105 transition-transform duration-300 mb-6">
        <h1 className="text-5xl font-bold mb-6 text-primary-600 dark:text-primary-400">¡Bienvenido a Pasapalabra!</h1>
        <div className="text-left text-slate-700 dark:text-slate-300 space-y-3 mb-8">
          <p className="text-lg">
            El objetivo del juego es acertar todas las palabras del rosco.
          </p>
          <ul className="list-disc list-inside space-y-1 pl-4">
            <li>Dispones de <strong>180 segundos</strong> para completar el rosco.</li>
            <li>Por cada letra, se te dará una pista.</li>
            <li>Escribe tu respuesta y pulsa "Responder".</li>
            <li>Si no sabes la respuesta, pulsa "Pasapalabra" para pasar a la siguiente.</li>
            <li>Puedes volver a las palabras pasadas si te queda tiempo.</li>
            <li>El juego termina cuando aciertas todas las palabras o se acaba el tiempo.</li>
          </ul>
          <p className="text-lg font-semibold">¡Mucha suerte!</p>
        </div>
        <button
          onClick={onStartGame}
          className="w-full bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-xl shadow-lg transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800"
        >
          Comenzar Juego
        </button>
      </div>
      <ThemeSwitcher currentTheme={currentTheme} setTheme={setTheme} />
    </div>
  );
};

export default StartScreen;