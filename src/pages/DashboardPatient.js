import React, { useEffect, useState } from "react";
import { getWalletAddress, connectContract } from "../utils/contract";
import "../styles/Dashboard.css";
import axios from "axios";

export default function DashboardPatient() {
  const [wallet, setWallet] = useState("");
  const [doctorAddress, setDoctorAddress] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [accessList, setAccessList] = useState([]);

  useEffect(() => {
    const fetchWallet = async () => {
      const address = await getWalletAddress();
      setWallet(address);
    };
    fetchWallet();
    fetchAccessList();
  }, []);

  const handleRegister = async () => {
    try {
      const contract = await connectContract();
      const tx = await contract.register(0); // 0 = Patient
      await tx.wait();
      setMessage("✅ Successfully registered as Patient.");
      fetchAccessList(); // refresh access list
    } catch (err) {
      console.error("Registration failed", err);
      setMessage("❌ " + err.message);
    }
  };

  const fetchAccessList = async () => {
    try {
      const contract = await connectContract();
      const address = await getWalletAddress();
      const role = await contract.getUser(address);
      if (role !== 0) throw new Error("You are not registered as a Patient");

      const list = await contract.getAccessList();
      setAccessList(list);
    } catch (err) {
      console.error("Failed to fetch access list", err);
      setMessage("❌ " + err.message);
    }
  };

  const handleGrant = async () => {
    try {
      const contract = await connectContract();
      const address = await getWalletAddress();
      const role = await contract.getUser(address);
      if (role !== 0) throw new Error("You are not registered as a Patient");

      const tx = await contract.grantAccess(doctorAddress);
      await tx.wait();
      setMessage(`✅ Access granted to ${doctorAddress}`);
      fetchAccessList();
    } catch (err) {
      console.error(err);
      setMessage("❌ " + err.message);
    }
  };

  const handleRevoke = async () => {
    try {
      const contract = await connectContract();
      const address = await getWalletAddress();
      const role = await contract.getUser(address);
      if (role !== 0) throw new Error("You are not registered as a Patient");

      const tx = await contract.revokeAccess(doctorAddress);
      await tx.wait();
      setMessage(`✅ Access revoked from ${doctorAddress}`);
      fetchAccessList();
    } catch (err) {
      console.error(err);
      setMessage("❌ " + err.message);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("❌ Please select a file.");
      return;
    }

    try {
      const contract = await connectContract();
      const address = await getWalletAddress();
      const role = await contract.getUser(address);
      if (role !== 0) throw new Error("You are not registered as a Patient");

      setMessage("⏳ Uploading to IPFS...");
      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxBodyLength: "Infinity",
        headers: {
          "Content-Type": "multipart/form-data",
          pinata_api_key: "b65a76b24c7a01b8374c",
          pinata_secret_api_key: "53ee2276fb3dd0f30b92eff152500696f2fd72395724616adeabe4b7ec3fb126",
        },
      });

      const cid = res.data.IpfsHash;
      setMessage(`✅ File uploaded. CID: ${cid}`);

      const tx = await contract.uploadReport(cid);
      await tx.wait();
      setMessage(`✅ Report uploaded and stored on chain.`);
    } catch (err) {
      console.error(err);
      setMessage("❌ " + err.message);
    }
  };

  return (
    <div className="dashboard-wrapper fade-in-up">
      <div className="dashboard-card">
        <h2 className="dashboard-title">👤 Patient Dashboard</h2>
        <p className="wallet-display">
          <strong>Connected Wallet:</strong> {wallet || "Not connected"}
        </p>

        {/* Register Patient Button */}
        <div className="access-section">
          <h3>Not Registered Yet?</h3>
          <button className="btn register-btn" onClick={handleRegister}>
            Register as Patient
          </button>
        </div>

        {/* Access Control */}
        <div className="access-section">
          <h3>Doctor Access Control</h3>
          <input
            type="text"
            value={doctorAddress}
            onChange={(e) => setDoctorAddress(e.target.value)}
            placeholder="Enter Doctor's Wallet Address"
            className="access-input"
          />
          <div className="access-buttons">
            <button className="btn grant-btn" onClick={handleGrant}>
              Grant Access
            </button>
            <button className="btn revoke-btn" onClick={handleRevoke}>
              Revoke Access
            </button>
          </div>
        </div>

        {/* Upload Report */}
        <div className="access-section">
          <h3>Upload Medical Report</h3>
          <input
            type="file"
            className="access-input"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button className="btn upload-btn" onClick={handleUpload}>
            Upload Report
          </button>
        </div>

        {/* Access List */}
        <div className="access-section">
          <h3>Doctors with Access</h3>
          <ul>
            {accessList.length > 0 ? (
              accessList.map((addr, index) => <li key={index}>{addr}</li>)
            ) : (
              <p>No doctors have access.</p>
            )}
          </ul>
        </div>

        {message && <p className="status-message">{message}</p>}
      </div>
    </div>
  );
}
