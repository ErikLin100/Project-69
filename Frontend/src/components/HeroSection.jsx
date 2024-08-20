import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'animate.css';

const demographics = ["business?", "project?", "startup?"];

function HeroSection() {
  const [currentDemographic, setCurrentDemographic] = useState(0);
  const [displayText, setDisplayText] = useState(demographics[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDemographic((prev) => (prev + 1) % demographics.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const word = demographics[currentDemographic];
    let index = 0;
    const timer = setInterval(() => {
      setDisplayText(word.substring(0, index));
      index++;
      if (index > word.length) clearInterval(timer);
    }, 50);

    return () => clearInterval(timer);
  }, [currentDemographic]);

  return (
    <div className="mt-8 rounded-lg bg-main-gradient from-purple-600 to-purple-400 text-white py-20 px-8 sm:px-16 md:px-24 lg:px-32 animated-gradient overflow-hidden hero-section">
      <div className="container mx-auto text-center flex flex-col items-center">
        <h1 className="leading-slightly-relaxed text-5xl font-semibold font-opensans mb-6 flex flex-wrap justify-center items-center">
          <span className="text-[#313030] ">Do you have a</span>
          <span className="text-white inline-block min-w-[250px]">{displayText}</span>
        </h1>
        <p className="text-2xl font-normal font-opensans mb-8 text-white max-w-3xl">
          Revolutionize your feedback process with our AI-powered digital mailbox solution. Gather insights, analyze trends, and make data-driven decisions effortlessly.
        </p>
        <h2 className="text-4xl font-semibold font-opensans mb-6 text-[#313030]">
          Discover the power of <span className='relative inline-block text-reveal'>
            FeedbackWizard
          </span>
        </h2>
        <Link to="/signup" className="bg-[#F5F6F8] font-semibold font-opensans text-purple-600 py-3 px-8 rounded-full text-lg hover:bg-gray-100 transition duration-300">
          Start Your Free Trial
        </Link>
      </div>
    </div>
  );
}

export default HeroSection;