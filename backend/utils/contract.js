const { ethers } = require('ethers');
require('dotenv').config();
const contractABI = require('../../blockchain/artifacts/contracts/MedicalReport.sol/MedicalReport.json').abi;

const CONTRACT_ADDRESS = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'; // Update this!
const PROVIDER_URL = 'http://127.0.0.1:8545'; // Or your Infura/Alchemy endpoint

// Create provider and contract instance
const provider = new ethers.JsonRpcProvider(PROVIDER_URL);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);

module.exports = { contract };
