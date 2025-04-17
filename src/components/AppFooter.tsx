import React from 'react';
import { Link } from 'react-router-dom';

const AppFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-[1200px] mx-auto px-6 py-8">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-4">
            <span className="text-3xl mr-2">🤖</span>
            <span className="font-semibold text-xl text-gray-900">
              AI Grocery
            </span>
          </div>
          <p className="text-gray-600 max-w-md mx-auto">
            Your comprehensive guide to AI tools and technologies, helping you discover 
            and navigate the best artificial intelligence solutions for your needs.
          </p>
        </div>

        <div className="flex justify-center space-x-8 mb-6">
          <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">
            Home
          </Link>
          <Link to="/popular" className="text-gray-600 hover:text-blue-600 transition-colors">
            Popular
          </Link>
          <Link to="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
            About
          </Link>
        </div>
        
        <div className="pt-4 border-t border-gray-200">
          <p className="text-center text-gray-500 text-sm">
            © {currentYear} AI Grocery. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter; 