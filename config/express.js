// Third-party packages
import express from "express";
import compression from "compression";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { xss } from "express-xss-sanitizer";

// Local modules
import { mongoSanitizer } from "../middlewares/mongoSanitizer.js";

export default (app) => {
  // 1. Security headers
  app.use(helmet());

  // 2. CORS
  const allowedOrigin = process.env.CLIENT_URL || "http://localhost:3000";
  if (!process.env.CLIENT_URL) {
    console.warn("CLIENT_URL not set, defaulting CORS origin to http://localhost:3000");
  }
  app.use(
    cors({
      origin: allowedOrigin,
      credentials: true,
    })
  );

  // 3. Rate limiting
  if (process.env.NODE_ENV === "production") {
    const generalRateLimiter = rateLimit({
      max: 100,
      windowMs: 60 * 60 * 1000,
      message: "Too many requests from this IP, try again later.",
    });

    const authRateLimiter = rateLimit({
      max: 10,
      windowMs: 15 * 60 * 1000,
      message: "Too many login attempts, try again later.",
    });

    app.use("/api", generalRateLimiter);
    app.use("/api/v1/auth", authRateLimiter);
  }

  // 4. Dev logging
  if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  }

  // 5. Body parsers
  app.use(express.json({ limit: "100kb" }));
  app.use(cookieParser());

  // 6. Sanitizers (after body parsing)
  app.use(xss()); // optional (see note below)
  app.use(mongoSanitizer); // custom & safe

  // 7. Compression
  app.use(compression());
};
