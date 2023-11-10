import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDKdvMvwVekMeNYr_gdtRYjBs43W11KFDk",
    authDomain: "webca-2efb2.firebaseapp.com",
    projectId: "webca-2efb2",
    storageBucket: "webca-2efb2.appspot.com",
    messagingSenderId: "240897231955",
    appId: "1:240897231955:web:19ce6eaa8250c5d30acaa6"
};

export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp)