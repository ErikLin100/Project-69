import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { signOut,  getAuth } from 'firebase/auth';
import { auth } from '../firebase';
import { FaBars } from 'react-icons/fa';

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      logout();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleManageSubscription = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      const idToken = await user.getIdToken();
  
      const response = await fetch('http://localhost:3000/api/stripe/create-manage-subscription-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to create manage subscription session');
      }
  
      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Error managing subscription:', error);
      // Handle error (e.g., show an error message to the user)
    }
  };
  return (
    <nav className="bg-transparent p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/action" className="font-semibold font-opensans text-[#313030] text-xl">
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
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="text-[#313030] focus:outline-none"
          >
            <FaBars size={24} />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
              <button
                onClick={handleManageSubscription}
                className="block w-full text-left px-4 py-2 text-sm text-[#313030] hover:bg-gray-100"
              >
                Manage Subscription
              </button>
              <div className="border-t border-gray-100"></div>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;