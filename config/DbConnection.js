const mongoose = require("mongoose");

// Function to keep MongoDB connection alive (for free tier clusters that sleep)
function keepMongoAlive() {
  setInterval(async () => {
    try {
      await mongoose.connection.db.admin().ping();
      console.log("📶 Pinged MongoDB to keep connection alive");
    } catch (err) {
      console.warn("⚠️ MongoDB ping failed:", err.message);
    }
  }, 10 * 60 * 1000); // every 10 minutes
}

// Main connect function with retry logic
const connectDB = async (retries = 5, delay = 5000) => {
  for (let i = 0; i < retries; i++) {
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("✅ MongoDB connected");
      keepMongoAlive(); // start keep-alive pings
      return;
    } catch (err) {
      console.error(`❌ MongoDB connection failed (attempt ${i + 1} of ${retries}):`, err.message);
      if (i < retries - 1) {
        console.log(`⏳ Retrying in ${delay / 1000} seconds...`);
        await new Promise((res) => setTimeout(res, delay));
      } else {
        console.error("❌ All retry attempts failed. Exiting...");
        process.exit(1);
      }
    }
  }
};

module.exports = connectDB;
