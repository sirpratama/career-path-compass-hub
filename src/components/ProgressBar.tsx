import React from 'react';

interface ProgressBarProps {
  currentQuestionIndex: number;
  totalQuestions: number;
  isDarkMode: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  currentQuestionIndex, 
  totalQuestions,
  isDarkMode
}) => {
  // Make sure totalQuestions is at least 1 to avoid division by zero
  const safeTotal = Math.max(1, totalQuestions);
  // Calculate progress percentage
  const progress = Math.round(((currentQuestionIndex + 1) / safeTotal) * 100);
  
  return (
    <div className="w-full mb-6">
      <div className={`flex justify-between text-sm mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
        <span>{progress}% Complete</span>
      </div>
      
      <div className={`w-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2.5`}>
        <div 
          className={`${isDarkMode ? 'bg-purple-400' : 'bg-career-purple'} h-2.5 rounded-full transition-all duration-500 ease-in-out`}
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;