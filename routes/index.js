import express from "express";
import projectsRoutes from "../routes/projectsRoutes.js";
import authRouter from "./authRouter.js";
import goodiesRoutes from "./goodiesRoutes.js";
const router = express.Router();

router.use("/auth", authRouter);
router.use("/projects", projectsRoutes);
router.use("/goodies", goodiesRoutes);

export default router;
