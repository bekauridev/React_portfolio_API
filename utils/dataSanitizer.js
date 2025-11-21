/**
 * Sanitizes user data, stripping out sensitive information.
 * @param {Object} user The user object to sanitize.
 * @returns {Object} The sanitized user object.
 */
export const sanitizeUserData = (user) => {
  if (!user) return null;

  const sanitizedUser = {
    id: user._id.toString(),
    role: user.role,
    username: user.username,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };

  return sanitizedUser;
};
