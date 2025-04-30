import { useState, useEffect } from 'react';
import { quizQuestions, QuizQuestion as QuizQuestionType } from '../data/quizQuestions';
import QuizQuestionComponent from './QuizQuestion';
import ProgressBar from './ProgressBar';
import ResultsPage from './ResultsPage';
import LandingPage from '../components/LandingPage';
import { careerPaths } from '../data/careerPaths';

interface QuizContainerProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

const QuizContainer = ({ isDarkMode, onToggleDarkMode }: QuizContainerProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [showResults, setShowResults] = useState(false);
  const [showLandingPage, setShowLandingPage] = useState(true);
  const [isTestMode, setIsTestMode] = useState(false);
  const [careerScores, setCareerScores] = useState<{ [key: string]: number }>({});

  const defaultTestScores = {
    "software-development": 10,
    "data-science": 8,
    "systems-analysis": 6,
    "project-management": 4,
    "ux-design": 9,
    "video-game-developer": 7,
    "cyber-security": 5
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('test') === 'results') {
      console.log("Test mode activated - showing results directly");
      setCareerScores(defaultTestScores);
      setShowResults(true);
      setShowLandingPage(false);
      setIsTestMode(true);
    }
  }, []);

  const handleGoToLandingPage = () => {
    setShowLandingPage(true);
    setShowResults(false);
  };

  const handleStartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setCareerScores({});
    setShowResults(false);
    setShowLandingPage(false);
  };

  const handleSkipToResults = () => {
    setCareerScores(defaultTestScores);
    setShowResults(true);
  };

  const handleAnswerSelected = (optionId: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [quizQuestions[currentQuestionIndex].id]: optionId
    }));
  };

  const handleNext = () => {
    if (!selectedAnswers[quizQuestions[currentQuestionIndex].id]) return;

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setCareerScores({});
    setShowResults(false);
    setShowLandingPage(false);
  };

  const calculateCareerScores = () => {
    const scores: { [key: string]: number } = {};
    Object.keys(careerPaths).forEach(careerId => {
      scores[careerId] = 0;
    });

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

  if (showLandingPage) {
    return <LandingPage onStartQuiz={handleStartQuiz} isDarkMode={isDarkMode} onToggleDarkMode={onToggleDarkMode} />;
  }

  if (showResults) {
    const finalScores = Object.keys(careerScores).length > 0 ? careerScores : calculateCareerScores();
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} p-6`}>
        <button
          onClick={handleGoToLandingPage}
          aria-label="Go to landing page"
          className={`mb-6 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-career-purple bg-transparent border-none cursor-pointer`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className={`h-8 w-8 ${isDarkMode ? 'text-purple-400 hover:text-purple-300' : 'text-career-purple hover:text-career-dark-purple'} transition-colors`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
            />
          </svg>
          <span className={`text-lg font-semibold ${isDarkMode ? 'text-purple-400' : 'text-career-purple'}`}>Home</span>
        </button>
        <ResultsPage careerScores={finalScores} onRestartQuiz={handleRestartQuiz} isDarkMode={isDarkMode} onToggleDarkMode={onToggleDarkMode} />
      </div>
    );
  }

  const currentQuestion: QuizQuestionType = quizQuestions[currentQuestionIndex];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} p-6`}>
      <button
        onClick={handleGoToLandingPage}
        aria-label="Go to landing page"
        className={`mb-6 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-career-purple bg-transparent border-none cursor-pointer`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className={`h-8 w-8 ${isDarkMode ? 'text-purple-400 hover:text-purple-300' : 'text-career-purple hover:text-career-dark-purple'} transition-colors`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
          />
        </svg>
        <span className={`text-lg font-semibold ${isDarkMode ? 'text-purple-400' : 'text-career-purple'}`}>Home</span>
      </button>

      <ProgressBar 
        currentQuestionIndex={currentQuestionIndex} 
        totalQuestions={quizQuestions.length}
        isDarkMode={isDarkMode}
      />

      <QuizQuestionComponent
        question={currentQuestion}
        onAnswerSelected={handleAnswerSelected}
        selectedOption={selectedAnswers[currentQuestion.id] || null}
        isBackDisabled={currentQuestionIndex === 0}
        isNextDisabled={!selectedAnswers[currentQuestion.id]}
        onNext={handleNext}
        onBack={handleBack}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};

export default QuizContainer;