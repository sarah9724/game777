import React, { useState, useEffect } from 'react';
import { updateGameRating } from '../data/games';

interface RatingSystemProps {
  gameId: string;
  initialRating: number;
  totalRatings: number;
  onRatingUpdate: (newRating: number, newTotalRatings: number) => void;
}

const RatingSystem: React.FC<RatingSystemProps> = ({
  gameId,
  initialRating,
  totalRatings,
  onRatingUpdate
}) => {
  const [rating, setRating] = useState<number | null>(null);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // 从 sessionStorage 加载用户评分
    const savedRating = sessionStorage.getItem(`game_${gameId}_rating`);
    if (savedRating) {
      setRating(parseInt(savedRating));
    }
  }, [gameId]);

  const handleRatingClick = (selectedRating: number) => {
    setRating(selectedRating);
    sessionStorage.setItem(`game_${gameId}_rating`, selectedRating.toString());
  };

  const handleSubmitRating = async () => {
    if (rating === null) {
      setErrorMessage('Please select a rating before submitting.');
      setShowError(true);
      return;
    }

    setIsSubmitting(true);
    setShowError(false);
    setShowSuccess(false);

    try {
      const { newRating, newTotalRatings } = await updateGameRating(gameId, rating);
      onRatingUpdate(newRating, newTotalRatings);
      setShowSuccess(true);
    } catch (error) {
      setErrorMessage('Failed to submit rating. Please try again.');
      setShowError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetRating = () => {
    setRating(null);
    sessionStorage.removeItem(`game_${gameId}_rating`);
    setShowSuccess(false);
    setShowError(false);
  };

  return (
    <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-gray-100/50">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Rate this Game</h3>
          <p className="text-sm text-gray-600">Share your experience with this game</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">
            {initialRating.toFixed(1)}
          </div>
          <div className="text-sm text-gray-600">
            {totalRatings} {totalRatings === 1 ? 'rating' : 'ratings'}
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleRatingClick(star)}
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(null)}
            className={`text-2xl focus:outline-none transition-colors ${
              (hoveredRating !== null ? star <= hoveredRating : star <= (rating || 0))
                ? 'text-yellow-400'
                : 'text-gray-300'
            }`}
          >
            ★
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={handleResetRating}
          disabled={rating === null}
          className={`text-sm transition-colors ${
            rating === null
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Reset Rating
        </button>
        <button
          onClick={handleSubmitRating}
          disabled={isSubmitting || rating === null}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            isSubmitting || rating === null
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Rating'}
        </button>
      </div>

      {showSuccess && (
        <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-lg text-sm">
          Thank you for rating this game!
        </div>
      )}

      {showError && (
        <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default RatingSystem; 