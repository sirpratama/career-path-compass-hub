// QuizQuestion.tsx - Updated with Dark Mode Support
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
  isDarkMode: boolean; // Add dark mode prop
}

const QuizQuestion = ({ 
  question, 
  onAnswerSelected, 
  selectedOption, 
  isBackDisabled,
  isNextDisabled,
  onNext,
  onBack,
  isDarkMode
}: QuizQuestionProps) => {
  
  const handleOptionChange = (optionId: string) => {
    onAnswerSelected(optionId);
  };

  return (
    <div className={`w-full max-w-3xl mx-auto p-6 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-lg shadow-md animate-fade-in transition-colors duration-300`}>
      <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{question.text}</h2>
      
      <div className="space-y-3">
        {question.options.map((option) => (
          <div 
            key={option.id}
            className={`${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} p-4 rounded-md cursor-pointer transition-colors duration-200 ${
              selectedOption === option.id 
                ? isDarkMode 
                  ? 'bg-gray-700 border-l-4 border-purple-400' 
                  : 'bg-gray-50 border-l-4 border-career-purple' 
                : `${isDarkMode ? 'bg-gray-800' : 'bg-white'} border-l-4 border-transparent`
            }`}
            onClick={() => handleOptionChange(option.id)}
          >
            <div className="flex items-center">
              <div className="mr-3 shrink-0">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedOption === option.id 
                    ? isDarkMode 
                      ? 'border-purple-400 bg-purple-400' 
                      : 'border-career-purple bg-career-purple' 
                    : isDarkMode 
                      ? 'border-gray-500' 
                      : 'border-gray-300'
                }`}>
                  {selectedOption === option.id && (
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  )}
                </div>
              </div>
              <div className={`${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>{option.text}</div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          disabled={isBackDisabled}
          className={`px-6 py-2 rounded-md font-medium transition-colors ${
            isBackDisabled 
              ? isDarkMode
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed' 
              : isDarkMode
                ? 'bg-gray-700 text-white hover:bg-gray-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Back
        </button>
        
        <button
          onClick={onNext}
          disabled={isNextDisabled}
          className={`px-6 py-2 rounded-md font-medium transition-colors ${
            isNextDisabled 
              ? isDarkMode
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-gray-300 text-white cursor-not-allowed' 
              : isDarkMode
                ? 'bg-purple-600 text-white hover:bg-purple-700'
                : 'bg-career-purple text-white hover:bg-career-dark-purple'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default QuizQuestion;