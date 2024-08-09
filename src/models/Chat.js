import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    text: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export const Message =
  mongoose.models?.Message || mongoose.model("Message", MessageSchema);

const ChatSchema = new mongoose.Schema({
  workflow: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Workflow",
  },
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
});

export const Chat = mongoose.models?.Chat || mongoose.model("Chat", ChatSchema);
