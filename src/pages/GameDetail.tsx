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
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Category:</span>
                    <span className="font-medium text-gray-900">{game.category}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Platform:</span>
                    <span className="font-medium text-gray-900">{game.playTime}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Released:</span>
                    <span className="font-medium text-gray-900">
                      {new Date(game.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

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
      </div>
    </AppLayout>
  );
};

export default GameDetail; 