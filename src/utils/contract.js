import { ethers } from "ethers";
import MedicalReportABI from "../abis/MedicalReport.json";

// Replace this with your actual deployed address
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export const connectContract = async () => {
  if (!window.ethereum) {
    alert("MetaMask is required!");
    return;
  }

  await window.ethereum.request({ method: "eth_requestAccounts" });

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(contractAddress, MedicalReportABI.abi, signer);

  return contract;
};

export const getWalletAddress = async () => {
  if (!window.ethereum) {
    alert("MetaMask is required!");
    return null;
  }

  const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
  return accounts[0];
};
