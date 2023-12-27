const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const storage = require("../utils/firebase.js");
const uniqueFilename = require("unique-filename");

const firebaseUpload = (req, res, next) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const PDFRef = ref(storage, "Notes/" + uniqueFilename("") + ".pdf");
  const fileUpload = req.file.buffer;

  uploadBytes(PDFRef, fileUpload)
    .then((snapshot) => getDownloadURL(snapshot.ref))
    .then((url) => {
      console.log("File uploaded to Firebase Storage:", url);
      req.file.url = url;
      next();
    })
    .catch((error) => {
      console.error("Error uploading file to Firebase Storage:", error);
      return res.status(500).send("Error uploading file to Firebase Storage.");
    });
};

module.exports = firebaseUpload;
