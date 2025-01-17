import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  salt: String,
});

export const User = mongoose.models?.User || mongoose.model("User", userSchema);
