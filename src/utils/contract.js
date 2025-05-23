// src/utils/contract.js
import { ethers } from "ethers";
import contractAbi from "../abis/MedicalReportSystem.json";

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export async function connectContract() {
  if (!window.ethereum) throw new Error("MetaMask not found");

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi.abi, signer);

  return contract;
}

export async function getWalletAddress() {
  if (!window.ethereum) throw new Error("MetaMask not found");
  const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
  return accounts[0];
}
