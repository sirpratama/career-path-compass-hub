
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface LandingPageProps {
  onStartQuiz: () => void;
}

const LandingPage = ({ onStartQuiz }: LandingPageProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              className="h-8 w-8 text-career-purple mr-2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <h1 className="text-xl font-bold">Career Path Compass</h1>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#" className="text-gray-600 hover:text-career-purple">About</a></li>
              <li><a href="#" className="text-gray-600 hover:text-career-purple">Resources</a></li>
              <li><Link to="/login" className="text-gray-600 hover:text-career-purple">Login</Link></li>
              <li><Link to="/signup" className="font-medium text-career-purple hover:text-career-dark-purple">Sign Up</Link></li>
            </ul>
          </nav>
        </div>
      </header>
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-white to-career-light-purple py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Find Your Perfect Tech Career Path</h2>
                <p className="text-lg text-gray-600 mb-8 max-w-lg">Take our personalized quiz to discover tech roles that match your skills, interests, and working style. Get resources to get started right away.</p>
                <button
                  onClick={onStartQuiz}
                  className={`text-lg bg-career-purple hover:bg-career-dark-purple text-white font-medium py-4 px-8 rounded-md transition-all transform ${isHovered ? 'scale-105' : ''}`}
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
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                  alt="Career exploration" 
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-10">
              <div className="text-center">
                <div className="bg-career-light-purple w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-8 w-8 text-career-purple" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Take the Quiz</h3>
                <p className="text-gray-600">Answer questions about your preferences, skills, and working style.</p>
              </div>
              
              <div className="text-center">
                <div className="bg-career-light-purple w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-8 w-8 text-career-purple" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Get Results</h3>
                <p className="text-gray-600">Receive personalized career recommendations matched to your profile.</p>
              </div>
              
              <div className="text-center">
                <div className="bg-career-light-purple w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-8 w-8 text-career-purple" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Explore Resources</h3>
                <p className="text-gray-600">Access curated learning materials to start your journey in each career path.</p>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <button
                onClick={onStartQuiz}
                className="bg-career-purple hover:bg-career-dark-purple text-white font-medium py-3 px-6 rounded-md transition-colors"
              >
                Start Your Career Quiz
              </button>
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12">Success Stories</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-career-purple rounded-full flex items-center justify-center text-white font-bold text-xl">
                    J
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold">Jamie Chen</h3>
                    <p className="text-gray-500 text-sm">Software Developer</p>
                  </div>
                </div>
                <p className="text-gray-600">"The career quiz helped me realize my analytical skills were perfect for software development. The resources provided gave me a clear path to follow, and now I'm working as a junior developer at a tech startup!"</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-career-green rounded-full flex items-center justify-center text-white font-bold text-xl">
                    M
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold">Misha Patel</h3>
                    <p className="text-gray-500 text-sm">UX Designer</p>
                  </div>
                </div>
                <p className="text-gray-600">"I was unsure which path to take in tech. The career quiz matched me with UX design, which perfectly combines my creative and problem-solving skills. The learning resources were incredibly helpful!"</p>
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
                  <button className="bg-career-purple hover:bg-career-dark-purple px-4 py-2 rounded-r-md transition-colors">
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
