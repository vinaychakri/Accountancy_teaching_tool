const multer = require("multer");
//Image data handler for server side
const Engine = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "--" + file.originalname);
  },
});
const upload = multer({ storage: Engine });
module.exports = upload;
