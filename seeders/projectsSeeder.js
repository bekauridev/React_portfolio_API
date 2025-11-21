import Project from "../models/projectModel.js";
import { runSeed } from "./seedRunner.js";

runSeed({ model: Project, dataFile: "projects.json", label: "Projects" });
