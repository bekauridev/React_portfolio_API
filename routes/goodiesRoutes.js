import express from "express";
import {
  indexGoodies,
  showGoodie,
  storeGoodie,
  updateGoodie,
  destroyGoodie,
} from "../controllers/goodiesController.js";
import { checkRole } from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", indexGoodies);
router.get("/:id", showGoodie);

// Protected routes
router.use(protect);
router.use(checkRole("admin"));

router.post("/", storeGoodie);
router.route("/:id").patch(updateGoodie).delete(destroyGoodie);

export default router;
