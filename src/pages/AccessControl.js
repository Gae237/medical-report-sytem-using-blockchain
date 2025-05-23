import React, { useEffect, useState } from "react";
import { getWalletAddress, connectContract } from "../utils/contract";

function AccessControl() {
  const [wallet, setWallet] = useState("");
  const [doctorAddress, setDoctorAddress] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchWallet = async () => {
      const address = await getWalletAddress();
      setWallet(address);
    };
    fetchWallet();
  }, []);

  const handleGrant = async () => {
    try {
      const contract = await connectContract();
      const tx = await contract.grantAccess(doctorAddress);
      await tx.wait();
      setMessage(`Access granted to ${doctorAddress}`);
    } catch (err) {
      console.error(err);
      setMessage("Error granting access.");
    }
  };

  const handleRevoke = async () => {
    try {
      const contract = await connectContract();
      const tx = await contract.revokeAccess(doctorAddress);
      await tx.wait();
      setMessage(`Access revoked from ${doctorAddress}`);
    } catch (err) {
      console.error(err);
      setMessage("Error revoking access.");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Access Control (Patient View)</h2>
      <p>Connected Wallet: {wallet}</p>

      <input
        type="text"
        value={doctorAddress}
        onChange={(e) => setDoctorAddress(e.target.value)}
        placeholder="Enter Doctor Wallet Address"
        style={{ width: "60%", marginBottom: 10 }}
      />
      <br />
      <button onClick={handleGrant} style={{ marginRight: 10 }}>
        Grant Access
      </button>
      <button onClick={handleRevoke}>Revoke Access</button>

      <p style={{ marginTop: 20 }}>{message}</p>
    </div>
  );
}

export default AccessControl;
