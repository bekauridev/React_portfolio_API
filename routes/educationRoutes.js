import express from "express";
import {
  indexEducation,
  showEducation,
  storeEducation,
  updateEducation,
  destroyEducation,
} from "../controllers/educationController.js";
import { checkRole } from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", indexEducation);
router.get("/:id", showEducation);

// Protected routes
router.use(protect);
router.use(checkRole("admin"));

router.post("/", storeEducation);
router.route("/:id").patch(updateEducation).delete(destroyEducation);

export default router;
