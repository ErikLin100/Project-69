import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useAuth } from '../context/AuthContext';

const StripeSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(null);
  const { login } = useAuth();

  const handleGoogleSignIn = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      await confirmSubscription(result.user);
      login(); // Update auth context
      navigate('/action');
    } catch (error) {
      setError(error.message);
    }
  };

  const confirmSubscription = async (user) => {
    const searchParams = new URLSearchParams(location.search);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      setError('No session ID found');
      return;
    }

    try {
      const idToken = await user.getIdToken();
      const response = await fetch('/api/stripe/confirm-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`,
        },
        body: JSON.stringify({ sessionId }),
      });

      if (!response.ok) {
        throw new Error('Failed to confirm subscription');
      }

      // Subscription confirmed, login() and navigate are called in handleGoogleSignIn
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-10 bg-white shadow-xl rounded-xl">
        <div className="text-center">
          <h1 className="mt-6 text-3xl font-extrabold text-gray-900">
            Payment Successful!
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Your subscription is almost ready.
          </p>
        </div>
        
        <div className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm">
            <button
              onClick={handleGoogleSignIn}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 border-gray-300"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                  <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                    <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                    <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                    <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                    <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
                  </g>
                </svg>
              </span>
              Sign in with Google to Activate
            </button>
          </div>
        </div>

        {error && (
          <div className="mt-8 text-center text-sm text-red-600">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StripeSuccessPage;