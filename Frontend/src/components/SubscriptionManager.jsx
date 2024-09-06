import React, { useState } from 'react';
import { getAuth } from 'firebase/auth';

const SubscriptionManager = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleManageSubscription = async () => {
    setLoading(true);
    setError(null);

    try {
      const auth = getAuth();
      const user = auth.currentUser;
      const idToken = await user.getIdToken();

      const response = await fetch('/api/stripe/create-portal-session', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${idToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to create portal session');
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="subscription-manager">
      <h2>Manage Your Subscription</h2>
      <button onClick={handleManageSubscription} disabled={loading}>
        Manage Subscription
      </button>
    </div>
  );
};

export default SubscriptionManager;