import React from 'react';
import HeroSection from '../components/HeroSection';
import ProcessSection from '../components/ProcessSection';
import AnalysisExamplesSection from '../components/AnalysisExamplesSection';
import ThemeAnalysisSection from '../components/ThemeAnalysisSection';
import NegativeAnalysisSection from '../components/NegativeAnalysisSection';
import PricingCard from '../components/PricingCard';

function LandingPage() {
  return (
    <div className=''>
      <HeroSection />
      <ProcessSection />
      <div className="relative w-screen left-1/2 right-1/2 -mx-[50vw]">
        <AnalysisExamplesSection />
      </div>
      <ThemeAnalysisSection />
      <NegativeAnalysisSection />
      <PricingCard/>
    </div>
  );
}

export default LandingPage;