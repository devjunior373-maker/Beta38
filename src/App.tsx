import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PopularBar } from './components/PopularBar';
import { AppCard } from './components/AppCard';
import { AuthModal } from './components/AuthModal';
import { PublishForm } from './components/PublishForm';
import { ProjectsView } from './components/ProjectsView';
import { TOP_DOWNLOADS } from './constants';
import { motion, AnimatePresence } from 'motion/react';
import { AppData } from './types';

export default function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [apps, setApps] = useState<AppData[]>(TOP_DOWNLOADS);
  const [currentView, setCurrentView] = useState<'home' | 'publish' | 'projects'>('home');

  const handlePublish = (newApp: AppData) => {
    setApps([newApp, ...apps]);
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen font-sans selection:bg-[#79B400] selection:text-white bg-[#E6E6E6]">
      <Header 
        onOpenAuth={() => setIsAuthModalOpen(true)} 
        isLoggedIn={isLoggedIn} 
        onPublishClick={() => isLoggedIn ? setCurrentView('publish') : setIsAuthModalOpen(true)}
        onProjectsClick={() => isLoggedIn ? setCurrentView('projects') : setIsAuthModalOpen(true)}
      />
      
      <main className="flex-1 overflow-y-auto no-scrollbar pb-12">
        <AnimatePresence mode="wait">
          {currentView === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Hero />
              <PopularBar />
              <div className="px-6 py-8 md:px-12 relative max-w-screen-2xl mx-auto">
                <div className="absolute top-0 left-0 w-48 h-24 bg-[#FF6300]" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}></div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-2"
                >
                  {apps.map((app) => (
                    <AppCard key={app.id} app={app} />
                  ))}
                </motion.div>
              </div>
            </motion.div>
          )}

          {currentView === 'publish' && (
            <PublishForm 
              key="publish"
              onBack={() => setCurrentView('home')}
              onPublish={handlePublish}
            />
          )}

          {currentView === 'projects' && (
            <ProjectsView 
              key="projects"
              apps={apps.filter(app => !TOP_DOWNLOADS.some(t => t.id === app.id))}
              onBack={() => setCurrentView('home')}
              onPublishClick={() => setCurrentView('publish')}
            />
          )}
        </AnimatePresence>
      </main>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onAuthSuccess={() => {
          setIsLoggedIn(true);
          setIsAuthModalOpen(false);
        }}
      />
    </div>
  );
}
