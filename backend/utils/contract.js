const { ethers } = require('ethers');
require('dotenv').config();
const contractABI = require('../../blockchain/artifacts/contracts/MedicalReport.sol/MedicalReport.json').abi;

const CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; // Update this!
const PROVIDER_URL = 'http://127.0.0.1:8545'; // Or your Infura/Alchemy endpoint

// Create provider and contract instance
const provider = new ethers.JsonRpcProvider(PROVIDER_URL);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);

module.exports = { contract };
