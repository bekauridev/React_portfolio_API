import mongoose from "mongoose";
import slugify from "slugify";
import { httpsUrlValidator } from "../utils/validators/urlValidator.js";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
      index: true,
    },

    excerpt: {
      type: String,
      maxlength: 300,
    },

    content: {
      type: String, // markdown or HTML
      required: true,
    },

    coverImage: {
      type: String,
      validate: httpsUrlValidator,
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

    tags: {
      type: [String],
      index: true,
    },

    category: {
      type: String,
      default: "General",
    },

    author: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    readTime: {
      type: Number, // auto-generated
    },
  },
  {
    timestamps: true, // createdAt & updatedAt
  }
);

// ---------------------------
// AUTO-GENERATE SLUG
// ---------------------------
blogSchema.pre("save", function (next) {
  if (!this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

// ---------------------------
// AUTO CALCULATE READ TIME
// ---------------------------
blogSchema.pre("save", function (next) {
  if (this.content) {
    const wordCount = this.content.split(/\s+/).length;
    this.readTime = Math.ceil(wordCount / 200); // ~200 WPM
  }
  next();
});

export default mongoose.model("Blog", blogSchema);
