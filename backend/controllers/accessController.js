const { contract } = require('../utils/contract');

exports.grantAccess = async (req, res) => {
  let { doctorAddress } = req.body;

  try {
    // 🔥 Trim whitespace and ensure lowercase checksum
    doctorAddress = doctorAddress.trim();

    const tx = await contract.grantAccess(doctorAddress);
    await tx.wait();

    res.status(200).json({ message: 'Access granted', txHash: tx.hash });
  } catch (error) {
    console.error('Grant Access Error:', error);
    res.status(500).json({ message: 'Grant access failed', error: error.message });
  }
};

exports.revokeAccess = async (req, res) => {
  let { doctorAddress } = req.body;

  try {
    doctorAddress = doctorAddress.trim();

    const tx = await contract.revokeAccess(doctorAddress);
    await tx.wait();

    res.status(200).json({ message: 'Access revoked', txHash: tx.hash });
  } catch (error) {
    console.error('Revoke Access Error:', error);
    res.status(500).json({ message: 'Revoke access failed', error: error.message });
  }
};

