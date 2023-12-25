import firebase from "firebase";
import { serviceAccount } from "../firebase/firebase.credentials";

const db = firebase.initializeApp(config.firebaseConfig);

export default db;
