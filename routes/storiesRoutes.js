import express from "express";
import {
  indexStories,
  showStory,
  storeStory,
  updateStory,
  destroyStory,
} from "../controllers/storiesController.js";
import { checkRole } from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", indexStories);
router.get("/:id", showStory);

// Protected routes
router.use(protect);
router.use(checkRole("admin"));

router.post("/", storeStory);
router.route("/:id").patch(updateStory).delete(destroyStory);

export default router;
