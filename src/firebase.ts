
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCbuoc6X3lTwdTGvMvGgnrLnwt45rYcwCk",
    authDomain: "real-time-db-c5886.firebaseapp.com",
    databaseURL: "https://real-time-db-c5886-default-rtdb.firebaseio.com",
    projectId: "real-time-db-c5886",
    storageBucket: "real-time-db-c5886.firebasestorage.app",
    messagingSenderId: "44933556926",
    appId: "1:44933556926:web:34bc6708d6848ae0044cef",
    measurementId: "G-1R52R02J5L"
};

// // Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);