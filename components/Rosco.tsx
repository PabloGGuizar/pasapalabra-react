
import React from 'react';
import { RoscoItem, AnswerStatus } from '../types';

interface RoscoProps {
  items: RoscoItem[];
  currentLetterDisplay: string;
}

const getStatusColor = (status: AnswerStatus, isCurrent: boolean): string => {
  if (isCurrent) {
    return 'bg-blue-500 dark:bg-blue-400 border-2 border-blue-700 dark:border-blue-200 text-white dark:text-black';
  }
  switch (status) {
    case 'correct':
      return 'bg-green-500 dark:bg-green-400 text-white dark:text-black';
    case 'incorrect':
      return 'bg-red-500 dark:bg-red-400 text-white dark:text-black';
    case 'passed':
      return 'bg-yellow-500 dark:bg-yellow-400 text-black';
    case 'pending':
    default:
      return 'bg-slate-300 dark:bg-slate-600 text-slate-800 dark:text-slate-200';
  }
};

const Rosco: React.FC<RoscoProps> = ({ items, currentLetterDisplay }) => {
  const roscoSize = Math.min(window.innerWidth * 0.9, window.innerHeight * 0.4, 400); // Responsive size
  const radius = roscoSize / 2 - 20; // 20 for letter size
  const center = roscoSize / 2;

  return (
    <div className="relative flex justify-center items-center p-4" style={{ width: `${roscoSize}px`, height: `${roscoSize}px` }}>
      {/* Central Letter Display */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <span className="text-6xl md:text-8xl font-bold text-primary-600 dark:text-primary-400">
          {currentLetterDisplay}
        </span>
      </div>

      {/* Letter Cells */}
      {items.map((item, index) => {
        const angle = (index / items.length) * 2 * Math.PI - Math.PI / 2; // Start from top
        const x = center + radius * Math.cos(angle) - 16; // 16 for half of letter cell width
        const y = center + radius * Math.sin(angle) - 16; // 16 for half of letter cell height

        return (
          <div
            key={item.letter}
            className={`absolute w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full font-bold text-sm md:text-lg shadow-md transition-all duration-300 ${getStatusColor(item.status, item.isCurrent)}`}
            style={{
              left: `${x}px`,
              top: `${y}px`,
              transform: item.isCurrent ? 'scale(1.2)' : 'scale(1)',
              zIndex: item.isCurrent ? 10 : 0, // Current letter circle on top of others
            }}
          >
            {item.letter}
          </div>
        );
      })}
    </div>
  );
};

export default Rosco;
