import React from 'react';
import { Resource } from '../data/resources';

// Mock resources data for demonstration
const resources = [
  {
    id: 1,
    title: "React.js Fundamentals",
    description: "Comprehensive course covering React basics to advanced concepts",
    type: "course",
    careerId: "software-development",
    url: "#",
    provider: "Frontend Masters"
  },
  {
    id: 2,
    title: "VSCode",
    description: "Powerful code editor with debugging and extension support",
    type: "tool",
    careerId: "software-development",
    url: "#",
    provider: "Microsoft"
  },
  {
    id: 3,
    title: "Clean Code",
    description: "Essential guide to writing clean, maintainable code with practical examples",
    type: "book",
    careerId: "software-development",
    url: "#",
    provider: "Robert C. Martin"
  },
  {
    id: 4,
    title: "Data Science Toolkit",
    description: "Essential tools and libraries for data science projects",
    type: "article",
    careerId: "data-science",
    url: "#",
    provider: "Towards Data Science"
  },
  {
    id: 5,
    title: "UX Design Principles",
    description: "Video series covering fundamentals of user experience design",
    type: "video",
    careerId: "ux-design",
    url: "#",
    provider: "Interaction Design Foundation"
  },
  {
    id: 6,
    title: "Docker for Beginners",
    description: "Learn containerization basics with hands-on Docker tutorials",
    type: "course",
    careerId: "systems-analysis",
    url: "#",
    provider: "Docker"
  },
  {
    id: 7,
    title: "Agile Project Management",
    description: "Comprehensive guide to managing tech projects using agile methodologies",
    type: "book",
    careerId: "project-management",
    url: "#",
    provider: "Atlassian"
  },
  {
    id: 8,
    title: "Ethical Hacking",
    description: "Introduction to cybersecurity and penetration testing techniques",
    type: "video",
    careerId: "cyber-security",
    url: "#",
    provider: "Cybrary"
  }
];

// Update the props interface to accept isDarkMode
interface ResourcesSectionProps {
  isDarkMode?: boolean;
}

const ResourcesSection: React.FC<ResourcesSectionProps> = ({ isDarkMode = false }) => {
  const [activeCategory, setActiveCategory] = React.useState('all');
  const [selectedResourceType, setSelectedResourceType] = React.useState('all');
  
  // Get unique career categories
  const careerCategories = [
    { id: 'all', name: 'All' },
    { id: 'software-development', name: 'Software Development' },
    { id: 'data-science', name: 'Data Science' },
    { id: 'ux-design', name: 'UX Design' },
    { id: 'systems-analysis', name: 'Systems Analysis' },
    { id: 'project-management', name: 'Project Management' },
    { id: 'cyber-security', name: 'Cybersecurity' },
    { id: 'video-game-developer', name: 'Video Game Development' }
  ];
  
  // Get unique resource types
  const resourceTypes = ['all', 'course', 'tool', 'book', 'article', 'video'];
  
  // Filter resources based on active category and selected type
  const filteredResources = resources.filter(resource => 
    (activeCategory === 'all' || resource.careerId === activeCategory) &&
    (selectedResourceType === 'all' || resource.type === selectedResourceType)
  ).slice(0, 8); // Limit to 8 resources for the landing page
  
  return (
    <section id="resources-section" className={`py-16 ${isDarkMode ? 'bg-gray-900' : 'bg-purple-50'} transition-colors duration-200`}>
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center mb-2">
          <h2 className={`text-4xl font-bold ${isDarkMode ? 'text-white' : ''}`}>Resources</h2>
          <div className={`ml-4 ${isDarkMode ? 'bg-green-900 text-green-200' : 'bg-green-200 text-green-800'} px-3 py-1 rounded-full text-sm`}>
            with hands-on learning
          </div>
        </div>
        
        <p className={`text-lg mb-12 max-w-3xl ${isDarkMode ? 'text-gray-100' : ''}`}>
          Master tech skills by building real projects—our interactive resources
          blend bite-sized lessons with practical, hands-on experience.
        </p>
        
        {/* Filter tabs */}
        <div className="flex flex-wrap gap-3 mb-8">
          {careerCategories.map((category) => (
            <button
              key={category.id}
              className={`py-2 px-5 rounded-full transition-colors ${
                activeCategory === category.id 
                  ? 'bg-indigo-500 dark:bg-indigo-600 text-white'
                  : `${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
          <button className={`py-2 px-5 rounded-full ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} flex items-center`}>
            + more
          </button>
        </div>
        
        <div className="mb-8">
          <p className={`text-2xl font-medium ${isDarkMode ? 'text-white' : ''}`}>
            {filteredResources.length} Resources
          </p>
        </div>
        
        {/* Resources grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredResources.map((resource) => (
            <ResourceCard 
              key={resource.id} 
              resource={resource} 
              isDarkMode={isDarkMode}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Resource card component specifically for landing page
interface ResourceCardProps {
  resource: typeof resources[0];
  isDarkMode: boolean;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource, isDarkMode }) => {
  // Background color based on resource type and dark mode
  const getBgColor = (type: string) => {
    if (isDarkMode) {
      switch (type) {
        case 'course':
          return 'bg-green-900 bg-opacity-30';
        case 'tool':
          return 'bg-purple-900 bg-opacity-30';
        case 'book':
          return 'bg-yellow-900 bg-opacity-30';
        case 'article':
          return 'bg-blue-900 bg-opacity-30';
        case 'video':
          return 'bg-red-900 bg-opacity-30';
        default:
          return 'bg-gray-800';
      }
    } else {
      switch (type) {
        case 'course':
          return 'bg-green-100';
        case 'tool':
          return 'bg-purple-100';
        case 'book':
          return 'bg-yellow-100';
        case 'article':
          return 'bg-blue-100';
        case 'video':
          return 'bg-red-100';
        default:
          return 'bg-gray-100';
      }
    }
  };
  
  // Button text based on resource type
  const getButtonText = (type: string) => {
    switch (type) {
      case 'tool':
        return 'visit platform';
      case 'book':
        return 'find online!';
      default:
        return 'visit resource';
    }
  };
  
  // Button style based on dark mode
  const buttonClasses = isDarkMode 
    ? "inline-flex items-center bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-full px-4 py-2 text-sm transition-colors w-fit" 
    : "inline-flex items-center bg-purple-500 hover:bg-purple-600 text-white font-medium rounded-full px-4 py-2 text-sm transition-colors w-fit";

  return (
    <div className={`p-6 rounded-lg ${getBgColor(resource.type)} h-full flex flex-col border border-transparent ${isDarkMode ? 'border-gray-700' : ''} transition-colors duration-200`}>
      <div className={`uppercase text-xs font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-600'} mb-2`}>
        {resource.type}
      </div>
      
      <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : ''}`}>{resource.title}</h3>
      
      <p className={`text-sm mb-4 flex-grow ${isDarkMode ? 'text-gray-300' : ''}`}>
        {resource.description}
      </p>
      
      <a 
        href={resource.url}
        className={buttonClasses}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-4 w-4 mr-2" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        {getButtonText(resource.type)}
      </a>
    </div>
  );
};

export default ResourcesSection;