import crypto from "crypto";

// Reusable function for hashing tokens
const hashToken = (token, algorithm = "sha256", encoding = "hex") => {
  return crypto.createHash(algorithm).update(token).digest(encoding);
};


export default hashToken;