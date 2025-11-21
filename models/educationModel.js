import mongoose from "mongoose";
import { httpsUrlValidator } from "../utils/validators/urlValidator.js";

const educationSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    learningPlace: {
      type: String,
      required: true,
      trim: true,
    },

    learningPlaceLink: {
      type: String,
      trim: true,
      validate: httpsUrlValidator,
    },

    certificateUrl: {
      type: String,
      trim: true,
      validate: httpsUrlValidator,
    }, // link to certificate, school, etc.
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Education", educationSchema);
