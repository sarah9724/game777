import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import GameEmbed from '../components/GameEmbed';
import RatingSystem from '../components/RatingSystem';
import CommentSection from '../components/CommentSection';
import { getGameById, Game, printGameCommentsCount } from '../data/games';

const GameDetail: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const [game, setGame] = useState<Game | null>(null);
  const [commentCount, setCommentCount] = useState<number>(0);
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    // 加载评论数量
    if (gameId) {
      const savedComments = localStorage.getItem(`game_${gameId}_comments`);
      if (savedComments) {
        try {
          const parsedComments = JSON.parse(savedComments);
          setCommentCount(parsedComments.length);
          console.log(`${game?.title}: ${parsedComments.length} 条评论`);
        } catch (error) {
          setCommentCount(0);
        }
      } else {
        setCommentCount(0);
      }
    }

    if (gameId) {
      const gameData = getGameById(gameId);
      if (gameData) {
        setGame(gameData);
      } else {
        navigate('/');
      }
    }
  }, [gameId, navigate]);

  const handleRatingUpdate = (newRating: number, newTotalRatings: number) => {
    if (game) {
      setGame({
        ...game,
        rating: newRating,
        totalRatings: newTotalRatings
      });
    }
  };

  if (!game) {
    return (
      <AppLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Loading...</h1>
            <p className="text-gray-600">Please wait while we load the game details.</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {game ? (
            <div className="space-y-8">
              {/* Game Window */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
                <div className="w-full h-[calc(100vh-200px)] min-h-[600px]">
                  <GameEmbed gameUrl={game.gameUrl} title={game.title} gameId={game.id} />
                </div>
              </div>

              {/* 游戏描述 */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
                <div className="p-8">
                  <div className="flex flex-col md:flex-row gap-8">
                    {/* Game Image */}
                    <div className="w-full md:w-1/3">
                      <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden">
                        <img
                          src={game.image}
                          alt={game.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Game Details */}
                    <div className="flex-1">
                      <p className="text-gray-600 mb-6">{game.description}</p>
                      
                      <div className="flex flex-wrap gap-4 mb-6">
                        <div className="flex items-center text-gray-600">
                          <span className="mr-2">🎮</span>
                          {game.playTime}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <span className="mr-2">⭐</span>
                          {game.rating.toFixed(1)} ({game.totalRatings} ratings)
                        </div>
                        <div className="flex items-center text-gray-600">
                          <span className="mr-2">🎯</span>
                          {game.plays || 0} plays
                        </div>
                        <div className="flex items-center text-gray-600">
                          <span className="mr-2">💬</span>
                          <span className="text-indigo-600 font-medium">共 {commentCount} 条评论</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {game.features?.map((feature: string, index: number) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>

                      <div className="prose max-w-none">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">How to Play</h3>
                        <div className="text-gray-600 whitespace-pre-line">{game.howToPlay}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rating and Comments */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <CommentSection gameId={game.id} />
                </div>
                <div>
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <RatingSystem
                      gameId={game.id}
                      initialRating={game.rating}
                      totalRatings={game.totalRatings}
                      onRatingUpdate={(newRating, newTotalRatings) => {
                        setGame(prev => prev ? {
                          ...prev,
                          rating: newRating,
                          totalRatings: newTotalRatings
                        } : null);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Loading...</h1>
              <p className="text-gray-600">Please wait while we load the game details.</p>
            </div>
          )}
        </div>
      </div>

      {/* 提示信息 Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-gray-900">游戏提示</h3>
                <p className="text-sm text-gray-500 mt-1">
                  请耐心等待游戏load, 请不要注册用户，直接玩
                </p>
              </div>
            </div>
            <div className="mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                我知道了
              </button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
};

export default GameDetail; 