import mongoose from "mongoose";
import { httpsUrlValidator } from "../utils/validators/urlValidator.js";

const goodiesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    logo: {
      type: String, // URL to logo
      required: true,
      validate: httpsUrlValidator,
    },

    url: {
      type: String, // external link
      required: true,
      validate: httpsUrlValidator,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Goodie", goodiesSchema);
