const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const userRoutes = require('./routes/userRoutes');
const reportRoutes = require('./routes/reportRoutes');
const accessRoutes = require('./routes/accessRoutes');

app.use('/api/users', userRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/access', accessRoutes);


// Root route
app.get('/', (req, res) => {
  res.send('✅ Backend is running...');
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
