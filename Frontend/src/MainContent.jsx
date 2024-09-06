import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ActionPage from './pages/ActionPage';
import ProjectPage from './pages/ProjectPage';
import FeedbackPage from './pages/FeedbackPage';
import AuthPage from './pages/AuthPage';
import PricingPage from './pages/PricingPage';
import StripeSuccessPage from './pages/StripeSuccessPage';
import { useAuth } from './context/AuthContext';
import LandingNavbar from './components/LandingNavbar';
import Navbar from './components/Navbar';

function ProtectedRoute({ children }) {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isLoggedIn ? children : <Navigate to="/" />;
}

function MainContent() {
  const { isLoggedIn, isLoading } = useAuth();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isFeedbackPage = location.pathname.includes('/feedback/');

  useEffect(() => {
    if (isLoggedIn && location.pathname === '/') {
      navigate('/action');
    }
  }, [isLoggedIn, location.pathname, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
          <Route path="/" element={isLoggedIn ? <Navigate to="/action" /> : <LandingPage />} />
          <Route path="/action" element={<ProtectedRoute><ActionPage /></ProtectedRoute>} />
          <Route path="/project/:projectId" element={<ProtectedRoute><ProjectPage /></ProtectedRoute>} />
          <Route path="/feedback/:projectId" element={<FeedbackPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/stripe-success" element={<StripeSuccessPage />} />
        </Routes>
      </div>
      <AuthPage isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
}

export default MainContent;