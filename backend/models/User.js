import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  wallet: { type: String, required: true, unique: true },
  name: String,
  email: String,
  role: { type: String, enum: ["doctor", "patient"], required: true },
});

export default mongoose.model("User", userSchema);
