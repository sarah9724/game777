import React from 'react';
import AppLayout from '../components/AppLayout';
import SEO from '../components/SEO';

const About: React.FC = () => {
  return (
    <AppLayout>
      <SEO 
        title="About AI Grocery | Your Guide to AI Tools"
        description="Learn about AI Grocery, your comprehensive guide to discovering and comparing the best AI tools. Our mission is to help you navigate the vast AI landscape."
        type="website"
        canonicalUrl="https://aigrocery.yourwebsite.com/about" // 替换为实际网站URL
      />
      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-8">
            <div className="relative">
              <div className="aspect-w-16 aspect-h-6 bg-gradient-to-r from-blue-400 to-purple-500">
                <div className="flex items-center justify-center">
                  <h1 className="text-5xl font-bold text-white z-10">About AI Grocery</h1>
                </div>
                <div className="absolute inset-0 bg-pattern opacity-10"></div>
              </div>
            </div>
            
            <div className="p-8">
              <section className="mb-10">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                <p className="text-lg text-gray-700 mb-4">
                  AI Grocery aims to be your comprehensive guide to the ever-expanding world of AI tools and technologies. We believe that artificial intelligence has the potential to transform how we work, create, and solve problems, but navigating the vast landscape of AI solutions can be overwhelming.
                </p>
                <p className="text-lg text-gray-700">
                  Our mission is to curate, organize, and present the best AI tools available today, making it easier for you to discover and utilize the perfect solutions for your specific needs.
                </p>
              </section>
              
              <section className="mb-10">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">What We Offer</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-6 rounded-xl">
                    <div className="text-3xl mb-4">🔍</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Comprehensive Directory</h3>
                    <p className="text-gray-700">
                      A carefully curated collection of the most useful and innovative AI tools across multiple categories.
                    </p>
                  </div>
                  <div className="bg-purple-50 p-6 rounded-xl">
                    <div className="text-3xl mb-4">📊</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">User Ratings & Reviews</h3>
                    <p className="text-gray-700">
                      Real feedback from actual users to help you make informed decisions about which tools to try.
                    </p>
                  </div>
                  <div className="bg-green-50 p-6 rounded-xl">
                    <div className="text-3xl mb-4">📚</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Detailed Information</h3>
                    <p className="text-gray-700">
                      Comprehensive details about each tool, including features, pricing, and how-to guides.
                    </p>
                  </div>
                  <div className="bg-orange-50 p-6 rounded-xl">
                    <div className="text-3xl mb-4">🚀</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Stay Updated</h3>
                    <p className="text-gray-700">
                      Regular updates on new tools and technologies in the rapidly evolving AI landscape.
                    </p>
                  </div>
                </div>
              </section>
              
              <section className="mb-10">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
                <p className="text-lg text-gray-700 mb-4">
                  AI Grocery was founded in 2024 by a team of AI enthusiasts who were frustrated by the lack of a centralized resource for discovering and comparing AI tools. What started as a simple list of our favorite tools has grown into a comprehensive platform designed to serve everyone from AI novices to experts.
                </p>
                <p className="text-lg text-gray-700">
                  We're committed to staying at the forefront of AI advancements and continuing to develop this platform as a valuable resource for our community.
                </p>
              </section>
              
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Us</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Have questions, suggestions, or want to collaborate? We'd love to hear from you!
                </p>
                <div className="bg-gray-50 p-6 rounded-xl">
                  <p className="text-gray-700 mb-2">
                    <span className="font-semibold">Email:</span> aigrocery.info@gmail.com
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default About; 