import React from 'react';
import { Link } from 'react-router-dom';
import { AITool } from '../data/aiTools';

// Get country flag emoji
const getCountryFlag = (country?: string) => {
  if (!country) return '🌐';
  
  switch (country) {
    case 'US':
    case 'USA':
      return '🇺🇸';
    case 'UK':
      return '🇬🇧';
    case 'CN':
      return '🇨🇳';
    case 'FR':
      return '🇫🇷';
    case 'JP':
      return '🇯🇵';
    case 'LU':
      return '🇱🇺';
    default:
      return '🌐';
  }
};

// Standardize country code to 2-letter format
const standardizeCountryCode = (country?: string) => {
  if (!country) return '';
  
  switch (country) {
    case 'US':
    case 'USA':
      return 'US';
    case 'UK':
      return 'UK';
    case 'CN':
    case 'China':
      return 'CN';
    case 'FR':
    case 'France':
      return 'FR';
    case 'JP':
    case 'Japan':
      return 'JP';
    case 'LU':
    case 'Luxembourg':
      return 'LU';
    default:
      return country;
  }
};

const AIToolCard: React.FC<{ tool: AITool }> = ({ tool }) => {
  // 阻止点击访问按钮时触发卡片链接
  const handleVisitClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(tool.toolUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <Link to={`/tool/${tool.id}`} className="block">
      <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
        
        {/* Top part: Image, title and description */}
        <div className="relative">
          <div className="h-48 bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
            {tool.image ? (
              <img 
                src={tool.image} 
                alt={tool.title} 
                className="w-auto h-auto max-w-[80%] max-h-[80%] object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200?text=AI+Tool';
                }}
              />
            ) : (
              <span className="text-6xl">🤖</span>
            )}
          </div>
          
          {/* Category in bottom right */}
          <div className="absolute bottom-2 right-2">
            <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-semibold px-2 py-1 rounded-full">
              {tool.category}
            </span>
          </div>
          
          {/* Price tag in bottom left */}
          <div className="absolute bottom-2 left-2">
            <span className={`inline-block ${tool.isFree ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' : 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200'} text-xs font-semibold px-2 py-1 rounded-full`}>
              {tool.isFree ? 'Free' : 'Paid'}
            </span>
          </div>
          
          {/* Country tag in top left */}
          {tool.country && (
            <div className="absolute top-2 left-2">
              <span className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs font-semibold px-2 py-1 rounded-full">
                {getCountryFlag(tool.country)} {standardizeCountryCode(tool.country)}
              </span>
            </div>
          )}
        </div>
        
        {/* Bottom part: AI tool info */}
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 line-clamp-1">{tool.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{tool.description}</p>
          
          <div className="mt-auto">
            {/* Visit tool button */}
            <button
              onClick={handleVisitClick}
              className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors duration-300 flex items-center justify-center"
            >
              <span className="mr-1">Visit</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AIToolCard; 