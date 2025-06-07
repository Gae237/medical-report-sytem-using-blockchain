const Report = require('../models/Report');
const { uploadToIPFS } = require('../utils/ipfs');
const { contract } = require('../utils/contract');

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

exports.getReportsForDoctor = async (req, res) => {
  const { doctorAddress, patientAddress } = req.body;

  try {
    // 🔐 Check access from blockchain contract
    const hasAccess = await contract.checkAccess(patientAddress, doctorAddress);

    if (!hasAccess) {
      return res.status(403).json({ message: 'Access denied: Doctor does not have permission' });
    }

    // 📦 Fetch reports from MongoDB
    const reports = await Report.find({ owner: patientAddress });

    res.status(200).json({ reports });
  } catch (error) {
    console.error('Error in getReportsForDoctor:', error);
    res.status(500).json({ message: 'Error checking access or fetching reports', error: error.message });
  }
};

