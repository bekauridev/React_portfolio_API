import mongoose from "mongoose";
import { httpsUrlValidator } from "../utils/validators/urlValidator.js";

const storySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    image: {
      type: String,
      required: true,
      validate: httpsUrlValidator,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Story", storySchema);
