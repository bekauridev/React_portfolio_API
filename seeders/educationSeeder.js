import Education from "../models/educationModel.js";
import { runSeed } from "./seedRunner.js";

runSeed({ model: Education, dataFile: "education.json", label: "Education" });
