const { contract } = require('../utils/contract');

exports.checkRole = async (req, res, next) => {
  const { walletAddress, expectedRole } = req.body;

  try {
    const user = await contract.getUser(walletAddress);

    if (user.role === undefined || Number(user.role) !== expectedRole) {
      return res.status(403).json({ message: 'Unauthorized role' });
    }

    next();
  } catch (err) {
    console.error('Error in checkRole:', err);
    res.status(500).json({ message: 'Blockchain role check failed' });
  }
};
