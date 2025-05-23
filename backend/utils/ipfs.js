const axios = require("axios");
const FormData = require("form-data");

const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_API_SECRET = process.env.PINATA_API_SECRET;

async function uploadToIPFS(fileBuffer, filename) {
  const data = new FormData();
  data.append("file", fileBuffer, filename);

  const metadata = JSON.stringify({
    name: filename,
  });

  data.append("pinataMetadata", metadata);

  const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", data, {
    maxBodyLength: Infinity,
    headers: {
      ...data.getHeaders(),
      pinata_api_key: PINATA_API_KEY,
      pinata_secret_api_key: PINATA_API_SECRET,
    },
  });

  return res.data.IpfsHash; // ← this is your CID
}

module.exports = { uploadToIPFS };
