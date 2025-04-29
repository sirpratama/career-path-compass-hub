import React from 'react';
import { useState } from 'react';
import { QuizQuestion as QuestionType, QuizOption } from '../data/quizQuestions';

interface QuizQuestionProps {
  question: QuestionType;
  onAnswerSelected: (optionId: string) => void;
  selectedOption: string | null;
  isBackDisabled: boolean;
  isNextDisabled: boolean;
  onNext: () => void;
  onBack: () => void;
}

const QuizQuestion = ({ 
  question, 
  onAnswerSelected, 
  selectedOption, 
  isBackDisabled,
  isNextDisabled,
  onNext,
  onBack
}: QuizQuestionProps) => {
  
  // Function for normal state styles
  const getBaseStyles = (optionId: string) => {
    // Container styles
    const containerBaseClass = "p-3 rounded-lg border cursor-pointer transition-colors";
    
    // Selected state
    if (selectedOption === optionId) {
      return `${containerBaseClass} border-career-purple bg-career-purple bg-opacity-10`;
    }
    
    // Normal state
    return `${containerBaseClass} border-gray-200 dark:border-gray-700`;
  };
  
  // Function for hover state styles
  const getHoverStyles = (optionId: string) => {
    // No hover effect for selected option
    if (selectedOption === optionId) {
      return '';
    }
    
    // Hover styles for unselected options
    return 'hover:bg-gray-50 dark:hover:bg-gray-700';
  };
  
  // Function for radio button styles
  const getRadioStyles = (optionId: string) => {
    const baseClass = "w-6 h-6 rounded-full border-2 flex items-center justify-center";
    
    if (selectedOption === optionId) {
      return `${baseClass} border-career-purple bg-career-purple`;
    }
    
    return `${baseClass} border-gray-300 dark:border-gray-500`;
  };
  
  // Function for button styles
  const getButtonStyles = (isDisabled: boolean, isBackButton: boolean) => {
    const baseClass = "px-6 py-2 rounded-md font-medium";
    
    if (isDisabled) {
      return isBackButton 
        ? `${baseClass} bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500`
        : `${baseClass} bg-gray-300 text-white cursor-not-allowed dark:bg-gray-600`;
    }
    
    return isBackButton
      ? `${baseClass} bg-secondary text-primary hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-white-400`
      : `${baseClass} bg-career-purple text-white hover:bg-career-dark-purple transition-colors`;
  };

  const handleOptionChange = (optionId: string) => {
    onAnswerSelected(optionId);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md animate-fade-in">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">{question.text}</h2>
      
      <div className="space-y-3">
        {question.options.map((option) => (
          <div 
            key={option.id}
            className={`${getBaseStyles(option.id)} ${getHoverStyles(option.id)}`}
            onClick={() => handleOptionChange(option.id)}
          >
            <div className="flex items-center">
              <div className="mr-3 shrink-0">
                <div className={getRadioStyles(option.id)}>
                  {selectedOption === option.id && (
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  )}
                </div>
              </div>
              <div className="text-gray-800 dark:text-gray-200">{option.text}</div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          disabled={isBackDisabled}
          className={getButtonStyles(isBackDisabled, true)}
        >
          Back
        </button>
        
        <button
          onClick={onNext}
          disabled={isNextDisabled}
          className={getButtonStyles(isNextDisabled, false)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default QuizQuestion;