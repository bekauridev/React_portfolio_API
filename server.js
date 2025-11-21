import app from "./app.js";
import { connectDB, disconnectDB } from "./config/mongoose.js";

// Connect DB
connectDB();

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`🚀 App running on port ${port} in ${process.env.NODE_ENV} mode`);
});

// Graceful shutdown handlers
process.on("uncaughtException", (err) => {
  console.error("💥 Uncaught Exception:", err);
  shutdown(1);
});

process.on("unhandledRejection", (reason) => {
  console.error("💥 Unhandled Rejection:", reason);
  shutdown(1);
});

process.on("SIGTERM", () => {
  console.log("👋 SIGTERM received. Shutting down gracefully...");
  shutdown(0);
});

async function shutdown(code) {
  await disconnectDB();
  server.close(() => process.exit(code));
}
