const mongoose = require("mongoose");
const dns = require("dns");

// Force IPv4 DNS resolution (fixes querySrv ECONNREFUSED on Windows)
dns.setDefaultResultOrder("ipv4first");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      family: 4, // Force IPv4
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    // Continue running server so API and mock fallbacks stay alive
  }
};

module.exports = connectDB;
