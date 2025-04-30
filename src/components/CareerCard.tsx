
import { CareerPath } from "../data/careerPaths";

interface CareerCardProps {
  career: CareerPath;
  score: number;
  maxScore: number;
  onClick: () => void;
  isSelected: boolean;
}

const CareerCard = ({ career, score, maxScore, onClick, isSelected }: CareerCardProps) => {
  // Calculate match percentage
  const matchPercentage = Math.round((score / maxScore) * 100);
  
  // Get color class based on career color
  const getColorClass = (color: string) => {
    switch(color) {
      case 'purple':
        return {
          bg: 'bg-career-purple',
          text: 'text-career-purple',
          border: 'border-career-purple',
          light: 'bg-career-light-purple'
        };
      case 'blue':
        return {
          bg: 'bg-career-blue',
          text: 'text-career-blue',
          border: 'border-career-blue',
          light: 'bg-blue-50'
        };
      case 'green':
        return {
          bg: 'bg-career-green',
          text: 'text-career-green',
          border: 'border-career-green',
          light: 'bg-green-50'
        };
      case 'orange':
        return {
          bg: 'bg-career-orange',
          text: 'text-career-orange',
          border: 'border-career-orange',
          light: 'bg-orange-50'
        };
      case 'yellow':
        return {
          bg: 'bg-career-yellow',
          text: 'text-amber-700',
          border: 'border-amber-400',
          light: 'bg-amber-50'
        };
      case 'red':
        return {
          bg: 'bg-career-red',
          text: 'text-career-red',
          border: 'border-career-red',
          light: 'bg-red-50'
        };
      case 'brown':
        return {
          bg: 'bg-career-brown',
          text: 'text-career-brown',
          border: 'border-career-brown',
          light: 'bg-brown-50'
        };
      default:
        return {
          bg: 'bg-gray-500',
          text: 'text-gray-500',
          border: 'border-gray-500',
          light: 'bg-gray-50'
        };
    }
  };
  
  const colorClass = getColorClass(career.color);
  
  return (
    <div 
      className={`border-2 rounded-lg overflow-hidden transition-all cursor-pointer transform hover:-translate-y-1 hover:shadow-lg ${
        isSelected 
          ? `${colorClass.border} shadow-md` 
          : 'border-gray-200'
      }`}
      onClick={onClick}
    >
      <div className={`p-4 ${isSelected ? colorClass.light : 'bg-white'}`}>
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold">{career.title}</h3>
          <div className={`${colorClass.bg} text-white text-sm rounded-full px-3 py-1 font-semibold`}>
            {matchPercentage}% Match
          </div>
        </div>
        
        <p className="text-gray-600 mt-2 text-sm">{career.description}</p>
        
        <div className="mt-4">
          <h4 className="font-semibold text-sm mb-2">Why it fits you:</h4>
          <p className="text-sm text-gray-700">{career.alignment}</p>
        </div>
        
        <div className="mt-4">
          <button 
            className={`flex items-center text-sm font-medium ${colorClass.text}`}
          >
            {isSelected ? "Currently viewing" : "View resources"} 
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ml-1 ${isSelected ? 'rotate-90' : ''} transition-transform`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CareerCard;
