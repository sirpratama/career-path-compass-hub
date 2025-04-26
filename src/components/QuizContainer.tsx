
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { quizQuestions, QuizQuestion as QuizQuestionType } from '../data/quizQuestions';
import QuizQuestionComponent from './QuizQuestion';
import ProgressBar from './ProgressBar';
import ResultsPage from './ResultsPage';
import { careerPaths } from '../data/careerPaths';

const QuizContainer = () => {
  // Keep track of current question index
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  // Store selected answers
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  
  // Flag to show results
  const [showResults, setShowResults] = useState(false);
  
  // Current question
  const currentQuestion: QuizQuestionType = quizQuestions[currentQuestionIndex];
  
  // Handle answer selection
  const handleAnswerSelected = (optionId: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionId
    }));
  };
  
  // Handle next button click
  const handleNext = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Calculate results and show results page
      setShowResults(true);
    }
  };
  
  // Handle back button click
  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };
  
  // Handle restart quiz
  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
  };
  
  // Calculate career scores based on answers
  const calculateCareerScores = () => {
    // Initialize scores object with all careers at 0
    const scores: { [key: string]: number } = {};
    Object.keys(careerPaths).forEach(careerId => {
      scores[careerId] = 0;
    });
    
    // Tally scores based on selected answers
    Object.entries(selectedAnswers).forEach(([questionId, optionId]) => {
      const question = quizQuestions.find(q => q.id === parseInt(questionId));
      if (question) {
        const option = question.options.find(o => o.id === optionId);
        if (option) {
          Object.entries(option.careerPoints).forEach(([careerId, points]) => {
            scores[careerId] = (scores[careerId] || 0) + points;
          });
        }
      }
    });
    
    return scores;
  };
  
  // If showing results, render the results page
  if (showResults) {
    const careerScores = calculateCareerScores();
    return <ResultsPage careerScores={careerScores} onRestartQuiz={handleRestartQuiz} />;
  }
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl relative">
      <Link 
        to="/" 
        className="absolute top-0 left-0 m-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Return to Home"
      >
        <Home className="h-6 w-6 text-gray-600" />
      </Link>
      
      <ProgressBar 
        currentQuestion={currentQuestionIndex + 1} 
        totalQuestions={quizQuestions.length} 
      />
      
      <QuizQuestionComponent
        question={currentQuestion}
        onAnswerSelected={handleAnswerSelected}
        selectedOption={selectedAnswers[currentQuestion.id] || null}
        isBackDisabled={currentQuestionIndex === 0}
        isNextDisabled={!selectedAnswers[currentQuestion.id]}
        onNext={handleNext}
        onBack={handleBack}
      />
    </div>
  );
};

export default QuizContainer;
