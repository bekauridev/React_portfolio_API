import express from "express";
import {
  indexBlogs,
  showBlog,
  storeBlog,
  updateBlog,
  destroyBlog,
} from "../controllers/blogsController.js";
import { checkRole } from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", indexBlogs);
router.get("/:id", showBlog);

// Protected routes
router.use(protect);
router.use(checkRole("admin"));

router.post("/", storeBlog);
router.route("/:id").patch(updateBlog).delete(destroyBlog);

export default router;
