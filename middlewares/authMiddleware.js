import jwt from "jsonwebtoken";
import { promisify } from "util";
import User from "../models/userModel.js";
import AppError from "../utils/AppError.js";

/**
 * @desc    Protects routes by requiring authentication and attaching the authenticated user to the request object.
 * @access  Private
 */
export const protect = async (req, res, next) => {
  let token;

  // 1.Get token from Authorization header or cookie
  const authHeader = req.headers.authorization;

  if (authHeader?.toLowerCase().startsWith("bearer ")) {
    const [, extractedToken] = authHeader.split(" ");
    if (extractedToken) token = extractedToken;
  } else if (req.cookies?.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    throw new AppError("Access denied! Please log in or sign up to continue.", 401);
  }

  // 2.Verify token asynchronously
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3.Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    throw new AppError("This account no longer exists..", 401);
  }

  // 4.Check if password changed after token was issued
  if (currentUser.changedPasswordAfter?.(decoded.iat)) {
    throw new AppError("Your session has expired. Please log in again.", 401);
  }

  // 5.Attach user to request
  req.user = currentUser;
  next();
};
