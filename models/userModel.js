import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import zxcvbn from "zxcvbn";
import AppError from "../utils/AppError.js";
import hashToken from "../utils/hashToken.js";

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: {
        values: ["user", "admin"],
        message: "Role must be either 'user' or 'admin'",
      },
      default: "user",
    },

    username: {
      type: String,
      unique: true,
      index: true,
      trim: true,
      required: [true, "A user must have a username!"],
    },

    email: {
      type: String,
      required: [true, "A user must have an email!"],
      unique: true,
      index: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email address"],
    },

    password: {
      type: String,
      minlength: [8, "Password must be at least 8 characters long"],
      required: [true, "A user must have a password!"],
      select: false,
    },

    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// -----------------------------------------------------------------------------
// Virtual Fields
// -----------------------------------------------------------------------------
userSchema
  .virtual("passwordConfirm")
  .set(function (value) {
    this._passwordConfirm = value;
  })
  .get(function () {
    return this._passwordConfirm;
  });

// -----------------------------------------------------------------------------
// Middleware
// -----------------------------------------------------------------------------

// Unified pre-save hook for password & verification code hashing
userSchema.pre("save", async function (next) {
  try {
    // 1. Password handling
    if (this.isModified("password")) {
      // Confirm match
      if (this._passwordConfirm && this.password !== this._passwordConfirm) {
        throw new AppError("Passwords do not match", 400);
      }

      // Strength validation
      const strength = zxcvbn(this.password);
      if (strength.score < 2) {
        const { warning, suggestions } = strength.feedback;
        let msg = "Weak password!";
        if (warning) msg += ` ${warning}`;
        if (suggestions?.length) msg += ` ${suggestions.join(" ")}`;
        throw new AppError(msg, 400);
      }

      const salt = await bcrypt.genSalt(12);
      this.password = await bcrypt.hash(this.password, salt);

      if (!this.isNew) {
        this.passwordChangedAt = Date.now() - 1000;
      }
    }

    next();
  } catch (err) {
    next(err);
  }
});

// -----------------------------------------------------------------------------
// Instance Methods
// -----------------------------------------------------------------------------

// Generate signed JWT
userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Compare plaintext password with hashed one
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Check if password was changed after JWT issuance
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (!this.passwordChangedAt) return false;
  const changedTimestamp = Math.floor(this.passwordChangedAt.getTime() / 1000);
  return JWTTimestamp < changedTimestamp;
};

// Create password reset token (hashed with SHA-256)
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = hashToken(resetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

  return resetToken;
};

// -----------------------------------------------------------------------------
// Model Export
// -----------------------------------------------------------------------------
const User = mongoose.model("User", userSchema);
export default User;
