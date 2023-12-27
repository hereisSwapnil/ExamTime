const { initializeApp } = require("firebase/app");
const firebaseConfig = require("../firebase/firebase.credentials.json");
const { getStorage } = require("firebase/storage");

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

module.exports = storage;
