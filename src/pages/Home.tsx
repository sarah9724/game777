import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import SEO from '../components/SEO';
import { 
  aiTools, 
  getToolsByCategory, 
  searchTools, 
  SortMethod, 
  printToolCommentsCount,
  categories,
  getCategoryEmoji
} from '../data/aiTools';
import AIToolCard from '../components/AIToolCard';

const Home: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortMethod, setSortMethod] = useState<SortMethod>('alphabetical');
  const [filteredTools, setFilteredTools] = useState(aiTools);

  useEffect(() => {
    // Print comments count
    printToolCommentsCount();
    
    const query = searchParams.get('q') || '';
    setSearchQuery(query);
    
    if (query) {
      const searchResults = searchTools(query);
      setFilteredTools(searchResults);
    } else {
      setFilteredTools(getToolsByCategory(selectedCategory, sortMethod));
    }
  }, [searchParams, selectedCategory, sortMethod]);

  const sortMethods = [
    { value: 'alphabetical', label: 'A-Z' },
    { value: 'visits', label: 'Most Visited' },
    { value: 'date', label: 'Latest Tools' }
  ];

  // 根据查询条件或类别生成动态SEO标题和描述
  const getSeoTitle = () => {
    if (searchQuery) {
      return `Search results for "${searchQuery}" | AI Grocery`;
    }
    if (selectedCategory !== 'All') {
      return `${selectedCategory} AI Tools | AI Grocery`;
    }
    return 'AI Grocery - Discover the Best AI Tools';
  };

  const getSeoDescription = () => {
    if (searchQuery) {
      return `Browse ${filteredTools.length} AI tools matching "${searchQuery}". Find the best AI solutions for your needs at AI Grocery.`;
    }
    if (selectedCategory !== 'All') {
      return `Explore top ${selectedCategory} AI tools. Compare features, pricing, and user ratings to find the best ${selectedCategory.toLowerCase()} solution for your needs.`;
    }
    return 'Explore top AI tools and software for various tasks. Find AI chatbots, image generators, video creators, audio tools, and more at AI Grocery.';
  };

  return (
    <AppLayout>
      <SEO 
        title={getSeoTitle()}
        description={getSeoDescription()}
        canonicalUrl={searchQuery ? undefined : 'https://aigrocery.yourwebsite.com'} // 替换为实际的网站URL
      />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header with Sort Control */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome to AI Grocery</h1>
              <p className="text-xl text-gray-600">Discover and explore the best AI tools available today!</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortMethod}
                onChange={(e) => setSortMethod(e.target.value as SortMethod)}
                className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-40"
              >
                {sortMethods.map((method) => (
                  <option key={method.value} value={method.value}>
                    {method.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Search Results */}
          {searchQuery && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Search Results for "{searchQuery}"
              </h2>
              <p className="text-gray-600">
                Found {filteredTools.length} AI tools matching your search
              </p>
            </div>
          )}

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {getCategoryEmoji(category)} {category}
              </button>
            ))}
          </div>

          {/* AI Tools Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTools.map((tool) => (
              <AIToolCard key={tool.id} tool={tool} />
            ))}
          </div>

          {/* No Results Message */}
          {filteredTools.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No AI tools found. Try a different search or category.</p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Home; 