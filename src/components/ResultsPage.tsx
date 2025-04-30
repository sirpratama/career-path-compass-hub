import { useState } from 'react';
import { CareerPath, careerPaths } from '../data/careerPaths';
import CareerCard from './CareerCard';
import ResourceList from './ResourceList';
import { Link } from 'react-router-dom';

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

  // State for chat messages
  const [messages, setMessages] = useState<{role: 'user'|'ai', text: string}[]>([]);
  const [input, setInput] = useState('');
  // State for full screen chatbot
  const [isChatbotFullscreen, setIsChatbotFullscreen] = useState(false);

  // Dummy AI response (replace with real API if needed)
  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { role: 'user', text: input }]);
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', text: `I'm an AI assistant. Ask me anything about tech careers, jobs, or learning paths!` }]);
    }, 600);
    setInput('');
  };

  // Get color for selected career
  const selectedCareer = careerPaths[selectedCareerId];
  const colorKey = selectedCareer?.color || 'default';
  const color = colorMap[colorKey] || colorMap.default;

  return (
    <div className={`container mx-auto px-4 py-8 max-w-6xl animate-fade-in ${isDarkMode ? 'bg-gray-900' : ''}`}>
      <div className="text-center mb-8">
        <h2 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : ''}`}>Your Career Path Results</h2>
        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Based on your answers, here are your top career matches</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6 mb-8">
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

      {/* Chatbot Section - always visible, general career Q&A */}
      <div className={`mb-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6 relative`}>
        <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Chat with AI about Careers</h3>
        {/* Expand button */}
        <button
          onClick={() => setIsChatbotFullscreen(true)}
          className={`absolute top-4 right-4 p-2 rounded-full focus:outline-none ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
          title="Expand to full screen"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V6a2 2 0 012-2h2M20 8V6a2 2 0 00-2-2h-2M4 16v2a2 2 0 002 2h2M20 16v2a2 2 0 01-2 2h-2" /></svg>
        </button>
        {/* Chatbot UI */}
        <div className={`mt-2 border-t pt-4 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className={`h-56 overflow-y-auto mb-4 p-2 rounded ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`} style={{maxHeight: 220}}>
            {messages.length === 0 && (
              <div className={`text-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Ask me anything about tech careers, jobs, or learning paths!</div>
            )}
            {messages.map((msg, idx) => (
              <div key={idx} className={`mb-2 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`px-3 py-2 rounded-lg max-w-xs text-sm ${msg.role === 'user' ? (isDarkMode ? 'bg-purple-700 text-white' : 'bg-career-purple text-white') : (isDarkMode ? 'bg-gray-700 text-gray-100' : 'bg-gray-200 text-gray-800')}`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
              className={`flex-1 px-3 py-2 rounded-md border focus:outline-none ${isDarkMode ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
              placeholder="Ask about tech careers, jobs, or learning paths..."
            />
            <button
              onClick={handleSend}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${isDarkMode ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-career-purple hover:bg-career-dark-purple text-white'}`}
            >
              Send
            </button>
          </div>
        </div>
      </div>
      
      {/* Resources section with color matching selected career */}
      <div className={`rounded-lg shadow-md p-6 mb-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} ${color.border}`}> 
        <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? color.text : color.text}`}>Resources for {selectedCareer?.title}</h3>
        <ResourceList careerId={selectedCareerId} isDarkMode={isDarkMode} colorKey={colorKey} />
      </div>
      
      <div className="text-center">
        <button
          onClick={onRestartQuiz}
          className={`${isDarkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-career-purple hover:bg-career-dark-purple'} text-white font-medium py-3 px-6 rounded-md transition-colors`}
        >
          Take the Quiz Again
        </button>
        <p className={`mt-4 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Want to save these results and bookmark resources? <a href="#" className={`${isDarkMode ? 'text-purple-400' : 'text-career-purple'} hover:underline`}>Sign Up</a> or <Link to="/login" className={`${isDarkMode ? 'text-purple-400' : 'text-career-purple'} hover:underline`}>Log In</Link>
        </p>
      </div>

      {/* Fullscreen Chatbot Modal */}
      {isChatbotFullscreen && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80`}> 
          <div className={`w-full max-w-3xl mx-auto bg-gray-50 rounded-2xl shadow-2xl flex flex-col relative`} style={{height: '85vh'}}>
            {/* Gemini-style header */}
            <div className="w-full rounded-t-2xl bg-purple-400 flex flex-col items-center justify-center py-4">
              <div className="text-2xl font-bold text-white tracking-wide">Gemini</div>
              <div className="mt-1">
                <span className="bg-white bg-opacity-30 text-xs text-white px-3 py-1 rounded-full font-semibold">2.0 FLASH <svg className="inline h-3 w-3 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></span>
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
                <div className="text-2xl font-semibold text-purple-400 mb-1">What would you like to know?</div>
                <div className="text-gray-400 text-base">Try typing any prompt related to your tech career!</div>
              </div>
              <div className="flex-1 overflow-y-auto mb-4">
                {messages.length === 0 && (
                  <div className="text-center text-gray-400 text-lg mt-12">No messages yet. Start the conversation below!</div>
                )}
                {messages.map((msg, idx) => (
                  <div key={idx} className={`mb-2 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`px-4 py-2 rounded-xl max-w-lg text-base ${msg.role === 'user' ? 'bg-purple-400 text-white' : 'bg-gray-200 text-gray-800'}`}>{msg.text}</div>
                  </div>
                ))}
              </div>
              {/* Input bar */}
              <div className="w-full flex items-center bg-purple-300 rounded-xl px-4 py-3 mt-auto">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
                  className="flex-1 bg-transparent text-white placeholder-white font-medium text-lg focus:outline-none px-2"
                  placeholder="Ask whatever you want..."
                />
                <button
                  onClick={handleSend}
                  className="ml-2 text-white text-2xl font-bold focus:outline-none"
                  title="Send"
                >
                  &gt;
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsPage;