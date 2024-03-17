import { initializeApp } from "firebase/app";
import { initializeAnalytics } from "firebase/analytics";
import { initializePerformance } from "firebase/performance";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

const firebaseApp = initializeApp({
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

initializeAppCheck(firebaseApp, {
    provider: new ReCaptchaV3Provider(process.env.RECAPTCHA_V3_PUBLIC_KEY),
    isTokenAutoRefreshEnabled: true
});

export default firebaseApp;
