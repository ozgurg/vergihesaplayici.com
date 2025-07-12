// oxlint-disable extensions

import { initializeApp } from "firebase/app";
import { initializeAnalytics } from "firebase/analytics";
import { initializePerformance } from "firebase/performance";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

export const app = initializeApp({
    apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY,
    authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: import.meta.env.PUBLIC_FIREBASE_DATABASE_URL,
    projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.FPUBLIC_IREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.PUBLIC_FIREBASE_MESSAGING_ID,
    appId: import.meta.env.PUBLIC_FIREBASE_APP_ID,
    measurementId: import.meta.env.PUBLIC_FIREBASE_MEASUREMENT_ID
});

export const analytics = initializeAnalytics(app);

export const performance = initializePerformance(app);

export const appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(import.meta.env.PUBLIC_RECAPTCHA_V3_PUBLIC_KEY),
    isTokenAutoRefreshEnabled: true
});
