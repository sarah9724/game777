import React, { useState, useEffect } from 'react';
import AppLayout from '../components/AppLayout';
import SEO from '../components/SEO';
import { aiTools, AITool, getRecentlyVisitedTools } from '../data/aiTools';
import AIToolCard from '../components/AIToolCard';

const Popular: React.FC = () => {
  const [recentlyVisitedTools, setRecentlyVisitedTools] = useState<AITool[]>([]);
  
  useEffect(() => {
    // Get user's recently visited tools
    const recentTools = getRecentlyVisitedTools();
    setRecentlyVisitedTools(recentTools);
  }, []);

  return (
    <AppLayout>
      <SEO 
        title="Recently Visited AI Tools | AI Grocery"
        description="View your recently browsed AI tools. Discover trending and popular artificial intelligence tools across various categories."
        type="website"
        canonicalUrl="https://aigrocery.yourwebsite.com/popular" // 替换为实际网站URL
      />
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Recently Visited AI Tools</h1>
            <p className="text-xl text-gray-600">Your recently browsed AI tools appear here</p>
          </div>

          {/* Statistics Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <StatCard
              title="AI Tools"
              value={aiTools.length.toString()}
              icon="🤖"
              color="bg-purple-500"
            />
            <StatCard
              title="Categories"
              value={new Set(aiTools.map(tool => tool.category)).size.toString()}
              icon="📊"
              color="bg-green-500"
            />
            <StatCard
              title="Free Tools"
              value={aiTools.filter(tool => tool.isFree).length.toString()}
              icon="🎁"
              color="bg-orange-500"
            />
          </div>

          {/* Recently Visited Tools Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recentlyVisitedTools.length > 0 ? (
              recentlyVisitedTools.map(tool => (
                <AIToolCard key={tool.id} tool={tool} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-600">You haven't visited any AI tools yet. Explore our collection!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  icon: string;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-4">
        <div className={`${color} text-white p-3 rounded-full`}>
          <span className="text-2xl">{icon}</span>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default Popular; 