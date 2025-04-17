import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import SEO from '../components/SEO';
import { AITool, getToolById, updateToolVisits, addToRecentVisits } from '../data/aiTools';

const ToolDetail: React.FC = () => {
  const { toolId } = useParams<{ toolId: string }>();
  const [tool, setTool] = useState<AITool | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (toolId) {
      const foundTool = getToolById(toolId);
      
      if (foundTool) {
        setTool(foundTool);
        // Update tool visits count
        updateToolVisits(toolId);
        // Add to recently visited tools
        addToRecentVisits(toolId);
      } else {
        console.error(`Tool with ID ${toolId} not found`);
      }
      
      setLoading(false);
    }
  }, [toolId]);

  if (loading) {
    return (
      <AppLayout>
        <SEO title="Loading..." />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </AppLayout>
    );
  }

  if (!tool) {
    return (
      <AppLayout>
        <SEO 
          title="Tool Not Found | AI Grocery"
          description="Sorry, the AI tool you're looking for does not exist."
        />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">404</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Tool Not Found</h1>
            <p className="text-gray-600 mb-4">Sorry, the AI tool you're looking for does not exist.</p>
            <Link to="/" className="text-blue-600 hover:text-blue-700 font-medium">
              Back to Home
            </Link>
          </div>
        </div>
      </AppLayout>
    );
  }

  // 为每个工具创建结构化数据（schema.org）
  const toolJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': tool.title,
    'description': tool.description,
    'image': tool.image,
    'applicationCategory': tool.category,
    'operatingSystem': 'Web-based',
    'offers': {
      '@type': 'Offer',
      'price': tool.isFree ? '0' : undefined,
      'priceCurrency': 'USD',
      'availability': 'https://schema.org/OnlineOnly'
    }
  };

  return (
    <AppLayout>
      <SEO 
        title={`${tool.title} | AI Grocery`}
        description={tool.description}
        image={tool.image}
        type="product"
        canonicalUrl={`https://aigrocery.yourwebsite.com/tool/${tool.id}`} // 替换为实际的网站URL
        article={{
          publishedTime: tool.createdAt,
          tags: [tool.category, 'AI Tools', tool.isFree ? 'Free AI' : 'Paid AI']
        }}
      />
      <div className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Structured Data */}
          <script type="application/ld+json">
            {JSON.stringify(toolJsonLd)}
          </script>

          {/* Back button */}
          <Link 
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to AI Tools
          </Link>

          {/* Tool header */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-8">
            <div className="relative">
              {tool.image ? (
                <div className="aspect-w-16 aspect-h-6">
                  <img 
                    src={tool.image} 
                    alt={`${tool.title} - AI Tool Logo`} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70"></div>
                </div>
              ) : (
                <div className="aspect-w-16 aspect-h-6 bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                  <div className="text-9xl text-white/80">🤖</div>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70"></div>
                </div>
              )}
              
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <h1 className="text-4xl font-bold mb-2">{tool.title}</h1>
                <div className="flex items-center space-x-4">
                  <div className="px-2 py-1 rounded-full bg-blue-500/80 text-xs">{tool.category}</div>
                  <div className={`px-2 py-1 rounded-full ${tool.isFree ? 'bg-green-500/80' : 'bg-orange-500/80'} text-xs`}>
                    {tool.isFree ? 'Free' : 'Paid'}
                  </div>
                  {tool.country && (
                    <div className="px-2 py-1 rounded-full bg-gray-500/80 text-xs">
                      {tool.country}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
                <p className="text-gray-700">{tool.description}</p>
              </div>
              
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Features</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {tool.features?.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-500 mr-2">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use</h2>
                <p className="text-gray-700">{tool.howToUse}</p>
              </div>
              
              {tool.pricing && (
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Pricing</h2>
                  <p className="text-gray-700">{tool.pricing}</p>
                </div>
              )}
              
              <div className="mt-8">
                <a 
                  href={tool.toolUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <span className="mr-2">Visit Tool</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Comments section can be added here */}
        </div>
      </div>
    </AppLayout>
  );
};

export default ToolDetail; 