
import { useState } from "react";
import LandingPage from "../components/LandingPage";
import QuizContainer from "../components/QuizContainer";

const Index = () => {
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  
  const handleStartQuiz = () => {
    setIsQuizStarted(true);
    // Scroll to top when starting quiz
    window.scrollTo(0, 0);
  };
  
  return (
    <div>
      {isQuizStarted ? (
        <QuizContainer />
      ) : (
        <LandingPage onStartQuiz={handleStartQuiz} />
      )}
    </div>
  );
};

export default Index;
