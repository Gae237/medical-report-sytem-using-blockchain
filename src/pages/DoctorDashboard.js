import React, { useEffect, useState } from "react";
import { getWalletAddress, connectContract } from "../utils/contract";

function DoctorDashboard() {
  const [wallet, setWallet] = useState("");
  const [patientAddress, setPatientAddress] = useState("");
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchReports = async () => {
    try {
      const contract = await connectContract();
      const reportIds = await contract.viewReports(patientAddress);

      const reportData = await Promise.all(
        reportIds.map(async (id) => {
          const report = await contract.getReport(id);
          return {
            id: report.id.toString(),
            ipfsHash: report.ipfsHash,
            timestamp: new Date(report.timestamp * 1000).toLocaleString(),
          };
        })
      );

      setReports(reportData);
    } catch (err) {
      console.error("Error fetching reports:", err);
      alert("You may not have access to this patient's reports.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadWallet = async () => {
      const address = await getWalletAddress();
      setWallet(address);
    };
    loadWallet();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Doctor Dashboard</h2>
      <p>Connected Wallet: {wallet}</p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setLoading(true);
          fetchReports();
        }}
      >
        <input
          type="text"
          placeholder="Enter Patient Address"
          value={patientAddress}
          onChange={(e) => setPatientAddress(e.target.value)}
          style={{ width: "60%" }}
        />
        <button type="submit">View Reports</button>
      </form>

      {loading && <p>Loading reports...</p>}

      <ul>
        {reports.map((report) => (
          <li key={report.id}>
            Report #{report.id} —{" "}
            <a
              href={`https://ipfs.io/ipfs/${report.ipfsHash}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Report
            </a>{" "}
            ({report.timestamp})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DoctorDashboard;
