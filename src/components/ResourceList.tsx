
import { useState } from 'react';
import { Resource, resources } from '../data/resources';
import ResourceItem from './ResourceItem';

interface ResourceListProps {
  careerId: string;
}

const ResourceList = ({ careerId }: ResourceListProps) => {
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
  
  return (
    <div className="mt-6">
      <div className="mb-4 border-b border-gray-200">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {resourceTypes.map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-all ${
                filter === type
                  ? 'bg-career-purple text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      {filteredResources.length > 0 ? (
        <div className="space-y-4">
          {filteredResources.map((resource) => (
            <ResourceItem key={resource.id} resource={resource} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No resources found. Try changing your filter.
        </div>
      )}
    </div>
  );
};

export default ResourceList;
