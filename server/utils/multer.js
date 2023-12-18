const multer = require("multer");
const storage = require("./cloudnary.js");

const upload = multer({ storage });

module.exports = upload;
