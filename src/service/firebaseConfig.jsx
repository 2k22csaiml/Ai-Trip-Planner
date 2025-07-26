// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJM1ZgwB1I1L4F0U6yz2jpk2eQYFKzxwY",
  authDomain: "ai-trip-planner-602fa.firebaseapp.com",
  projectId: "ai-trip-planner-602fa",
  storageBucket: "ai-trip-planner-602fa.firebasestorage.app",
  messagingSenderId: "23364963347",
  appId: "1:23364963347:web:5ea19d0e0fa0f82fac03e6",
  measurementId: "G-J1EDLS5NW8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
