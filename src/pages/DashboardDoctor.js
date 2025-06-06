import React, { useEffect, useState } from "react";
import { getWalletAddress, connectContract } from "../utils/contract";
import "../styles/Dashboard.css";

export default function DashboardDoctor() {
  const [wallet, setWallet] = useState("");
  const [reports, setReports] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchWalletAndReports = async () => {
      try {
        const address = await getWalletAddress();
        setWallet(address);

        const contract = await connectContract();
        const role = await contract.getUser(address);
        if (role !== 1) throw new Error("You are not registered as a Doctor");

        const sharedReports = await contract.getReportsSharedWithDoctor();
        setReports(sharedReports);
      } catch (err) {
        console.error(err);
        setMessage("❌ " + err.message);
      }
    };

    fetchWalletAndReports();
  }, []);

  const handleRegister = async () => {
    try {
      const contract = await connectContract();
      const tx = await contract.register(1); // 1 = Doctor
      await tx.wait();
      setMessage("✅ Successfully registered as Doctor.");

      // Refresh reports if any were shared already
      const newReports = await contract.getReportsSharedWithDoctor();
      setReports(newReports);
    } catch (err) {
      console.error("Registration failed", err);
      setMessage("❌ " + err.message);
    }
  };

  return (
    <div className="dashboard-wrapper fade-in-up">
      <div className="dashboard-card">
        <h2 className="dashboard-title">🩺 Doctor Dashboard</h2>
        <p className="wallet-display">
          <strong>Connected Wallet:</strong> {wallet || "Not connected"}
        </p>

        {/* Register Doctor Button */}
        <div className="access-section">
          <h3>Not Registered Yet?</h3>
          <button className="btn register-btn" onClick={handleRegister}>
            Register as Doctor
          </button>
        </div>

        {/* Report Access */}
        <div className="access-section">
          <h3>Reports Shared With You</h3>
          {reports.length > 0 ? (
            <ul className="report-list">
              {reports.map((report, index) => (
                <li key={index} className="report-item">
                  <p><strong>From:</strong> {report.owner}</p>
                  <p><strong>CID:</strong> {report.cid}</p>
                  <a
                    href={`https://gateway.pinata.cloud/ipfs/${report.cid}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn view-btn"
                  >
                    View Report
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p>No reports shared yet.</p>
          )}
        </div>

        {message && <p className="status-message">{message}</p>}
      </div>
    </div>
  );
}
