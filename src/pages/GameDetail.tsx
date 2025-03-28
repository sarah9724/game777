import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import GameEmbed from '../components/GameEmbed';
import CommentSection from '../components/CommentSection';
import RatingSystem from '../components/RatingSystem';
import { getGameById, Game } from '../data/games';
import { StarIcon, PlayIcon } from '@heroicons/react/24/outline';

const GameDetail: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const [game, setGame] = useState<Game | null>(null);
  const [commentCount, setCommentCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    if (!gameId) {
      setError('No game ID provided');
      return;
    }

    console.log('Loading game with ID:', gameId);
    const gameData = getGameById(gameId);
    console.log('Game data:', gameData);

    if (!gameData) {
      setError('Game not found');
      return;
    }

    setGame(gameData);
    
    // Load comment count from localStorage
    const savedComments = localStorage.getItem(`comments_${gameId}`);
    if (savedComments) {
      try {
        const parsedComments = JSON.parse(savedComments);
        setCommentCount(parsedComments.length);
      } catch (error) {
        console.error('Error parsing comments:', error);
        setCommentCount(0);
      }
    }
  }, [gameId]);

  const handleRatingUpdate = (newRating: number, newTotalRatings: number) => {
    if (game) {
      setGame({
        ...game,
        rating: newRating,
        totalRatings: newTotalRatings
      });
    }
  };

  if (error) {
    return (
      <AppLayout>
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
              <p className="text-gray-600">{error}</p>
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (!game) {
    return (
      <AppLayout>
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Loading...</h1>
              <p className="text-gray-600">Please wait while we load the game details.</p>
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Game Window */}
            <div className="lg:col-span-2">
              <GameEmbed gameUrl={game.gameUrl} title={game.title} gameId={game.id} />
            </div>

            {/* Game Info */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{game.title}</h1>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex items-center">
                    <StarIcon className="h-5 w-5 text-yellow-400" />
                    <span className="ml-1 text-gray-600">{game.rating.toFixed(1)} ({game.totalRatings} ratings)</span>
                  </div>
                  <div className="flex items-center">
                    <PlayIcon className="h-5 w-5 text-blue-500" />
                    <span className="ml-1 text-gray-600">{game.plays || 0} plays</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-6">{game.description}</p>

                {/* Rating System */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <RatingSystem
                    gameId={game.id}
                    initialRating={game.rating}
                    totalRatings={game.totalRatings}
                    onRatingUpdate={handleRatingUpdate}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="mt-8">
            <CommentSection gameId={game.id} />
          </div>
        </div>

        {/* Game Tips Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-pink-50/70 backdrop-blur-sm rounded-2xl p-8 max-w-lg mx-4 shadow-2xl transform transition-all border border-pink-100">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-pink-600 mb-2">{game.title}</h2>
                <div className="w-16 h-1 bg-pink-300 mx-auto rounded-full"></div>
              </div>
              <div className="flex items-start mb-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                    <svg className="h-6 w-6 text-pink-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Game Tip</h3>
                  <div className="space-y-3">
                    <p className="text-lg text-gray-700">
                      Please wait patiently, game is loading.....
                    </p>
                    <p className="text-lg text-gray-700">
                      Please choose <span className="font-bold text-2xl text-pink-600">Local save</span> to play the fun games!
                    </p>
                    <p className="text-lg text-gray-700 font-medium flex items-center">
                      <span className="mr-2 animate-bounce">✨</span>
                      <span className="animate-pulse">Enjoy!</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <button
                  onClick={() => setShowModal(false)}
                  className="w-full px-6 py-3 bg-pink-500 text-white text-lg font-semibold rounded-xl hover:bg-pink-600 transition-colors duration-200 shadow-lg hover:shadow-xl"
                >
                  Got it
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default GameDetail; 