import { useState, useEffect, useRef } from 'react';
import { CareerPath, careerPaths } from '../data/careerPaths';
import CareerCard from './CareerCard';
import ResourceList from './ResourceList';
import { Link } from 'react-router-dom';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { useAuth } from '@/hooks/useAuth';

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI("AIzaSyAbpbUvNiwZJ5o8Z0KLupnJ4V_i6LH-JQY");
const geminiModel = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

interface ResultsPageProps {
  careerScores: { [key: string]: number };
  onRestartQuiz: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

const colorMap: Record<string, { border: string; text: string; link: string; linkHover: string }> = {
  purple: { border: 'border-l-4 border-purple-400', text: 'text-purple-400', link: 'text-purple-400', linkHover: 'hover:text-purple-300' },
  blue: { border: 'border-l-4 border-blue-400', text: 'text-blue-400', link: 'text-blue-400', linkHover: 'hover:text-blue-300' },
  green: { border: 'border-l-4 border-green-400', text: 'text-green-400', link: 'text-green-400', linkHover: 'hover:text-green-300' },
  orange: { border: 'border-l-4 border-orange-400', text: 'text-orange-400', link: 'text-orange-400', linkHover: 'hover:text-orange-300' },
  yellow: { border: 'border-l-4 border-amber-400', text: 'text-amber-400', link: 'text-amber-400', linkHover: 'hover:text-amber-300' },
  red: { border: 'border-l-4 border-red-400', text: 'text-red-400', link: 'text-red-400', linkHover: 'hover:text-red-300' },
  brown: { border: 'border-l-4 border-yellow-900', text: 'text-yellow-900', link: 'text-yellow-900', linkHover: 'hover:text-yellow-700' },
  default: { border: 'border-l-4 border-gray-400', text: 'text-gray-800', link: 'text-career-purple', linkHover: 'hover:text-career-dark-purple' },
};

const ResultsPage = ({ careerScores, onRestartQuiz, isDarkMode, onToggleDarkMode }: ResultsPageProps) => {
  // Sort careers by score (highest first)
  const sortedCareers = Object.entries(careerScores)
    .sort(([, scoreA], [, scoreB]) => scoreB - scoreA)
    .slice(0, 3) // Get top 3
    .map(([careerId, score]) => ({
      career: careerPaths[careerId],
      score
    }));
  
  // Find max possible score for any career
  const maxScore = Math.max(...Object.values(careerScores));
  
  // State to track which career's resources are being shown
  const [selectedCareerId, setSelectedCareerId] = useState<string>(
    sortedCareers.length > 0 ? sortedCareers[0].career.id : ''
  );

  // Default welcome message
  const welcomeMessage = {
    role: 'ai' as 'ai', 
    text: "Hi! I'm your career assistant. I can help you explore tech career paths, skills you'll need, and learning resources. What would you like to know about your career matches?"
  };

  // State for chat messages with default AI welcome message
  const [messages, setMessages] = useState<{role: 'user'|'ai', text: string}[]>([welcomeMessage]);
  const [input, setInput] = useState('');
  // State for loading indicator
  const [isLoading, setIsLoading] = useState(false);
  // State for full screen chatbot
  const [isChatbotFullscreen, setIsChatbotFullscreen] = useState(false);
  // Chat history for Gemini API
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  // Track if the user has interacted with the chat
  const [hasInteracted, setHasInteracted] = useState(false);
  // Reference to chat container for scrolling
  const chatContainerRef = useRef<HTMLDivElement>(null);
  // Default chat height (collapsed)
  const [chatHeight, setChatHeight] = useState(180);
  
  // Use auth state and functions
  const { user: currentUser, saveUserResults, isLoadingAuth } = useAuth(); 
  const [isSaving, setIsSaving] = useState(false); // Local state for button loading
  const [saveSuccess, setSaveSuccess] = useState(false); // Local state for button feedback

  // Initial system message for career guidance
  useEffect(() => {
    // Setup initial context for the AI
    setChatHistory([
      {
        role: "user",
        parts: [{ text: "You are a career counselor AI. You help people explore tech career paths, provide advice on skills needed, learning resources, and job prospects. Keep responses helpful, concise, and encouraging for someone exploring tech careers. Focus particularly on careers like Software Development, Data Science, UX Design, Cyber Security, and Systems Analysis. If asked about anything not related to careers, politely redirect to career topics." }],
      },
      {
        role: "model",
        parts: [{ text: welcomeMessage.text }],
      }
    ]);
  }, []);

  // Scroll to bottom of chat when new messages are added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Function to generate response using Gemini API
  const generateGeminiResponse = async (userMessage: string) => {
    setIsLoading(true);
    try {
      // Add user message to chat history
      const updatedHistory = [
        ...chatHistory,
        {
          role: "user",
          parts: [{ text: userMessage }],
        },
      ];
      
      // Create a chat session
      const chat = geminiModel.startChat({
        history: chatHistory,
        generationConfig: {
          maxOutputTokens: 500,
        },
      });
      
      // Generate response
      const result = await chat.sendMessage(userMessage);
      const responseText = result.response.text();
      
      // Add model response to chat history
      const finalHistory = [
        ...updatedHistory,
        {
          role: "model",
          parts: [{ text: responseText }],
        },
      ];
      
      // Update state
      setChatHistory(finalHistory);
      setMessages(prev => [...prev, { role: 'ai', text: responseText }]);
    } catch (error) {
      console.error("Error generating response:", error);
      setMessages(prev => [...prev, { 
        role: 'ai', 
        text: "I'm sorry, I encountered an error processing your request. Please try again." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle sending messages to AI
  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    
    // Expand chat box on first interaction
    if (!hasInteracted) {
      setHasInteracted(true);
      setChatHeight(350); // Expanded height
    }
    
    // Generate response from Gemini
    await generateGeminiResponse(userMessage);
  };

  // Get color
  const selectedCareer = careerPaths[selectedCareerId];
  const colorKey = selectedCareer?.color || 'default';
  const color = colorMap[colorKey] || colorMap.default;

  // Function to handle saving results using the auth context
  const handleSaveResults = async () => {
    if (!currentUser) return; // Should not happen if button is shown correctly
    setIsSaving(true);
    setSaveSuccess(false);
    const success = await saveUserResults(careerScores);
    if (success) {
      setSaveSuccess(true);
      // Optionally hide button or change text permanently after successful save
      // For now, just show success message temporarily
      setTimeout(() => setSaveSuccess(false), 3000);
    } else {
      // Error toast is handled within saveUserResults
    }
    setIsSaving(false);
  };

  // Guard clause for initial auth loading or no scores
  if (isLoadingAuth) {
      return <div className="min-h-screen flex items-center justify-center">Loading...</div>; // Or a spinner
  }
  
  if (sortedCareers.length === 0) {
    // Handle case where there are no scores to display
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} flex flex-col items-center justify-center p-4 text-center`}>
          <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>No Results Yet</h2>
          <p className={`text-lg mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Complete the quiz to see your career recommendations.
          </p>
          <button
            onClick={onRestartQuiz}
            className={`${isDarkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-career-purple hover:bg-career-dark-purple'} text-white font-medium py-3 px-6 rounded-md transition-colors`}
          >
            Start Quiz
          </button>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className={`text-5xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Your Career Path Results</h2>
          <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Based on your answers, here are your top career matches
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {sortedCareers.map(({ career, score }) => (
            <CareerCard
              key={career.id}
              career={career}
              score={score}
              maxScore={maxScore}
              onClick={() => setSelectedCareerId(career.id)}
              isSelected={selectedCareerId === career.id}
              isDarkMode={isDarkMode}
            />
          ))}
        </div>


        <div className={`mb-12 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6 relative transition-all duration-300 ease-in-out`}>
          <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Chat with Compass Career AI</h3>
          <div className={`mt-2 border-t pt-4 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div 
              ref={chatContainerRef}
              className={`overflow-y-auto mb-4 p-2 rounded ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-all duration-300 ease-in-out`} 
              style={{height: chatHeight}}
            >
              {messages.map((msg, idx) => (
                <div key={idx} className={`mb-3 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`px-3 py-2 rounded-lg max-w-sm text-sm ${msg.role === 'user' ? (isDarkMode ? 'bg-purple-700 text-white' : 'bg-career-purple text-white') : (isDarkMode ? 'bg-gray-700 text-gray-100' : 'bg-gray-200 text-gray-800')}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start mb-2">
                  <div className={`px-3 py-2 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-75"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-150"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
                className={`flex-1 px-3 py-2 rounded-md border focus:outline-none ${isDarkMode ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                placeholder="Ask about tech careers, jobs, or learning paths..."
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  isLoading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : isDarkMode 
                      ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                      : 'bg-career-purple hover:bg-career-dark-purple text-white'
                }`}
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Send'}
              </button>
            </div>
          </div>
        </div>

        {/* Resources section - After the chat */}
        <div className={`mt-12 ${selectedCareerId ? 'block' : 'hidden'}`}>
          <div className={`rounded-lg shadow-md p-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}> 
            <h3 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Resources for {selectedCareer?.title}
            </h3>
            <ResourceList careerId={selectedCareerId} isDarkMode={isDarkMode} colorKey={colorKey} />
          </div>
        </div>
        
        <div className="text-center mt-12">
          <button
            onClick={onRestartQuiz}
            className={`${isDarkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-career-purple hover:bg-career-dark-purple'} text-white font-medium py-3 px-6 rounded-md transition-colors`}
          >
            Take the Quiz Again
          </button>
          {/* Show Save button only if logged in AND results aren't already saved */}  
          {currentUser && !currentUser.savedResults ? (
            <button
              onClick={handleSaveResults} // Use the new handler
              disabled={isSaving || saveSuccess} // Disable if saving or already succeeded
              className={`ml-4 ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white font-medium py-3 px-6 rounded-md transition-colors disabled:opacity-50`}
            >
              {isSaving ? 'Saving...' : saveSuccess ? 'Saved!' : 'Save Results'}
            </button>
          ) : currentUser && currentUser.savedResults ? (
              <p className={`mt-4 ml-4 inline-block text-sm ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>Results already saved!</p>
          ) : (
            // User not logged in
            <p className={`mt-4 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <Link to="/login" className={`${isDarkMode ? 'text-blue-400' : 'text-blue-500'} underline`}>Login</Link> or 
              <Link to="/signup" className={`${isDarkMode ? 'text-blue-400' : 'text-blue-500'} underline ml-1`}>Sign up</Link> to save your results
            </p>
          )}
        </div>

        {/* Fullscreen Chatbot Modal */}
        {isChatbotFullscreen && (
          <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80`}> 
            <div className={`w-full max-w-3xl mx-auto bg-gray-50 rounded-2xl shadow-2xl flex flex-col relative`} style={{height: '85vh'}}>
              {/* Gemini-style header */}
              <div className="w-full rounded-t-2xl bg-purple-400 flex flex-col items-center justify-center py-4">
                <div className="text-2xl font-bold text-white tracking-wide">Gemini</div>
                <div className="mt-1">
                  <span className="bg-white bg-opacity-30 text-xs text-white px-3 py-1 rounded-full font-semibold">Gemini 1.5 Flash <svg className="inline h-3 w-3 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></span>
                </div>
              </div>
              {/* Close button */}
              <button
                onClick={() => setIsChatbotFullscreen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-purple-200 hover:bg-purple-300 text-purple-700 focus:outline-none"
                title="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              {/* Greeting */}
              <div className="flex-1 flex flex-col px-8 pt-8 pb-4 overflow-hidden">
                <div className="mb-8">
                  <div className="text-4xl font-bold text-purple-500 mb-2">Hi there,</div>
                  <div className="text-2xl font-semibold text-purple-400 mb-1">What would you like to know about your career options?</div>
                  <div className="text-gray-400 text-base">I can help with information about tech career paths, skills, and resources.</div>
                </div>
                <div className="flex-1 overflow-y-auto mb-4">
                  {messages.map((msg, idx) => (
                    <div key={idx} className={`mb-4 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`px-4 py-2 rounded-xl max-w-lg text-base ${msg.role === 'user' ? 'bg-purple-400 text-white' : 'bg-gray-200 text-gray-800'}`}>{msg.text}</div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start mb-2">
                      <div className="px-4 py-2 rounded-xl bg-gray-200">
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
                          <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-75"></div>
                          <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-150"></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {/* Input bar */}
                <div className="w-full flex items-center bg-purple-300 rounded-xl px-4 py-3 mt-auto">
                  <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
                    className="flex-1 bg-transparent text-white placeholder-white font-medium text-lg focus:outline-none px-2"
                    placeholder="Ask about tech careers..."
                    disabled={isLoading}
                  />
                  <button
                    onClick={handleSend}
                    className={`ml-2 text-white text-2xl font-bold focus:outline-none ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    title="Send"
                    disabled={isLoading}
                  >
                    &gt;
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsPage;