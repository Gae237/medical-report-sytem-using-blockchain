// src/pages/UploadReport.js
import React, { useState } from 'react';
import axios from 'axios';
import { connectContract, getWalletAddress } from '../utils/contract';

const UploadReport = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert('Please select a file first.');
    
    setLoading(true);
    setMessage('');

    try {
      // Step 1: Get connected wallet address
      const wallet = await getWalletAddress();

      // Step 2: Prepare form data for backend
      const formData = new FormData();
      formData.append('file', file);
      formData.append('patientAddress', wallet); // For DB record in backend

      // Step 3: Upload to backend → IPFS
      const res = await axios.post('http://localhost:5000/api/reports/upload', formData);

      const ipfsHash = res.data.ipfsHash;
      setMessage(`File uploaded to IPFS: ${ipfsHash}`);

      // Step 4: Send hash to smart contract
      const contract = await connectContract();
      const tx = await contract.uploadReport(ipfsHash);
      await tx.wait();

      setMessage(`✅ File stored on blockchain! IPFS CID: ${ipfsHash}`);
    } catch (err) {
      console.error('Upload error:', err);
      setMessage('❌ Upload failed. Check the console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2em', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Upload Medical Report</h2>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        accept=".pdf,.jpg,.png,.jpeg,.doc,.docx"
        style={{ marginBottom: '1em' }}
      />

      <br />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? 'Uploading...' : 'Upload'}
      </button>

      {message && (
        <div style={{ marginTop: '1em', color: message.startsWith('✅') ? 'green' : 'red' }}>
          {message}
        </div>
      )}
    </div>
  );
};

export default UploadReport;
