import React from 'react';
import { Link } from 'react-router-dom';

const AppFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-[1200px] mx-auto px-6 py-8">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-4">
            <span className="text-3xl mr-2">🎮</span>
            <span className="font-semibold text-xl text-gray-900">
              NextGGame
            </span>
          </div>
          <p className="text-gray-600 max-w-md mx-auto">
            为女性用户提供精选游戏体验，包括游戏分类、评分、评价和排行功能，
            让您轻松找到喜爱的休闲娱乐。
          </p>
        </div>

        <div className="flex justify-center mb-6">
          <Link to="/contact" className="text-gray-600 hover:text-indigo-600 transition-colors">
            联系我们
          </Link>
        </div>
        
        <div className="pt-4 border-t border-gray-200">
          <p className="text-center text-gray-500 text-sm">
            © {currentYear} NextGGame. 保留所有权利。
          </p>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter; 