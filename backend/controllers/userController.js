const User = require('../models/User');

exports.registerUser = async (req, res) => {
  const { walletAddress, role, metadata } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ walletAddress });
    if (user) {
      return res.status(200).json({ message: 'User already exists', user });
    }

    // Create new user
    user = new User({ walletAddress, role, metadata });
    await user.save();

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error('Error in registerUser:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
