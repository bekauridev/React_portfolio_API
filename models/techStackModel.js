import mongoose from "mongoose";
import { httpsUrlValidator } from "../utils/validators/urlValidator.js";

const techStackSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },

    iconUrl: {
      type: String,
      required: true,
      validate: httpsUrlValidator,
    },

    order: {
      type: Number,
      required: true,
      unique: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("TechStack", techStackSchema);
