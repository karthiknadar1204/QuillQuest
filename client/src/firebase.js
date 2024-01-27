// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "quillquest-dcd0a.firebaseapp.com",
  projectId: "quillquest-dcd0a",
  storageBucket: "quillquest-dcd0a.appspot.com",
  messagingSenderId: "255671157704",
  appId: "1:255671157704:web:378a1abe74953854d1f6fd"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);