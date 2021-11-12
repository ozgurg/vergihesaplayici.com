import { initializeApp } from "firebase/app";
import { initializeAnalytics } from "firebase/analytics";
import { initializePerformance } from "firebase/performance";

let firebaseApp = null;

if (process.env.NODE_ENV === "production") {
    firebaseApp = initializeApp({
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.FIREBASE_DATABASE_URL,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        measurementId: process.env.FIREBASE_MEASUREMENT_ID
    });

    initializeAnalytics(firebaseApp);

    initializePerformance(firebaseApp);
}

export default firebaseApp;
