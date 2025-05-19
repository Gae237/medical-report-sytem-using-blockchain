import React, { useEffect, useState } from "react";
import { connectContract, getWalletAddress } from "../utils/contract";

function Dashboard() {
  const [wallet, setWallet] = useState("");
  const [reportCount, setReportCount] = useState(0);

  useEffect(() => {
    const loadContract = async () => {
      const address = await getWalletAddress();
      setWallet(address);

      const contract = await connectContract();
      const count = await contract.getReportCount();
      setReportCount(count.toString());
    };
    loadContract();
  }, []);

  return (
    <div>
      <h2>👛 Connected Wallet: {wallet}</h2>
      <h3>📝 Total Reports Stored On-Chain: {reportCount}</h3>
    </div>
  );
}

export default Dashboard;
