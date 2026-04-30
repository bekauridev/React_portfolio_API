import mongoose from "mongoose";

const workStatusSchema = new mongoose.Schema(
  {
    isOpenToWork: {
      type: Boolean,
      required: true,
      default: true,
    },

    label: {
      type: String,
      required: true,
      trim: true,
      default: "Open to new projects",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("WorkStatus", workStatusSchema);
