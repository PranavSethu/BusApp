// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOBMfbIBZWhDwNVVxKGYjM5dHOVdDInDc",
  authDomain: "focus-app-e8ded.firebaseapp.com",
  projectId: "focus-app-e8ded",
  storageBucket: "focus-app-e8ded.appspot.com",
  messagingSenderId: "933048091064",
  appId: "1:933048091064:web:4983438238f82ea1e28f4d",
  measurementId: "G-RZV65HZMXB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
