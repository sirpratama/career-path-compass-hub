
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
  
  const handleOptionChange = (optionId: string) => {
    onAnswerSelected(optionId);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md animate-fade-in">
      <h2 className="text-2xl font-bold mb-6">{question.text}</h2>
      
      <div className="space-y-3">
        {question.options.map((option) => (
          <div 
            key={option.id}
            className={`quiz-option ${selectedOption === option.id ? 'quiz-option-selected' : ''}`}
            onClick={() => handleOptionChange(option.id)}
          >
            <div className="flex items-center">
              <div className="mr-3 shrink-0">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedOption === option.id 
                    ? 'border-career-purple bg-career-purple' 
                    : 'border-gray-300'
                }`}>
                  {selectedOption === option.id && (
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  )}
                </div>
              </div>
              <div className="quiz-option-text">{option.text}</div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          disabled={isBackDisabled}
          className={`px-6 py-2 rounded-md font-medium ${
            isBackDisabled 
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
              : 'bg-secondary text-primary hover:bg-gray-200'
          }`}
        >
          Back
        </button>
        
        <button
          onClick={onNext}
          disabled={isNextDisabled}
          className={`px-6 py-2 rounded-md font-medium ${
            isNextDisabled 
              ? 'bg-gray-300 text-white cursor-not-allowed' 
              : 'bg-career-purple text-white hover:bg-career-dark-purple transition-colors'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default QuizQuestion;
