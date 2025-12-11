import express from "express";
import dotenv from "dotenv";

import routes from "./routes/index.js";
import AppError from "./utils/AppError.js";
import setupExpress from "./config/express.js";

// Controllers
import globalErrorHandler from "./controllers/errorController.js";
import greeting from "./controllers/greetingController.js";

const app = express();

// Load env vars
dotenv.config({ path: "./config/.env" });

// Setup middleware
setupExpress(app);

// Routes
app.get("/", greeting);
app.use("/api/v1", routes);

// 404 handler
app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handler
app.use(globalErrorHandler);

export default app;
