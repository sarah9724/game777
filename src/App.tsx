import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GameDetail from './pages/GameDetail';
import Ranking from './pages/Ranking';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:gameId" element={<GameDetail />} />
        <Route path="/leaderboard" element={<Ranking />} />
        <Route path="*" element={
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="text-6xl mb-4">404</div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h1>
              <p className="text-gray-600 mb-4">Sorry, the page you visited does not exist.</p>
              <a href="/" className="text-indigo-600 hover:text-indigo-700 font-medium">
                Back to Home
              </a>
            </div>
          </div>
        } />
      </Routes>
    </Router>
  );
};

export default App;
