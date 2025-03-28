import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import { games, Game, getGamesByCategory, SortMethod, printGameCommentsCount } from '../data/games';

const Ranking: React.FC = () => {
  const [sortMethod, setSortMethod] = useState<SortMethod>('plays');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [gameComments, setGameComments] = useState<Record<string, number>>({});

  // Get all available categories
  const categories = useMemo(() => {
    const uniqueCategories = new Set(games.map(game => game.category));
    return ['All', ...Array.from(uniqueCategories)];
  }, []);

  // 加载所有游戏的评论数量
  useEffect(() => {
    const comments: Record<string, number> = {};
    games.forEach(game => {
      const savedComments = localStorage.getItem(`game_${game.id}_comments`);
      if (savedComments) {
        try {
          const parsedComments = JSON.parse(savedComments);
          comments[game.id] = parsedComments.length;
          console.log(`${game.title}: ${parsedComments.length} 条评论`);
        } catch (error) {
          comments[game.id] = 0;
        }
      } else {
        comments[game.id] = 0;
      }
    });
    setGameComments(comments);
  }, []);

  useEffect(() => {
    // 打印评论数量
    printGameCommentsCount();
  }, []);

  // Filter and sort games based on conditions
  const sortedGames = useMemo(() => {
    return getGamesByCategory(selectedCategory, sortMethod);
  }, [selectedCategory, sortMethod]);

  const sortMethods = [
    { value: 'plays', label: 'Most Played' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'date', label: 'Latest Games' },
    { value: 'comments', label: 'Most Commented' }
  ];

  return (
    <AppLayout>
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Game Leaderboard
          </h1>
          <p className="text-gray-600">
            Discover the most popular and highest rated games
          </p>
        </div>

        {/* Filter and Sort Controls */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Game Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full rounded-lg border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white/50 backdrop-blur-sm"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sort By
            </label>
            <select
              value={sortMethod}
              onChange={(e) => setSortMethod(e.target.value as SortMethod)}
              className="w-full rounded-lg border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white/50 backdrop-blur-sm"
            >
              {sortMethods.map((method) => (
                <option key={method.value} value={method.value}>
                  {method.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Game List */}
        <div className="space-y-4">
          {sortedGames.map((game, index) => (
            <Link
              key={game.id}
              to={`/game/${game.id}`}
              className="block bg-white/50 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100/50 overflow-hidden hover:bg-white/60"
            >
              <div className="flex items-center p-4">
                <div className="flex-shrink-0 w-16 text-center">
                  <div className="text-2xl font-bold text-primary-600">
                    #{index + 1}
                  </div>
                </div>
                <div className="flex-shrink-0 w-24 h-24 bg-gray-100/50 rounded-lg overflow-hidden">
                  {game.image ? (
                    <img
                      src={game.image}
                      alt={game.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl">
                      🎮
                    </div>
                  )}
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {game.title}
                    </h2>
                    <span className="inline-block px-3 py-1 bg-primary-50/50 text-primary-600 text-sm rounded-full">
                      {game.category}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                    {game.description}
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="flex items-center">
                      <span className="text-yellow-400 mr-1">★</span>
                      {game.rating.toFixed(1)}
                    </span>
                    <span className="mx-2">•</span>
                    <span>{game.totalRatings} ratings</span>
                    <span className="mx-2">•</span>
                    <span>{game.plays || 0} plays</span>
                    <span className="mx-2">•</span>
                    <span className="text-indigo-600 font-medium">共 {gameComments[game.id] || 0} 条评论</span>
                    <span className="mx-2">•</span>
                    <span>Released: {new Date(game.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}

          {sortedGames.length === 0 && (
            <div className="text-center py-16">
              <div className="text-4xl mb-4">🎮</div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                No Games Found
              </h3>
              <p className="text-gray-600">
                No games found in this category. Please try another category.
              </p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Ranking; 