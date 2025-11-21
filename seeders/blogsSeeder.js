import Blog from "../models/blogModel.js";
import { runSeed } from "./seedRunner.js";

runSeed({ model: Blog, dataFile: "blogs.json", label: "Blogs" });
