// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBRb10e4NLuMUfXTbawGYroyEjM_MbBCQ",
  authDomain: "to-do-list-fe20d.firebaseapp.com",
  databaseURL: "https://to-do-list-fe20d-default-rtdb.firebaseio.com",
  projectId: "to-do-list-fe20d",
  storageBucket: "to-do-list-fe20d.appspot.com",
  messagingSenderId: "717657845461",
  appId: "1:717657845461:web:74bf3648fc584cefbdbc5c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);