// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const app = initializeApp({
  apiKey: "AIzaSyAIuWxs6HuTPU2s8suitHRR_TnHS6HPk0s",
  authDomain: "examtime-b84fe.firebaseapp.com",
  projectId: "examtime-b84fe",
  storageBucket: "examtime-b84fe.appspot.com",
  messagingSenderId: "658470590771",
  appId: "1:658470590771:web:7e2009f314a759b19b8646",
  measurementId: "G-VYY3RYMLQG",
});

const storage = getStorage(app);
export default storage;
