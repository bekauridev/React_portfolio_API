import express from "express";
import projectsRoutes from "../routes/projectsRoutes.js";
import authRouter from "./authRouter.js";
const router = express.Router();

router.use("/auth", authRouter);
router.use("/projects", projectsRoutes);

export default router;
