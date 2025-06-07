const Report = require('../models/Report');
const { uploadToIPFS } = require('../utils/ipfs');
const fs = require('fs');

exports.uploadFileReport = async (req, res) => {
  const { owner } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  try {
    const ipfsHash = await uploadToIPFS(file.path);

    const report = new Report({ ipfsHash, owner });
    await report.save();

    // Optionally remove file from uploads/ folder
    fs.unlinkSync(file.path);

    res.status(201).json({ message: 'File uploaded to IPFS', ipfsHash, report });
  } catch (error) {
    res.status(500).json({ message: 'IPFS upload failed', error: error.message });
  }
};

exports.getReportsByPatient = async (req, res) => {
  const { walletAddress } = req.params;

  try {
    const reports = await Report.find({ owner: walletAddress });
    res.status(200).json({ reports });
  } catch (error) {
    console.error('Error in getReportsByPatient:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

