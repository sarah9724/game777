import React from 'react';
import AppNavigation from './AppNavigation';
import AppFooter from './AppFooter';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-pink-50">
      <AppNavigation />
      <main className="w-full pt-20 md:pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
      <AppFooter />
    </div>
  );
};

export default AppLayout; 