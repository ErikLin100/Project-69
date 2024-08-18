import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useAuth } from '../context/AuthContext';


function AuthPage({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { login } = useAuth();

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
  
      // Create or update user document in Firestore
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
  
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          email: user.email,
          analysisFrequency: 'weekly',
          feedbackThreshold: 50,
          createdAt: new Date()
        });
      }
  
      login();
      onClose();
      navigate('/action');
    } catch (error) {
      setError(error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4 text-purple-700">Sign In / Sign Up</h2>
        <button
          onClick={handleGoogleSignIn}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Sign in with Google
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <button
          onClick={onClose}
          className="mt-4 text-gray-600 hover:text-gray-800"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default AuthPage;