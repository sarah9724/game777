import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Home from './pages/Home';
import ToolDetail from './pages/ToolDetail';
import Popular from './pages/Popular';
import About from './pages/About';

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tool/:toolId" element={<ToolDetail />} />
          <Route path="/popular" element={<Popular />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <div className="text-6xl mb-4">404</div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h1>
                <p className="text-gray-600 mb-4">Sorry, the page you visited does not exist.</p>
                <a href="/" className="text-blue-600 hover:text-blue-700 font-medium">
                  Back to Home
                </a>
              </div>
            </div>
          } />
        </Routes>
      </Router>
    </HelmetProvider>
  );
};

export default App;
