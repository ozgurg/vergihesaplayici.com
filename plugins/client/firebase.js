import { initializeApp } from "firebase/app";
import { initializeAnalytics } from "firebase/analytics";
import { initializePerformance } from "firebase/performance";

let firebaseApp = null;

if (process.env.NODE_ENV === "production") {
    // These are not sensitive
    firebaseApp = initializeApp({
        apiKey: "AIzaSyD6VJhwtSsEpkLx2a-WsnhfU1rjUKz2DtA",
        authDomain: "vergihesaplayici.firebaseapp.com",
        databaseURL: "https://vergihesaplayici.firebaseio.com",
        projectId: "vergihesaplayici",
        storageBucket: "vergihesaplayici.appspot.com",
        messagingSenderId: "779771263802",
        appId: "1:779771263802:web:3786e5cc27855757536e03",
        measurementId: "G-2HW9TT5V7E"
    });

    initializeAnalytics(firebaseApp);

    initializePerformance(firebaseApp);
}

export default firebaseApp;
