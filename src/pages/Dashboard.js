import React, { useEffect, useState } from "react";
import { getWalletAddress, connectContract } from "../utils/contract";

function Dashboard() {
  const [wallet, setWallet] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      try {
        const address = await getWalletAddress();
        setWallet(address);

        const contract = await connectContract();
        const user = await contract.users(address);

        if (user.role === 1) setRole("Patient");
        else if (user.role === 2) setRole("Doctor");
        else setRole("Unregistered");

      } catch (error) {
        console.error("Error loading contract:", error.message);
        setRole("Error");
      }
    };

    loadUser();
  }, []);

  return (
    <div className="dashboard">
      <h2>Connected Wallet: {wallet}</h2>
      <h3>Your Role: {role}</h3>

      {role === "Patient" && (
        <div>
          <p>Welcome, Patient!</p>
          <a href="/upload">Upload a medical report</a>
        </div>
      )}

      {role === "Doctor" && (
        <div>
          <p>Welcome, Doctor!</p>
          <button>View Accessible Reports</button>
        </div>
      )}

      {role === "Unregistered" && (
        <div>
          <p>You are not registered. Please register on-chain.</p>
          <button onClick={async () => {
            const contract = await connectContract();
            await contract.register(1); // or 2 for Doctor
            window.location.reload(); // refresh to get new role
          }}>
            Register as Patient
          </button>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
