import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  twitterCard?: string;
  canonicalUrl?: string;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    tags?: string[];
  };
}

const SEO: React.FC<SEOProps> = ({
  title = 'AI Grocery - Discover the Best AI Tools',
  description = 'Explore top AI tools and software for various tasks. Find AI chatbots, image generators, video creators, audio tools, and more at AI Grocery.',
  image = 'https://aigrocery.yourwebsite.com/og-image.jpg', // 替换为你实际的OG图片URL
  url = typeof window !== 'undefined' ? window.location.href : 'https://aigrocery.yourwebsite.com', // 替换为你的网站URL
  type = 'website',
  twitterCard = 'summary_large_image',
  canonicalUrl,
  article
}) => {
  const siteTitle = 'AI Grocery';
  const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`;
  
  return (
    <Helmet>
      {/* 基本元标签 */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      
      {/* 规范链接 */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* 开放图谱标签 */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteTitle} />
      
      {/* Twitter 卡片 */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* 文章特定元标签 */}
      {article && (
        <>
          {article.publishedTime && <meta property="article:published_time" content={article.publishedTime} />}
          {article.modifiedTime && <meta property="article:modified_time" content={article.modifiedTime} />}
          {article.tags && article.tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
    </Helmet>
  );
};

export default SEO; 