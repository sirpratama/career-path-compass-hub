
import { useEffect, useState } from "react";

interface ProgressBarProps {
  currentQuestion: number;
  totalQuestions: number;
}

const ProgressBar = ({ currentQuestion, totalQuestions }: ProgressBarProps) => {
  const [width, setWidth] = useState(0);
  
  useEffect(() => {
    // Calculate the percentage of progress
    const percentage = ((currentQuestion - 1) / totalQuestions) * 100;
    setWidth(percentage);
  }, [currentQuestion, totalQuestions]);

  return (
    <div className="mb-6">
      <div className="flex justify-between text-xs mb-1">
        <span className="text-sm font-medium text-muted-foreground">
          Question {currentQuestion} of {totalQuestions}
        </span>
        <span className="text-sm font-medium text-muted-foreground">
          {Math.round((currentQuestion - 1) / totalQuestions * 100)}%
        </span>
      </div>
      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-career-purple transition-all duration-300 ease-out rounded-full" 
          style={{ width: `${width}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
