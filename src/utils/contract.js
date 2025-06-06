// src/utils/contract.js
import { ethers } from "ethers";
import contractAbi from "../abis/MedicalReport.json";

// ⚠️ Replace with latest address from `npx hardhat ignition deploy`
const CONTRACT_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

// Get wallet address (ensures MetaMask permission is requested once)
export const getWalletAddress = async () => {
  if (!window.ethereum) throw new Error("MetaMask not installed");

  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  return accounts[0];
};

// Connect to the deployed smart contract
export const connectContract = async () => {
  if (!window.ethereum) throw new Error("MetaMask not found");

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []); // Ensures permission only once
  const signer = provider.getSigner();
  return new ethers.Contract(CONTRACT_ADDRESS, contractAbi.abi, signer);
};

