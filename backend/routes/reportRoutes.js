const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadFileReport, getReportsByPatient } = require('../controllers/reportController');

// Multer config
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// File upload route
router.post('/upload-file', upload.single('file'), uploadFileReport);

router.get('/patient/:walletAddress', getReportsByPatient);

module.exports = router;
