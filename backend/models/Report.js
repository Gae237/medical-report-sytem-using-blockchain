import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  cid: { type: String, required: true }, // IPFS CID
  patient: { type: String, required: true }, // wallet address
  doctor: { type: String, required: true },
  title: String,
  description: String,
  date: { type: Date, default: Date.now }
});

export default mongoose.model("Report", reportSchema);
