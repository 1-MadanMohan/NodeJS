const mongoose = require("mongoose");

async function connectMongoDB() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/Movies-List");
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB error:", err.message);
    process.exit(1);
  }
}

module.exports = { connectMongoDB };
