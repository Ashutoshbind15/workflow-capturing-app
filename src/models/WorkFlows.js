import mongoose from "mongoose";

const WorkFlowsSchema = new mongoose.Schema({
  title: String,
  shots: [
    {
      title: String,
      url: String,
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export const WorkFlow =
  mongoose.models?.WorkFlow || mongoose.model("WorkFlow", WorkFlowsSchema);
