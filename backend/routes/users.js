import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/:wallet", async (req, res) => {
  const user = await User.findOne({ wallet: req.params.wallet });
  res.json(user);
});

export default router;
