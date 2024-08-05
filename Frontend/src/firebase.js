import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB14A_ooWzPE_v_NLYcaEWtFZMctGKe2xs",
  authDomain: "feedbackwizard-178f0.firebaseapp.com",
  projectId: "feedbackwizard-178f0",
  storageBucket: "feedbackwizard-178f0.appspot.com",
  messagingSenderId: "427156274267",
  appId: "1:427156274267:web:86583e5914a4dc64e8d37e",
  measurementId: "G-2LW03KPHSL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth, analytics };