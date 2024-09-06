import { auth, db } from '../firebase';
import { addDoc, collection, onSnapshot } from 'firebase/firestore';

export const getCheckoutUrl = async (priceId) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User is not authenticated");

  const checkoutSessionRef = collection(db, "users", user.uid, "checkout_sessions");
  const docRef = await addDoc(checkoutSessionRef, {
    price: priceId,
    success_url: window.location.origin, // Redirect here after successful payment
    cancel_url: window.location.origin, // Redirect here if payment is canceled
  });

  return new Promise((resolve, reject) => {
    const unsubscribe = onSnapshot(docRef, (snap) => {
      const { error, url } = snap.data() || {};
      if (error) {
        unsubscribe();
        reject(new Error(`An error occurred: ${error.message}`));
      }
      if (url) {
        unsubscribe();
        resolve(url);
      }
    });
  });
};