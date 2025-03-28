import React, { useState, useEffect } from 'react';
import { updateGamePlays } from '../data/games';

interface GameEmbedProps {
  gameUrl: string;
  title: string;
  gameId: string;
}

const GameEmbed: React.FC<GameEmbedProps> = ({
  gameUrl,
  title,
  gameId
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 检查上次更新的时间
    const lastUpdate = localStorage.getItem(`game-plays-last-update-${gameId}`);
    const now = Date.now();
    
    // 如果上次更新是在 5 秒内，则不更新
    if (lastUpdate && now - parseInt(lastUpdate) < 5000) {
      return;
    }
    
    // 更新游玩次数
    updateGamePlays(gameId);
    
    // 记录更新时间
    localStorage.setItem(`game-plays-last-update-${gameId}`, now.toString());
  }, [gameId]);

  return (
    <div className="w-full h-full">
      <iframe
        src={gameUrl}
        title={title}
        className="w-full h-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        onLoad={() => setIsLoading(false)}
      />
      <div className="mt-2 text-center text-sm text-gray-500">
        Game provided by external source
      </div>
    </div>
  );
};

export default GameEmbed; 