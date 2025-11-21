// projectsRoutes.js (ES module version)
import express from "express";
import {
  indexProjects,
  showProject,
  storeProject,
  updateProject,
  destroyProject,
} from "../controllers/projectsController.js";

import { checkRole } from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", indexProjects);
router.get("/:id", showProject);

// Protected routes
router.use(protect);
router.use(checkRole("admin"));

router.post("/", storeProject);

router.route("/:id").patch(updateProject).delete(destroyProject);

export default router;
