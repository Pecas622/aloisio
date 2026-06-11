// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDDhcWmG9-oZzsCOj0RhnfUiKsQMuGGdlI",
    authDomain: "peca627-b4ef9.firebaseapp.com",
    projectId: "peca627-b4ef9",
    storageBucket: "peca627-b4ef9.appspot.com",
    messagingSenderId: "975535848857",
    appId: "1:975535848857:web:8c7176b7d90c1eb2ef2708"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore and Auth
export const db = getFirestore(app);
export const auth = getAuth(app);