import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAV6GNQK7adJwou0bfnf-9cplLb8h12XOA",

  authDomain: "case-study-dffde.firebaseapp.com",

  projectId: "case-study-dffde",

  storageBucket: "case-study-dffde.appspot.com",

  messagingSenderId: "149290395120",

  appId: "1:149290395120:web:e5a1776c84bc55f3f66935",

  measurementId: "G-93YG9PTM0G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
