import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const StripeCanceledPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/pricing');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="text-center mt-10">
      <h1 className="text-2xl font-bold mb-4">Payment Canceled</h1>
      <p>Your subscription process was canceled. You will be redirected to the pricing page shortly.</p>
    </div>
  );
};

export default StripeCanceledPage;