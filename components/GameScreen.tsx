import React, { useState, useEffect, useCallback } from 'react';
import { QuestionWithStatus, AnswerStatus, RoscoItem, Theme } from '../types';
import { getInitialQuestions } from '../data/questions';
import { INITIAL_TIME, ALPHABET_ES } from '../constants';
import Rosco from './Rosco';
import InfoCard from './InfoCard';
import ThemeSwitcher from './ThemeSwitcher';

interface GameScreenProps {
  currentTheme: Theme;
  setTheme: (theme: Theme) => void;
  onGoToStart: () => void; // New prop to navigate to start screen
}

const GameScreen: React.FC<GameScreenProps> = ({ currentTheme, setTheme, onGoToStart }) => {
  const [questions, setQuestions] = useState<QuestionWithStatus[]>(getInitialQuestions());
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(INITIAL_TIME);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  const findNextQuestionIndex = useCallback((startIndex: number, currentQuestions: QuestionWithStatus[]): number => {
    let nextIndex = startIndex;
    let loopedOnce = false;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      nextIndex = (nextIndex + 1) % currentQuestions.length;
      if (currentQuestions[nextIndex].status === 'pending' || currentQuestions[nextIndex].status === 'passed') {
        return nextIndex;
      }
      if (nextIndex === startIndex) { 
        if (loopedOnce) { 
            const allDone = currentQuestions.every(q => q.status === 'correct' || q.status === 'incorrect');
            if (allDone) return -1; 
        }
        loopedOnce = true;
      }
    }
  }, []);

  const moveToNextQuestion = useCallback(() => {
    const nextIndex = findNextQuestionIndex(activeQuestionIndex, questions);
    if (nextIndex === -1 || questions.every(q => q.status === 'correct' || q.status === 'incorrect')) {
      setIsGameOver(true);
    } else {
      setActiveQuestionIndex(nextIndex);
    }
  }, [activeQuestionIndex, questions, findNextQuestionIndex]);
  
  useEffect(() => {
    if (gameStarted && !isGameOver && timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timerId);
    } else if (timeLeft <= 0 && !isGameOver) { // Changed to <= 0 for robustness
      setIsGameOver(true);
    }
  }, [timeLeft, isGameOver, gameStarted]);

  useEffect(() => {
    const firstPending = questions.findIndex(q => q.status === 'pending');
    setActiveQuestionIndex(firstPending !== -1 ? firstPending : 0);
    setGameStarted(true);
    setTimeLeft(INITIAL_TIME); // Ensure time is reset when component mounts (e.g. after returning from start screen)
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
    setIsGameOver(false);
    setQuestions(getInitialQuestions()); // Ensure questions are reset
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount. GameScreen re-mounts when gameState changes from 'initial' to 'playing'.


  const handleAnswer = (answer: string) => {
    if (isGameOver) return;
    const currentQuestion = questions[activeQuestionIndex];
    const newQuestions = [...questions];
    if (answer.toUpperCase() === currentQuestion.answer.toUpperCase()) {
      newQuestions[activeQuestionIndex].status = 'correct';
      setCorrectAnswers(prev => prev + 1);
    } else {
      newQuestions[activeQuestionIndex].status = 'incorrect';
      setIncorrectAnswers(prev => prev + 1);
    }
    setQuestions(newQuestions);
    
    if (newQuestions.every(q => q.status === 'correct' || q.status === 'incorrect')) {
        setIsGameOver(true);
    } else {
        moveToNextQuestion();
    }
  };

  const handlePass = () => {
    if (isGameOver) return;
    const newQuestions = [...questions];
    newQuestions[activeQuestionIndex].status = 'passed';
    setQuestions(newQuestions);
    moveToNextQuestion();
  };

  const handleRestart = () => {
    onGoToStart(); // Call the function passed from App.tsx
  };

  const roscoItems: RoscoItem[] = questions.map((q, index) => ({
    letter: q.letter,
    status: q.status,
    isCurrent: index === activeQuestionIndex && !isGameOver,
  }));
  
  const currentQuestionData = questions[activeQuestionIndex];

  return (
    <div className="flex flex-col md:flex-row min-h-screen p-4 gap-4 items-center md:items-start justify-center bg-slate-100 dark:bg-slate-900">
      <div className="w-full md:w-auto flex justify-center items-center md:flex-shrink-0">
        <Rosco 
            items={roscoItems} 
            currentLetterDisplay={!isGameOver && currentQuestionData ? currentQuestionData.letter : (correctAnswers === ALPHABET_ES.length ? '🏆' : '⏳')}
        />
      </div>
      <div className="w-full md:max-w-md lg:max-w-lg flex-grow flex flex-col items-center">
        <InfoCard
          timeLeft={timeLeft}
          correctAnswers={correctAnswers}
          incorrectAnswers={incorrectAnswers}
          currentClue={!isGameOver && currentQuestionData ? currentQuestionData.clue : ""}
          currentLetter={!isGameOver && currentQuestionData ? currentQuestionData.letter : ""}
          onAnswer={handleAnswer}
          onPass={handlePass}
          onRestart={handleRestart}
          isGameOver={isGameOver}
        />
        <div className="mt-4">
          <ThemeSwitcher currentTheme={currentTheme} setTheme={setTheme} />
        </div>
      </div>
    </div>
  );
};

export default GameScreen;