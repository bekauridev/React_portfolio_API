import mongoose from "mongoose";
import slugify from "slugify";
import validator from "validator";
import urlRegex from "../utils/urlRegex.js";
import { httpsUrlValidator } from "../utils/validators/urlValidator.js";
const projectSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      unique: true,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    slogan: {
      type: String,
    },

    description: {
      type: String,
      required: true,
    },

    technologies: {
      type: [String],
      required: true,
    },

    gallery: {
      type: [
        {
          type: String,
          validate: httpsUrlValidator,
        },
      ],
      default: [],
    },

    thumbnail: {
      type: String,
      validate: httpsUrlValidator,
    },

    cardImage: {
      type: String,
      validate: httpsUrlValidator,
    },

    coverImage: {
      type: String,
      validate: httpsUrlValidator,
    },

    liveDemo: {
      type: String,
      validate: httpsUrlValidator,
    },

    gitRepo: {
      type: String,
      trim: true,
      match: urlRegex,
      validate: {
        validator: (value) => {
          return validator.isURL(value, {
            require_protocol: true,
            protocols: ["https", "git"],
          });
        },
        message: "Git repository URL must be a valid HTTPS or Git URL",
      },
    },

    database: {
      type: String,
      validate: httpsUrlValidator,
    },
  },
  {
    timestamps: true, // createdAt & updatedAt
  }
);

// ---------------------------
// AUTO-GENERATE SLUG
// ---------------------------

projectSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true, strict: true });
  next();
});

// Keep slug in sync when title is changed via findOneAndUpdate
projectSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  if (update?.title) {
    const newSlug = slugify(update.title, { lower: true, strict: true });
    this.setUpdate({ ...update, slug: newSlug });
  }
  next();
});

export default mongoose.model("Project", projectSchema);
