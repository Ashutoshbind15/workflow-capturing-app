import mongoose from "mongoose";

const WorkFlowsSchema = new mongoose.Schema({
  title: String,
  shots: [
    {
      title: String,
      url: String,
    },
  ],
});

export const WorkFlow =
  mongoose.models?.WorkFlow || mongoose.model("WorkFlows", WorkFlowsSchema);
