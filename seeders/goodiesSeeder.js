import Goodie from "../models/goodieModel.js";
import { runSeed } from "./seedRunner.js";

runSeed({ model: Goodie, dataFile: "goodies.json", label: "Goodies" });
