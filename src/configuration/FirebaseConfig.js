// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const FirebaseConfig = {
  apiKey: "AIzaSyCHkEPn9NYgRsXlJuXhCGTtxxPGkeo2K-8",
  authDomain: "marine-resource-384911.firebaseapp.com",
  projectId: "marine-resource-384911",
  storageBucket: "marine-resource-384911.appspot.com",
  messagingSenderId: "1047464294129",
  appId: "1:1047464294129:web:e7d433c33133d172fddb50",
  measurementId: "G-EQRTVQZJFZ"
};

// Initialize Firebase
const app = initializeApp(FirebaseConfig);

export const auth = getAuth(app);