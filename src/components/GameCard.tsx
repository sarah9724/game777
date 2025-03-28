import React from 'react';
import { Link } from 'react-router-dom';
import { Game } from '../data/games';

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  return (
    <Link
      to={`/game/${game.id}`}
      className="group"
    >
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full border border-gray-100 flex flex-col">
        {/* 上半部分：图片、标题和描述 */}
        <div className="flex-1">
          <div className="relative">
            {game.image ? (
              <div className="aspect-w-16 aspect-h-9">
                <img 
                  src={game.image}
                  alt={game.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="aspect-w-16 aspect-h-9 bg-gradient-to-r from-purple-100 to-indigo-100 w-full flex items-center justify-center">
                <div className="text-6xl group-hover:scale-110 transition-transform duration-300">🎮</div>
              </div>
            )}
            {/* 右上角评分 */}
            <div className="absolute top-3 right-3 flex items-center bg-pink-500/80 backdrop-blur-md rounded-full px-2 py-1">
              <span className="text-yellow-400 text-xs mr-1">★</span>
              <span className="text-white text-xs">{game.rating.toFixed(1)} ({game.totalRatings} ratings)</span>
            </div>
            {/* 右下角分类 */}
            <div className="absolute bottom-3 right-3 flex items-center bg-pink-500/80 backdrop-blur-md rounded-full px-2 py-1">
              <span className="text-white text-xs">{game.category}</span>
            </div>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{game.title}</h3>
            <p className="text-sm text-gray-600">{game.description}</p>
          </div>
        </div>

        {/* 下半部分：游戏信息 */}
        <div className="border-t border-gray-100 p-4">
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center text-gray-600 text-xs">
              <span className="mr-1">🎮</span>
              {game.playTime}
            </div>
            <div className="flex items-center text-gray-600 text-xs">
              <span className="mr-1">🎯</span>
              {game.plays || 0} plays
            </div>
            <div className="flex items-center text-gray-600 text-xs">
              <span className="mr-1">💬</span>
              共 {game.comments?.length || 0} 条评论
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GameCard; 