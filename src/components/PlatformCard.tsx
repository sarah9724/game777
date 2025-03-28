import React, { useState } from 'react';
import { Platform, Comment, saveComment, updatePlatformRating } from '../data/games';

interface PlatformCardProps {
  platform: Platform;
}

const PlatformCard: React.FC<PlatformCardProps> = ({ platform }) => {
  const [isCommenting, setIsCommenting] = useState(false);
  const [comment, setComment] = useState('');
  const [username, setUsername] = useState('');
  const [rating, setRating] = useState(5);
  const [showComments, setShowComments] = useState(false);

  const handleSubmitComment = () => {
    if (!comment.trim() || !username.trim()) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      username: username.trim(),
      content: comment.trim(),
      rating,
      date: new Date().toISOString()
    };

    saveComment(platform.id, newComment);
    updatePlatformRating(platform.id, rating);

    setComment('');
    setUsername('');
    setRating(5);
    setIsCommenting(false);
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
      {/* 平台图片 */}
      <div className="aspect-w-16 aspect-h-9 relative overflow-hidden">
        <img 
          src={platform.image}
          alt={platform.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center justify-between">
            <h3 className="text-white text-xl font-bold flex items-center">
              <span className="text-2xl mr-2">{platform.icon}</span>
              {platform.name}
            </h3>
            <div className="flex items-center bg-white/90 backdrop-blur-md rounded-full px-3 py-1.5 shadow-lg">
              <span className="text-yellow-500 text-sm mr-1">★</span>
              <span className="text-gray-900 font-medium">{platform.rating.toFixed(1)}</span>
              <span className="text-gray-500 text-sm ml-1">({platform.totalRatings})</span>
            </div>
          </div>
        </div>
      </div>

      {/* 平台描述 */}
      <div className="p-4">
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {platform.description}
        </p>
        
        {/* 操作按钮 */}
        <div className="flex items-center justify-between">
          <a
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
          >
            <span className="mr-2">访问平台</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
          <button
            onClick={() => setIsCommenting(prev => !prev)}
            className="inline-flex items-center px-4 py-2 bg-pink-100 text-pink-600 rounded-xl hover:bg-pink-200 transition-colors"
          >
            <span className="mr-2">评价</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>
        </div>

        {/* 评论表单 */}
        {isCommenting && (
          <div className="mt-4 p-4 bg-gray-50 rounded-xl">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                评分
              </label>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className={`text-2xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                昵称
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-500"
                placeholder="请输入你的昵称"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                评论
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-500"
                rows={3}
                placeholder="分享你的使用体验..."
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsCommenting(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                取消
              </button>
              <button
                onClick={handleSubmitComment}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                提交评论
              </button>
            </div>
          </div>
        )}

        {/* 评论列表 */}
        {platform.comments.length > 0 && (
          <div className="mt-4">
            <button
              onClick={() => setShowComments(prev => !prev)}
              className="text-purple-600 hover:text-purple-700 text-sm font-medium"
            >
              {showComments ? '收起评论' : `查看全部 ${platform.comments.length} 条评论`}
            </button>
            {showComments && (
              <div className="mt-2 space-y-3">
                {platform.comments.map(comment => (
                  <div key={comment.id} className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">{comment.username}</span>
                      <div className="flex items-center">
                        <span className="text-yellow-400 text-sm mr-1">{'★'.repeat(comment.rating)}</span>
                        <span className="text-gray-400 text-xs">
                          {new Date(comment.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">{comment.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlatformCard; 