
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-S7HKI7-6ZAToSIFLmjEstAmXXl79rRo",
  authDomain: "house-market-app-45f03.firebaseapp.com",
  projectId: "house-market-app-45f03",
  storageBucket: "house-market-app-45f03.appspot.com",
  messagingSenderId: "979526313341",
  appId: "1:979526313341:web:169d00dea0203631599814"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// initializeApp(firebaseConfig);//here we just need to initialize our app
export const db=getFirestore();