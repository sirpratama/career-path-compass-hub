import { CareerPath } from "../data/careerPaths";

interface CareerCardProps {
  career: CareerPath;
  score: number;
  maxScore: number;
  onClick: () => void;
  isSelected: boolean;
  isDarkMode?: boolean;
}

const CareerCard = ({ career, score, maxScore, onClick, isSelected, isDarkMode = false }: CareerCardProps) => {
  // Calculate match percentage
  const matchPercentage = Math.round((score / maxScore) * 100);
  
  return (
    <div 
      className={`rounded-lg overflow-hidden transition-all cursor-pointer ${
        isDarkMode 
          ? `${isSelected ? 'border border-purple-400' : 'bg-gray-800 border border-gray-700'}`
          : `${isSelected ? 'border border-purple-400' : 'bg-white border border-gray-200'}`
      }`}
      onClick={onClick}
    >
      <div className={`p-6 h-full ${
        isDarkMode
          ? 'bg-gray-800 text-white'
          : `${isSelected ? 'bg-purple-50' : 'bg-white'}`
      }`}>
        <div className="flex justify-between items-start mb-4">
          <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : ''}`}>{career.title}</h3>
          <div className={`${
            matchPercentage >= 90 
              ? 'bg-purple-500' 
              : matchPercentage >= 80 
                ? 'bg-indigo-500' 
                : 'bg-indigo-400'
          } text-white text-sm rounded-full px-3 py-1 font-semibold`}>
            {matchPercentage}% Match
          </div>
        </div>
        
        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
          {career.description}
        </p>
        
        <div className={`relative w-full h-2 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full overflow-hidden`}>
          <div 
            className={`absolute top-0 left-0 h-full ${
              matchPercentage >= 90 
                ? 'bg-purple-500' 
                : matchPercentage >= 80 
                  ? 'bg-indigo-500' 
                  : 'bg-indigo-400'
            }`}
            style={{ width: `${matchPercentage}%` }}
          ></div>
        </div>
        
        <div className="mt-6">
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {career.alignment}
          </p>
        </div>
        
        <div className="mt-4">
          <button 
            className={`flex items-center text-sm font-medium ${
              isDarkMode 
                ? 'text-purple-400 hover:text-purple-300' 
                : 'text-purple-600 hover:text-purple-700'
            }`}
          >
            {isSelected ? (
              <span>Currently viewing</span>
            ) : (
              <span>View resources ›</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CareerCard;
