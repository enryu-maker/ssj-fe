// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyC7V1Si2QIMS_6T2Z8EsIeodcUoHiInuVA",
  authDomain: "ssje-70123.firebaseapp.com",
  projectId: "ssje-70123",
  storageBucket: "ssje-70123.appspot.com",
  messagingSenderId: "332083138844",
  appId: "1:332083138844:web:67517fda89a30aeab1ead9",
  measurementId: "G-9ZRW11MDC4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {auth,provider}
