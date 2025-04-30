import { CareerPath } from "../data/careerPaths";

interface CareerCardProps {
  career: CareerPath;
  score: number;
  maxScore: number;
  onClick: () => void;
  isSelected: boolean;
  isDarkMode: boolean;
}

const CareerCard = ({ career, score, maxScore, onClick, isSelected, isDarkMode }: CareerCardProps) => {
  // Calculate match percentage
  const percentage = Math.round((score / maxScore) * 100);
  
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
      onClick={onClick}
      className={`cursor-pointer rounded-lg p-6 transition-all duration-200 ${
        isSelected
          ? isDarkMode
            ? 'bg-gray-800 border-2 border-purple-400'
            : 'bg-white border-2 border-career-purple'
          : isDarkMode
            ? 'bg-gray-800 hover:bg-gray-700'
            : 'bg-white hover:bg-gray-50'
      } shadow-md`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{career.title}</h3>
        <span className={`text-sm font-medium ${isDarkMode ? 'text-purple-400' : 'text-career-purple'}`}>
          {percentage}% Match
        </span>
      </div>
      
      <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        {career.description}
      </p>
      
      <div className={`w-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2`}>
        <div
          className={`${isDarkMode ? 'bg-purple-400' : 'bg-career-purple'} h-2 rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default CareerCard;
