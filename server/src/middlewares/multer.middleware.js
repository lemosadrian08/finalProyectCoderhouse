const multer = require('multer');
const path = require('path')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './src/public/images');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});


module.exports = storage;