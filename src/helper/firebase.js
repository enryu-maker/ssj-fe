// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


  const firebaseConfig = {
    apiKey: "AIzaSyCEGUh3BotOa86fcbDWcR2s5YZbVJq-gWY",
    authDomain: "sai-shraddha-jewellers-c8965.firebaseapp.com",
    projectId: "sai-shraddha-jewellers-c8965",
    storageBucket: "sai-shraddha-jewellers-c8965.appspot.com",
    messagingSenderId: "31490919994",
    appId: "1:31490919994:web:3c00ca2c8a614b95a66f03",
    measurementId: "G-3J1M09R4SF"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {auth,provider}
