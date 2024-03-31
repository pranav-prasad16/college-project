const express = require('express');
const multer = require('multer');
const path = require('path');
const authMiddleware = require('../middleware/auth');
const router = express.Router();
// const { fileUploadHandler } = require('../controllers/fileUpload');

router.use(authMiddleware);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 10 }, //limiting file size to 10 MB
  fileFilter: function (req, file, cb) {
    const allowedExtensions = [
      '.c',
      '.java',
      '.js',
      '.py',
      '.pdf',
      '.txt',
      '.m',
    ];
    const fileExtension = path.extname(file.originalname).toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      cb(new Error('Invalid file type')); // reject file with invalid extension
    }
    cb(null, true); // accepts file with valid extension
  },
});

router.post('/upload', upload.single('fileUpload'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }
  try {
    console.log(req.body);
    console.log(req.file);

    return res.redirect('/');
  } catch (error) {
    console.log('Error : ', error);
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
});

//Error handling middleware
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    console.log('Multer error : ', err);
    return res.status(400).json({ msg: 'File upload error' });
  } else if (err) {
    console.log('Unknown error : ', err);
    return res.status(500).json({ msg: 'Internal server error' });
  }
});

module.exports = router;
