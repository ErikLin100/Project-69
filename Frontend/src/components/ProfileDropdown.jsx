import React, { useState, useRef, useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const ProfileDropdown = ({ userPhotoURL }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  const handleManageSubscription = async () => {
    // Implement subscription management logic here
    // This could involve navigating to a subscription page or opening the Stripe Customer Portal
    console.log('Manage subscription clicked');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center focus:outline-none"
      >
        <img
          src={userPhotoURL || '/default-profile.png'}
          alt="Profile"
          className="w-8 h-8 rounded-full"
        />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
          <button
            onClick={handleManageSubscription}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
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
  );
};

export default ProfileDropdown;