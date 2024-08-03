// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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