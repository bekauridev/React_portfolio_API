import AppError from "./AppError.js";
import { sanitizeUserData } from "./dataSanitizer.js";

const buildCookieOptions = () => {
  const days = Number(process.env.JWT_COOKIE_EXPIRES_IN_DAYS || "1");
  if (!Number.isFinite(days) || days <= 0) {
    throw new AppError("Invalid JWT_COOKIE_EXPIRES_IN_DAYS value", 500);
  }

  return {
    httpOnly: true, // prevent client-side JS access
    sameSite: "strict", // reduce CSRF risk
    secure: process.env.NODE_ENV === "production", // only over HTTPS
    maxAge: days * 24 * 60 * 60 * 1000, // days → ms
  };
};

const sendTokenResponse = (user, statusCode, res) => {
  if (!user || !user.generateAuthToken) {
    throw new AppError("Invalid user object passed to sendTokenResponse", 500);
  }

  const token = user.generateAuthToken();
  const cookieOptions = buildCookieOptions();

  res.cookie("jwt", token, cookieOptions);

  res.status(statusCode).json({
    status: "success",
    token,
    data: { user: sanitizeUserData(user) },
  });
};

export { buildCookieOptions };
export default sendTokenResponse;
