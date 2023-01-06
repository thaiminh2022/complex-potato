import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

export const firebaseConfig = {
    apiKey: "AIzaSyAmkXmzfW6ME2FChyLietDFUFqZxaT4HAQ",
    authDomain: "complex-potato.firebaseapp.com",
    databaseURL:
        "https://complex-potato-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "complex-potato",
    storageBucket: "complex-potato.appspot.com",
    messagingSenderId: "843858435419",
    appId: "1:843858435419:web:0a47e679c8b323d9100e7e",
    measurementId: "G-Z8LW0KBQE8",
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
// connectAuthEmulator(auth, "http://localhost:9099");
// connectFirestoreEmulator(db, "http://localhost", 8080);
