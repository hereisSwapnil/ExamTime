const upload = require("../utils/multer.js");
const multerUpload = upload.single("pdf");

module.exports = multerUpload;
