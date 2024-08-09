import mongoose from "mongoose";

const SectionSchema = new mongoose.Schema({
  title: String,
  descriptionPoints: [String],
  workflows: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workflow",
    },
  ],
});

export const Section =
  mongoose.models?.Section || mongoose.model("Section", SectionSchema);
