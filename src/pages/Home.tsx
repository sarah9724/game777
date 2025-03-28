import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import { games, getGamesByCategory, searchGames, SortMethod, printGameCommentsCount, Game } from '../data/games';
import GameCard from '../components/GameCard';

// 分类数据
const categories = [
  'All',
  'Adventure',
  'Simulation',
  'Puzzle',
  'Casual',
  'Strategy'
];

// 获取分类对应的emoji
const getCategoryEmoji = (category: string) => {
  switch (category) {
    case 'Adventure':
      return '🗺️';
    case 'Simulation':
      return '🎮';
    case 'Puzzle':
      return '🧩';
    case 'Casual':
      return '🎯';
    case 'Strategy':
      return '⚔️';
    default:
      return '🎲';
  }
};

const Home: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortMethod, setSortMethod] = useState<SortMethod>('plays');
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);

  useEffect(() => {
    // 打印评论数量
    printGameCommentsCount();
    
    const query = searchParams.get('q') || '';
    setSearchQuery(query);
    
    if (query) {
      const searchResults = searchGames(query);
      setFilteredGames(searchResults);
    } else {
      setFilteredGames(getGamesByCategory(selectedCategory, sortMethod));
    }
  }, [searchParams, selectedCategory, sortMethod]);

  const sortMethods = [
    { value: 'plays', label: 'Most Played' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'date', label: 'Latest Games' },
    { value: 'comments', label: 'Most Commented' }
  ];

  return (
    <AppLayout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to NextGGame</h1>
            <p className="text-xl text-gray-600">Discover and play amazing games!</p>
          </div>

          {/* Search Results */}
          {searchQuery && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Search Results for "{searchQuery}"
              </h2>
              <p className="text-gray-600">
                Found {filteredGames.length} games matching your search
              </p>
            </div>
          )}

          {/* Category Filters and Sort Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {getCategoryEmoji(category)} {category}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortMethod}
                onChange={(e) => setSortMethod(e.target.value as SortMethod)}
                className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {sortMethods.map((method) => (
                  <option key={method.value} value={method.value}>
                    {method.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Game Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>

          {/* No Results Message */}
          {filteredGames.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No games found. Try a different search or category.</p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Home; 