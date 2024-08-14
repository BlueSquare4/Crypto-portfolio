// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCPQTv5uDBDjUVsAdzgB30QkWZR9KJmH7U",
    authDomain: "crypto-432ea.firebaseapp.com",
    projectId: "crypto-432ea",
    storageBucket: "crypto-432ea.appspot.com",
    messagingSenderId: "505418143962",
    appId: "1:505418143962:web:242ed8fb16e97be3b46de3",
    measurementId: "G-EK48KT91DT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
