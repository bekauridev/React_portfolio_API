import express from "express";
import {
  getWorkStatus,
  showWorkStatus,
  storeWorkStatus,
  updateWorkStatus,
  destroyWorkStatus,
} from "../controllers/workStatusController.js";
import { checkRole } from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getWorkStatus);
router.get("/:id", showWorkStatus);

// Protected routes
router.use(protect);
router.use(checkRole("admin"));

router.post("/", storeWorkStatus);
router.route("/:id").patch(updateWorkStatus).delete(destroyWorkStatus);

export default router;
