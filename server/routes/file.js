const express = require('express');
const multer = require('multer');
const path = require('path');
const authMiddleware = require('../middleware/auth');
const router = express.Router();
// const { fileUploadHandler } = require('../controllers/fileUpload');

router.use(authMiddleware);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post('/', upload.single('profileImage'), (req, res) => {
  try {
    console.log(req.body);
    console.log(req.file);

    return res.redirect('/');
  } catch (error) {
    console.log('Error : ', error);
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
});

module.exports = router;
