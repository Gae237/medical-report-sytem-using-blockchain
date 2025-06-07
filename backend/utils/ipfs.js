const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
require('dotenv').config();

const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_API_SECRET = process.env.PINATA_API_SECRET;

exports.uploadToIPFS = async (filePath) => {
  const formData = new FormData();
  formData.append('file', fs.createReadStream(filePath));

  const metadata = JSON.stringify({
    name: 'medical-report-file'
  });
  formData.append('pinataMetadata', metadata);

  const options = JSON.stringify({
    cidVersion: 1
  });
  formData.append('pinataOptions', options);

  try {
    const res = await axios.post(
      'https://api.pinata.cloud/pinning/pinFileToIPFS',
      formData,
      {
        maxBodyLength: 'Infinity',
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          pinata_api_key: PINATA_API_KEY,
          pinata_secret_api_key: PINATA_API_SECRET,
        },
      }
    );

    return res.data.IpfsHash;
  } catch (error) {
    console.error('Error uploading to Pinata:', error);
    throw new Error('Pinata upload failed');
  }
};
