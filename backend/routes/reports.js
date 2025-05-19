import express from "express";
import Report from "../models/Report.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const report = await Report.create(req.body);
    res.json(report);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/:wallet", async (req, res) => {
  const reports = await Report.find({ patient: req.params.wallet });
  res.json(reports);
});

export default router;
