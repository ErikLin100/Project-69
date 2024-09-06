import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const withSubscriptionCheck = (WrappedComponent) => {
  return (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
      const checkAccess = async () => {
        try {
          const user = auth.currentUser;
          if (!user) {
            navigate('/pricing');
            return;
          }

          const userRef = doc(db, 'users', user.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            const userData = userSnap.data();
            if (!userData.hasAccess) {
              navigate('/pricing');
            } else {
              setIsLoading(false);
            }
          } else {
            navigate('/pricing');
          }
        } catch (error) {
          console.error('Error checking access:', error);
          navigate('/error'); // Redirect to an error page
        }
      };

      checkAccess();
    }, [navigate]);

    if (isLoading) {
      return <div>Loading...</div>; // Or use a loading spinner component
    }

    return <WrappedComponent {...props} />;
  };
};

export default withSubscriptionCheck;