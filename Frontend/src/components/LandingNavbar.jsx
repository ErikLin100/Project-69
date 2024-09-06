import React from 'react';
import { Link } from 'react-router-dom';
import icon from '../assets/images/icon.svg';

function LandingNavbar({ onAuthOpen }) {
  return (
    <nav className="bg-transparent p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src={icon} alt="Feedback Wizard" className="h-12 w-auto" />
        </Link>
        <div className="flex-grow flex justify-center">
          <Link to="/features" className="font-semibold font-opensans text-[#313030] mx-4">Features</Link>
          <Link to="/pricing" className="font-semibold font-opensans text-[#313030] mx-4">Pricing</Link>
        </div>
        <div>
          <button onClick={onAuthOpen} className="font-semibold font-opensans text-[#313030] mr-4">Login</button>
          <button onClick={onAuthOpen} className="font-semibold font-opensans bg-[#F8F8FF] text-[#313030] py-2 px-4 rounded-full">Sign Up</button>
        </div>
      </div>
    </nav>
  );
}

export default LandingNavbar;