import React, { useState, useEffect } from 'react';

interface Comment {
  id: string;
  nickname: string;
  content: string;
  timestamp: number;
  gameId: string;
}

interface CommentSectionProps {
  gameId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ gameId }) => {
  const [nickname, setNickname] = useState('');
  const [content, setContent] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [commentCount, setCommentCount] = useState<number>(0);

  // 从localStorage加载评论
  useEffect(() => {
    const savedComments = localStorage.getItem(`game_${gameId}_comments`);
    if (savedComments) {
      try {
        const parsedComments = JSON.parse(savedComments);
        setComments(parsedComments);
        setCommentCount(parsedComments.length);
        console.log(`${gameId}: ${parsedComments.length} 条评论`);
      } catch (error) {
        console.error('Error loading comments:', error);
      }
    }
  }, [gameId]);

  // 提交评论
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nickname.trim() || !content.trim()) {
      alert('Please enter your nickname and comment');
      return;
    }

    const newComment: Comment = {
      id: Date.now().toString(),
      nickname: nickname.trim(),
      content: content.trim(),
      timestamp: Date.now(),
      gameId
    };

    const updatedComments = [newComment, ...comments];
    setComments(updatedComments);
    localStorage.setItem(`game_${gameId}_comments`, JSON.stringify(updatedComments));
    setCommentCount(updatedComments.length);
    
    // Reset form
    setContent('');
  };

  // 格式化时间
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Comment Input Area */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Your Nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            maxLength={20}
          />
        </div>
        <div>
          <textarea
            placeholder="Write your comment..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            rows={4}
            maxLength={500}
          />
        </div>
        <div>
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Post Comment
          </button>
        </div>
      </form>

      {/* Comment Count */}
      <div className="text-sm text-gray-600 mb-4">
        共 {commentCount} 条评论
      </div>

      {/* Comment List */}
      <div className="space-y-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-100"
            >
              <div className="flex justify-between items-start">
                <h3 className="font-medium text-gray-800">{comment.nickname}</h3>
                <span className="text-sm text-gray-500">
                  {formatTime(comment.timestamp)}
                </span>
              </div>
              <p className="mt-2 text-gray-600 whitespace-pre-wrap">{comment.content}</p>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-4">
            No comments yet. Be the first to share your thoughts!
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection; 