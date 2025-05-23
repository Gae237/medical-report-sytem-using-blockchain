const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const { uploadReport } = require("../controllers/reportController");

router.post("/upload", upload.single("file"), uploadReport);

module.exports = router;
