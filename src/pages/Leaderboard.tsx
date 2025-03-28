import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import { getGamesByCategory, SortMethod, sortGames } from '../data/games';

const Leaderboard: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortMethod, setSortMethod] = useState<SortMethod>('plays');
  const [filteredGames, setFilteredGames] = useState(getGamesByCategory('All', 'plays'));

  useEffect(() => {
    setFilteredGames(getGamesByCategory(selectedCategory, sortMethod));
  }, [selectedCategory, sortMethod]);

  const formatNumber = (num: number): string => {
    return num.toLocaleString();
  };

  const categories = [
    'All',
    'Adventure',
    'Simulation',
    'Puzzle',
    'Casual',
    'Strategy'
  ];

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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Game Leaderboard</h1>
            <p className="text-xl text-gray-600">Discover the most popular games!</p>
          </div>

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
                  {category}
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

          {/* Leaderboard Table */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Game</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plays</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredGames.map((game, index) => (
                  <tr key={game.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link to={`/game/${game.id}`} className="text-indigo-600 hover:text-indigo-900">
                        {game.title}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {game.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {game.rating.toFixed(1)} ({game.totalRatings})
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {game.plays} 次
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Leaderboard; 