import express from "express";
import {
  indexTechStack,
  showTechStack,
  storeTechStack,
  updateTechStack,
  destroyTechStack,
} from "../controllers/techStackController.js";
import { checkRole } from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", indexTechStack);
router.get("/:id", showTechStack);

// Protected routes
router.use(protect);
router.use(checkRole("admin"));

router.post("/", storeTechStack);
router.route("/:id").patch(updateTechStack).delete(destroyTechStack);

export default router;
