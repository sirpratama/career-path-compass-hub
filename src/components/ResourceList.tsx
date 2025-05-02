import { useState } from 'react';
import { Resource, resources } from '../data/resources';
import ResourceItem from './ResourceItem';

interface ResourceListProps {
  careerId: string;
  isDarkMode?: boolean;
  colorKey?: string;
}

const ResourceList = ({ careerId, isDarkMode = false, colorKey = 'default' }: ResourceListProps) => {
  const [filter, setFilter] = useState<string>('all');
  
  // Filter resources by career ID and then by type if filter is not 'all'
  const filteredResources = resources
    .filter(resource => resource.careerId === careerId)
    .filter(resource => filter === 'all' || resource.type === filter)
    .sort((a, b) => b.relevance - a.relevance);
  
  // Get unique resource types for this career
  const resourceTypes = ['all', ...new Set(resources
    .filter(resource => resource.careerId === careerId)
    .map(resource => resource.type))];
  
  // Helper function to get button styles
  const getButtonStyles = (type: string) => {
    if (filter === type) {
      if (colorKey === 'default') {
        return isDarkMode 
          ? 'bg-purple-600 text-white' 
          : 'bg-career-purple text-white';
      } else {
        // For other colors, use a consistent styled active state
        return isDarkMode 
          ? `bg-purple-600 text-white` 
          : `bg-purple-500 text-white`;
      }
    } else {
      return isDarkMode 
        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
        : 'bg-gray-200 text-gray-700 hover:bg-gray-300';
    }
  };
  
  // Format type name for display
  const formatTypeName = (type: string) => {
    if (type === 'all') {
      return 'All Resources';
    }
    return type.charAt(0).toUpperCase() + type.slice(1);
  };
  
  return (
    <div className="mt-6">
      <div className={`mb-6 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex flex-wrap gap-2 pb-4">
          {resourceTypes.map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-all ${getButtonStyles(type)}`}
            >
              {formatTypeName(type)}
            </button>
          ))}
        </div>
      </div>
      
      {filteredResources.length > 0 ? (
        <div className="space-y-4">
          {filteredResources.map((resource) => (
            <ResourceItem key={resource.id} resource={resource} isDarkMode={isDarkMode} />
          ))}
        </div>
      ) : (
        <div className={`text-center py-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          No resources found. Try changing your filter.
        </div>
      )}
    </div>
  );
};

export default ResourceList;
