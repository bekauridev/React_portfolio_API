import TechStack from "../models/techStackModel.js";
import { runSeed } from "./seedRunner.js";

runSeed({ model: TechStack, dataFile: "techStack.json", label: "Tech Stack" });
