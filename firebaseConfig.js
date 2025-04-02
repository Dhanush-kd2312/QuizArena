// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAn_eQuzmROi7yoyo8xVGz8EHyPN6Bu59s",
  authDomain: "quiz-4abee.firebaseapp.com",
  projectId: "quiz-4abee",
  storageBucket: "quiz-4abee.firebasestorage.app",
  messagingSenderId: "778536841996",
  appId: "1:778536841996:web:cc1ac91e4df193991f4f29",
  measurementId: "G-KLSC3ESLFS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
