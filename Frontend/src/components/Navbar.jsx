import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { toggleLogin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    toggleLogin();
    navigate('/');
  };

  return (
    <nav className="bg-transparent p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/home" className="font-semibold font-opensans text-[#313030] text-xl">
         "logo".AI
        </Link>
        <div className="flex-grow flex justify-center">
          <Link to="/create" className="font-semibold font-opensans text-[#313030] mx-4">
            Create
          </Link>
          <Link to="/how-to-use" className="font-semibold font-opensans text-[#313030] mx-4">
            How To Use
          </Link>
          <Link to="/feedback" className="font-semibold font-opensans text-[#313030] mx-4">
            Feedback
          </Link>
        </div>
        <div>
          <button
            onClick={handleLogout}
            className="font-semibold font-opensans text-[#313030] mr-4"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;