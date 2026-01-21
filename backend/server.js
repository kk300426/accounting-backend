require('dotenv').config();

console.log("🟡 Starting server...");

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Routes (REQUIRED to be functions)
const authRoute = require('./routes/auth');
const accountsRoute = require('./routes/accounts');

// Debug check (keep for now)
console.log('TYPE authRoute:', typeof authRoute);
console.log('TYPE accountsRoute:', typeof accountsRoute);

console.log("🟡 Connecting to MongoDB...");

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");

    // Use routes
    app.use('/api/auth', authRoute);
    app.use('/api/accounts', accountsRoute);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("❌ MongoDB connection error:");
    console.error(err);
  });
