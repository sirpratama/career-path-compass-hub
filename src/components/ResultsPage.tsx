
import { useState } from 'react';
import { CareerPath, careerPaths } from '../data/careerPaths';
import CareerCard from './CareerCard';
import ResourceList from './ResourceList';
import { Link } from 'react-router-dom';

interface ResultsPageProps {
  careerScores: { [key: string]: number };
  onRestartQuiz: () => void;
}

const ResultsPage = ({ careerScores, onRestartQuiz }: ResultsPageProps) => {
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
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Your Career Path Results</h2>
        <p className="text-gray-600">Based on your answers, here are your top career matches</p>
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
          />
        ))}
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-2xl font-bold mb-4">
          Resources for {careerPaths[selectedCareerId]?.title}
        </h3>
        <ResourceList careerId={selectedCareerId} />
      </div>
      
      <div className="text-center">
        <button
          onClick={onRestartQuiz}
          className="bg-career-purple hover:bg-career-dark-purple text-white font-medium py-3 px-6 rounded-md transition-colors"
        >
          Take the Quiz Again
        </button>
        <p className="mt-4 text-sm text-gray-500">
          Want to save these results and bookmark resources? <a href="#" className="text-career-purple hover:underline">Sign Up</a> or <Link to="/login" className="text-career-purple hover:underline">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default ResultsPage;