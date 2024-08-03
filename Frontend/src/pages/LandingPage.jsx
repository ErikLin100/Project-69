import React from 'react';
import HeroSection from '../components/HeroSection';
import Navbar from '../components/LandingNavbar';
import ProcessSection from '../components/ProcessSection';
import FeatureSection from '../components/FeatureSection';

function LandingPage() {
  return (
    <div>
      
      <HeroSection />
      <ProcessSection />
      <FeatureSection />
      
      {/* Add more sections as needed */}
    </div>
  );
}

export default LandingPage;