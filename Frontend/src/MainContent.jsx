import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ActionPage from './pages/ActionPage';
import { useAuth } from './context/AuthContext';
import LandingNavbar from './components/LandingNavbar';
import Navbar from './components/Navbar';

function MainContent() {
  const { isLoggedIn } = useAuth();

  return (
    <div className="app">
      {isLoggedIn ? <Navbar /> : <LandingNavbar />}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/action" element={isLoggedIn ? <ActionPage /> : <LandingPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default MainContent;