import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";

// Resolve project root for shared paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, "..");

// Load env variables once for all seeders
dotenv.config({ path: path.join(ROOT_DIR, "config", ".env") });

export const runSeed = async ({ model, dataFile, label }) => {
  const action = process.argv[2];
  const prettyName = label || model.collection.collectionName;

  try {
    await mongoose.connect(process.env.DATABASE);

    if (action === "-i") {
      const dataPath = path.join(ROOT_DIR, "data", dataFile);
      const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
      await model.create(data);
      console.log(`${prettyName} imported`.green.inverse);
    } else if (action === "-d") {
      await model.deleteMany();
      console.log(`${prettyName} destroyed`.red.inverse);
    } else {
      console.log("Pass -i to import or -d to delete".yellow);
    }
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.connection.close().catch(() => {});
    process.exit();
  }
};

// Command example node seeders/goodiesSeeder.js -i (create) or -d (delete)
