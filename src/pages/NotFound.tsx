import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const NotFound = () => {
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Log error for analytics
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    // Check for dark mode preference
    const darkModePreference = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(darkModePreference);
    
    // Apply dark mode class if needed
    if (darkModePreference) {
      document.documentElement.classList.add('dark');
    }
  }, [location.pathname]);

  return (
    <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="text-center">
        <h1 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : ''}`}>404</h1>
        <p className={`text-xl mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Oops! Page not found</p>
        <a href="/" className={`${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-500 hover:text-blue-700'} underline`}>
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
