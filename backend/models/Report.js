const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  ipfsHash: String,
  patientAddress: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Report', reportSchema);
