const Report = require("../models/Report");
const { uploadToIPFS } = require("../utils/ipfs");

exports.uploadReport = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "No file provided" });
    }

    const ipfsHash = await uploadToIPFS(file.buffer, file.originalname);

    const newReport = new Report({
      ipfsHash,
      patientAddress: req.body.patientAddress,
    });

    await newReport.save();
    res.json({ success: true, ipfsHash });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to upload report" });
  }
};
