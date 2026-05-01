import express from "express";
import projectsRoutes from "../routes/projectsRoutes.js";
import authRouter from "./authRouter.js";
import goodiesRoutes from "./goodiesRoutes.js";
import blogsRoutes from "./blogsRoutes.js";
import storiesRoutes from "./storiesRoutes.js";
import workStatusRoutes from "./workStatusRoutes.js";
import techStackRoutes from "./techStackRoutes.js";
import educationRoutes from "./educationRoutes.js";
const router = express.Router();

router.use("/auth", authRouter);
router.use("/projects", projectsRoutes);
router.use("/goodies", goodiesRoutes);
router.use("/blogs", blogsRoutes);
router.use("/stories", storiesRoutes);
router.use("/work-status", workStatusRoutes);
router.use("/tech-stack", techStackRoutes);
router.use("/education", educationRoutes);

export default router;
