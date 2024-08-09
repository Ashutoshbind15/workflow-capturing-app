import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema({
  title: String,
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  workflows: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workflow",
    },
  ],
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  sections: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
    },
  ],
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat",
  },
});

export const Team = mongoose.models?.Team || mongoose.model("Team", TeamSchema);
