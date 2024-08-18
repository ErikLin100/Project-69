import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ActionPage from './pages/ActionPage';
import ProjectPage from './pages/ProjectPage';
import FeedbackPage from './pages/FeedbackPage';
import AuthPage from './pages/AuthPage';
import { useAuth } from './context/AuthContext';
import LandingNavbar from './components/LandingNavbar';
import Navbar from './components/Navbar';

function MainContent() {
  const { isLoggedIn } = useAuth();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const location = useLocation();

  const isFeedbackPage = location.pathname.includes('/feedback/');

  return (
    <div className={`app ${isLoggedIn ? 'gradient-background' : ''}`}>
      {!isFeedbackPage && (
        isLoggedIn ? (
          <Navbar />
        ) : (
          <LandingNavbar onAuthOpen={() => setIsAuthOpen(true)} />
        )
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/action"
            element={isLoggedIn ? <ActionPage /> : <LandingPage />}
          />
          <Route
            path="/project/:projectId"
            element={isLoggedIn ? <ProjectPage /> : <LandingPage />}
          />
          <Route path="/feedback/:projectId" element={<FeedbackPage />} />
        </Routes>
      </div>
      <AuthPage isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
}

export default MainContent;