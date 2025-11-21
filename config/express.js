// Third-party packages
import express from "express";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";

// Local modules
import { xssSanitizer } from "../middlewares/xssSanitizer.js";

export default (app) => {
  // Security headers
  app.use(helmet());

  // CORS
  app.use(
    cors({
      origin: process.env.CLIENT_URL,
      credentials: true,
    })
  );

  // Dev logging
  if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  }

  // Body parser
  app.use(express.json({ limit: "100kb" }));
  app.use(cookieParser());

  // Data sanitization
  app.use(xssSanitizer);
  app.use((req, res, next) => {
    if (req.body) req.body = mongoSanitize.sanitize(req.body);
    if (req.params) req.params = mongoSanitize.sanitize(req.params);
    next();
  });
  // Compression
  app.use(compression());

  // Rate limiting
  const generalRateLimiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000, // 1 hour
    message: "Too many requests from this IP, try again later.",
  });

  const authRateLimiter = rateLimit({
    max: 10,
    windowMs: 15 * 60 * 1000, // 15 min
    message: "Too many login attempts, try again later.",
  });

  app.use("/api", generalRateLimiter);
  app.use("/api/v1/auth", authRateLimiter);
};
