import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ResourcesSection from './ResourceSection';

interface LandingPageProps {
  onStartQuiz: () => void;
}

const LandingPage = ({ onStartQuiz }: LandingPageProps) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredNavIndex, setHoveredNavIndex] = useState<number | null>(null);
  const [activeNavIndex, setActiveNavIndex] = useState(0);
  const [hoverStyle, setHoverStyle] = useState({});
  const [activeStyle, setActiveStyle] = useState({ left: "0px", width: "0px" });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navItems = ["About", "Resources", "Login", "Sign Up"];
  const navRefs = useRef<(HTMLLIElement | null)[]>([]);
  
  useEffect(() => {
    if (hoveredNavIndex !== null) {
      const hoveredElement = navRefs.current[hoveredNavIndex];
      if (hoveredElement) {
        const { offsetLeft, offsetWidth } = hoveredElement;
        setHoverStyle({
          left: `${offsetLeft}px`,
          width: `${offsetWidth}px`,
        });
      }
    }
  }, [hoveredNavIndex]);

  useEffect(() => {
    const activeElement = navRefs.current[activeNavIndex];
    if (activeElement) {
      const { offsetLeft, offsetWidth } = activeElement;
      setActiveStyle({
        left: `${offsetLeft}px`,
        width: `${offsetWidth}px`,
      });
    }
  }, [activeNavIndex]);

  useEffect(() => {
    requestAnimationFrame(() => {
      const firstElement = navRefs.current[0];
      if (firstElement) {
        const { offsetLeft, offsetWidth } = firstElement;
        setActiveStyle({
          left: `${offsetLeft}px`,
          width: `${offsetWidth}px`,
        });
      }
    });
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleNavClick = (index: number) => {
    setActiveNavIndex(index);
    
    // Handle navigation based on nav item clicked
    switch (index) {
      case 0: // About
        // Scroll to About section
        document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 1: // Resources
        // Scroll to Resources section
        document.getElementById('resources-section')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 2: // Login
        navigate('/login');
        break;
      case 3: // Sign Up
        navigate('/signup');
        break;
      default:
        break;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? "dark bg-gray-900 text-white" : ""}`}>
      <header className={`${isDarkMode ? "bg-gray-800" : "bg-white"} shadow-sm py-4`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              className={`h-8 w-8 ${isDarkMode ? "text-purple-400" : "text-career-purple"} mr-2`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <h1 className="text-xl font-bold">Career Path Compass</h1>
          </div>
          
          <div className="flex items-center">
            <nav className="mr-6">
              <div className="relative">
                {/* Hover Highlight */}
                <div
                  className={`absolute h-[30px] transition-all duration-300 ease-out ${isDarkMode ? "bg-gray-700" : "bg-gray-100"} rounded-[6px] flex items-center`}
                  style={{
                    ...hoverStyle,
                    opacity: hoveredNavIndex !== null ? 1 : 0,
                  }}
                />

                {/* Active Indicator */}
                <div
                  className={`absolute bottom-[-6px] h-[2px] ${isDarkMode ? "bg-white" : "bg-career-purple"} transition-all duration-300 ease-out`}
                  style={activeStyle}
                />

                {/* Navigation Items */}
                <ul className="relative flex space-x-6 items-center">
                  {navItems.map((item, index) => (
                    <li
                      key={index}
                      ref={(el: HTMLLIElement | null) => {
                        navRefs.current[index] = el;
                      }}
                      className={`px-3 py-2 cursor-pointer transition-colors duration-300 h-[30px] ${
                        index === activeNavIndex 
                          ? isDarkMode ? "text-white" : "text-career-purple font-medium" 
                          : isDarkMode ? "text-gray-300" : "text-gray-600"
                      } ${index === 3 ? (isDarkMode ? "text-purple-400" : "text-career-purple") : ""}`}
                      onMouseEnter={() => setHoveredNavIndex(index)}
                      onMouseLeave={() => setHoveredNavIndex(null)}
                      onClick={() => handleNavClick(index)}
                    >
                      <span className="text-sm whitespace-nowrap flex items-center justify-center h-full">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
            
            <button 
              className="rounded-full p-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
              onClick={toggleDarkMode}
            >
              {isDarkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>
      
      <main className={`flex-grow ${isDarkMode ? "bg-gray-900" : ""}`}>
        {/* Hero Section */}
        <section id="about-section" className={`${isDarkMode ? "bg-gradient-to-br from-gray-900 to-purple-900" : "bg-gradient-to-br from-white to-career-light-purple"} py-16 md:py-24`}>
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
                <h2 className={`text-4xl md:text-5xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"} mb-4`}>Find Your Perfect Tech Career Path</h2>
                <p className={`text-lg ${isDarkMode ? "text-gray-300" : "text-gray-600"} mb-8 max-w-lg`}>Take our personalized quiz to discover tech roles that match your skills, interests, and working style. Get resources to get started right away.</p>
                <button
                  onClick={onStartQuiz}
                  className={`text-lg ${isDarkMode ? "bg-purple-600 hover:bg-purple-700" : "bg-career-purple hover:bg-career-dark-purple"} text-white font-medium py-4 px-8 rounded-md transition-all transform ${isHovered ? 'scale-105' : ''}`}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  Start Your Career Quiz
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 inline-block ml-2" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              <div className="md:w-1/2">
                <img 
                  src="/api/placeholder/600/400" 
                  alt="Career exploration" 
                  className="rounded-lg shadow-xl"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80";
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Pass isDarkMode to ResourcesSection */}
        <ResourcesSection isDarkMode={isDarkMode} />
        
        {/* Features Section */}
        <section className={`py-16 ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
          {/* Features content here */}
        </section>
          
        {/* Testimonials */}
        <section className={`py-16 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className={`text-3xl font-bold text-center mb-12 ${isDarkMode ? "text-white" : ""}`}>Success Stories</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className={`${isDarkMode ? "bg-gray-800" : "bg-white"} p-6 rounded-lg shadow-md`}>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-career-purple rounded-full flex items-center justify-center text-white font-bold text-xl">
                    J
                  </div>
                  <div className="ml-4">
                    <h3 className={`font-semibold ${isDarkMode ? "text-white" : ""}`}>Jamie Chen</h3>
                    <p className="text-gray-500 text-sm">Software Developer</p>
                  </div>
                </div>
                <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>"The career quiz helped me realize my analytical skills were perfect for software development. The resources provided gave me a clear path to follow, and now I'm working as a junior developer at a tech startup!"</p>
              </div>
              
              <div className={`${isDarkMode ? "bg-gray-800" : "bg-white"} p-6 rounded-lg shadow-md`}>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-career-green rounded-full flex items-center justify-center text-white font-bold text-xl">
                    M
                  </div>
                  <div className="ml-4">
                    <h3 className={`font-semibold ${isDarkMode ? "text-white" : ""}`}>Misha Patel</h3>
                    <p className="text-gray-500 text-sm">UX Designer</p>
                  </div>
                </div>
                <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>"I was unsure which path to take in tech. The career quiz matched me with UX design, which perfectly combines my creative and problem-solving skills. The learning resources were incredibly helpful!"</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-gray-800 text-white py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  className="h-6 w-6 mr-2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <h2 className="text-lg font-bold">Career Path Compass</h2>
              </div>
              <p className="mt-2 text-gray-400 text-sm">Guiding you to your ideal tech career path.</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider">Resources</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white text-sm">Career Paths</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white text-sm">Learning Materials</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white text-sm">Industry Guides</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider">Company</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white text-sm">About Us</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white text-sm">Contact</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white text-sm">Privacy Policy</a></li>
                </ul>
              </div>
              
              <div className="col-span-2 md:col-span-1">
                <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider">Stay Updated</h3>
                <p className="text-gray-400 text-sm mb-4">Get notified about new resources and features.</p>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="px-4 py-2 w-full rounded-l-md bg-gray-700 text-white focus:outline-none"
                  />
                  <button className={`${isDarkMode ? "bg-purple-600 hover:bg-purple-700" : "bg-career-purple hover:bg-career-dark-purple"} px-4 py-2 rounded-r-md transition-colors`}>
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-700 text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} Career Path Compass. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;