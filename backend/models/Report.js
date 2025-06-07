const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  ipfsHash: {
    type: String,
    required: true
  },
  owner: {
    type: String, // wallet address
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  doctorAccess: {
    type: [String], // list of doctor wallet addresses with access
    default: []
  }
}, { timestamps: true });

module.exports = mongoose.model('Report', reportSchema);
