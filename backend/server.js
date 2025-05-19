import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/reports", (await import("./routes/reports.js")).default);
app.use("/api/users", (await import("./routes/users.js")).default);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected ✅");
    app.listen(5000, () => console.log("Server running on port 5000 🚀"));
  })
  .catch((err) => console.error("MongoDB error:", err));
