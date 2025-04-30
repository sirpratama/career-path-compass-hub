import { Resource } from "../data/resources";

interface ResourceItemProps {
  resource: Resource;
  isDarkMode?: boolean;
}

const ResourceItem = ({ resource, isDarkMode = false }: ResourceItemProps) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return (
          <div className={`p-2 ${isDarkMode ? 'bg-red-900' : 'bg-red-100'} rounded-full`}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              className={`h-5 w-5 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      case 'article':
        return (
          <div className={`p-2 ${isDarkMode ? 'bg-blue-900' : 'bg-blue-100'} rounded-full`}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              className={`h-5 w-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
        );
      case 'course':
        return (
          <div className={`p-2 ${isDarkMode ? 'bg-green-900' : 'bg-green-100'} rounded-full`}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              className={`h-5 w-5 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}
            >
              <path d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
        );
      case 'book':
        return (
          <div className={`p-2 ${isDarkMode ? 'bg-yellow-900' : 'bg-yellow-100'} rounded-full`}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              className={`h-5 w-5 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
        );
      case 'tool':
        return (
          <div className={`p-2 ${isDarkMode ? 'bg-purple-900' : 'bg-purple-100'} rounded-full`}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              className={`h-5 w-5 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className={`p-2 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-full`}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
        );
    }
  };

  return (
    <div className={`flex items-start p-4 border rounded-lg hover:shadow-md transition-shadow ${
      isDarkMode 
        ? 'bg-gray-700 border-gray-600' 
        : 'bg-white border-gray-200'
    }`}>
      {getTypeIcon(resource.type)}
      
      <div className="ml-4 flex-1">
        <div className="flex justify-between">
          <h3 className={`font-semibold text-lg ${isDarkMode ? 'text-white' : ''}`}>{resource.title}</h3>
          <span className={`${isDarkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-100 text-gray-600'} text-xs px-2 py-1 rounded-full capitalize`}>
            {resource.type}
          </span>
        </div>
        
        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>{resource.provider}</p>
        <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{resource.description}</p>
        
        <div className="mt-4 flex justify-between items-center">
          <a 
            href={resource.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className={`${isDarkMode ? 'text-purple-400 hover:text-purple-300' : 'text-career-purple hover:text-career-dark-purple'} font-medium text-sm flex items-center`}
          >
            Visit Resource
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 ml-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
          
          <button className={`${isDarkMode ? 'text-gray-500 hover:text-purple-400' : 'text-gray-400 hover:text-career-purple'} transition-colors`}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResourceItem;
