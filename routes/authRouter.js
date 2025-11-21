import express from "express";
import {
  signup,
  login,
  logout,
  getMe,
  // resetPassword,
  // forgotPassword,
  updatePassword,
} from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

// router.post("/forgot-password", forgotPassword);
// router.patch("/reset-password/:token", resetPassword);

router.use(protect);

router.get("/me", getMe);
router.post("/logout", logout);
router.patch("/update-password", updatePassword);

export default router;
