import User from "../models/userModel.js";
import sendEmail from "../services/emailService.js";
import AppError from "../utils/AppError.js";
import { sanitizeUserData } from "../utils/dataSanitizer.js";
import hashToken from "../utils/hashToken.js";
import sendTokenResponse, { buildCookieOptions } from "../utils/sendTokenResponse.js";
import ErrorResponse from "../utils/ErrorResponse.js";

// ------------------
//   Public Routes
// ------------------

/**
 * @desc   User Signup
 * @route  POST /api/v1/auth/signup
 * @access Public
 */
export const signup = async (req, res, next) => {
  const { username, email, password, passwordConfirm } = req.body;

  if (!username || !email || !password || !passwordConfirm) {
    throw new AppError("Please provide all required fields", 400);
  }

  const newUser = await User.create({
    username,
    email,
    password,
    passwordConfirm,
  });

  sendTokenResponse(newUser, 201, res);
};

/**
 * @desc   User Login
 * @route  POST /api/v1/auth/login
 * @access Public
 */
export const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError("Please provide email and password", 400);
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.comparePassword(password))) {
    throw new AppError("Invalid email or password", 401);
  }

  sendTokenResponse(user, 200, res);
};

// -----------------------
//   Password Reset Flow
// -----------------------

/**
 * @desc   Forgot password - send reset token
 * @route  POST /api/v1/auth/forgot-password
 * @access Public
 */
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) throw new AppError("Please provide your email address", 400);

  const user = await User.findOne({ email });
  if (!user) throw new AppError("Change email or try again later", 404);

  // Generate the reset token
  const resetToken = user.createPasswordResetToken();

  // Avoid schema validations
  await user.save({ validateBeforeSave: false });

  try {
    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/auth/reset-password/${resetToken}`;

    const htmlMessage = `
      <p>You requested a password reset.</p>
      <p>Click the link below to set a new password. Link expires in 10 minutes:</p>
      <a href="${resetURL}">Reset Password</a>
      <p>If you didn't request this, ignore this email.</p>
`;

    await sendEmail({
      email: user.email,
      subject: "Password reset token (valid for 10 min)",
      html: htmlMessage,
    });

    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    throw new AppError("Error sending the email. Try again later.", 500);
  }
};

/**
 * @desc   Reset password using token
 * @route  PATCH /api/v1/auth/reset-password/:token
 * @access Public
 */
export const resetPassword = async (req, res) => {
  const hashedToken = hashToken(req.params.token); // Hash token

  // Find user based on token and date
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) throw new AppError("Token is invalid or has expired", 400);

  // Update Password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;

  // Clear Token related Data
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save(); // Save user

  sendTokenResponse(user, 200, res);
};

// ------------------
//   Private Routes
// ------------------

/**
 * @desc   Update Currently Authenticated password
 * @route  PATCH /api/v1/auth/update-password
 * @access Private
 */
export const updatePassword = async (req, res) => {
  const { currentPassword, password, passwordConfirm } = req.body;

  if (!currentPassword || !password || !passwordConfirm) {
    throw new AppError("Please provide all required fields", 400);
  }

  const user = await User.findById(req.user.id).select("+password");

  // Verify Current Password
  if (!(await user.comparePassword(currentPassword))) {
    throw new AppError("Your current password is incorrect", 401);
  }

  user.password = password;
  user.passwordConfirm = passwordConfirm;
  await user.save(); // Save Changes

  sendTokenResponse(user, 200, res); // Send Response
};

/**
 * @desc   Logout
 * @route  POST /api/v1/auth/logout
 * @access Private
 */
export const logout = async (req, res) => {
  const options = buildCookieOptions();
  res.cookie("jwt", "", { ...options, maxAge: 0 });

  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
};

/**
 * @desc   Get Currently Authenticated User
 * @route  GET /api/v1/auth/me
 * @access Private
 */
export const getMe = async (req, res) => {
  res.status(200).json({
    status: "success",
    data: { user: sanitizeUserData(req.user) },
  });
};

export const checkRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse("You do not have permission to perform this action", 403)
      );
    }
    next();
  };
};
