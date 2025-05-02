import { useState, useEffect } from "react";
import LandingPage from "../components/LandingPage";
import QuizContainer from "../components/QuizContainer";

const Index = () => {
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Load dark mode preference from localStorage on initial render
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedDarkMode);
    
    // Apply dark mode class to document if needed
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);
  
  const handleToggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    // Save preference to localStorage
    localStorage.setItem('darkMode', newDarkMode.toString());
    
    // Apply or remove the 'dark' class from the document element
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };
  
  const handleStartQuiz = () => {
    setIsQuizStarted(true);
    // Scroll to top when starting quiz
    window.scrollTo(0, 0);
  };
  
  return (
    <div>
      {isQuizStarted ? (
        <QuizContainer isDarkMode={isDarkMode} onToggleDarkMode={handleToggleDarkMode} />
      ) : (
        <LandingPage onStartQuiz={handleStartQuiz} isDarkMode={isDarkMode} onToggleDarkMode={handleToggleDarkMode} />
      )}
    </div>
  );
};

export default Index;
