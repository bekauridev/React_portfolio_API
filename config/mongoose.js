import mongoose from "mongoose";
import colors from "colors";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE, {
      autoIndex: process.env.NODE_ENV !== "production", // Disable auto index in prod for perf
    });

    console.log("✅ MongoDB connected".green);
  } catch (err) {
    console.error("❌ MongoDB connection error:".red, err.message);
    // Fast-fail so orchestrators can restart cleanly
    process.exit(1);
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    console.log("🔌 MongoDB connection closed".yellow);
  } catch (err) {
    console.error("❌ Error closing MongoDB connection:", err);
  }
};
