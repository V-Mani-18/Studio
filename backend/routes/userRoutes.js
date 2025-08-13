const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

// Helper to generate next userId
async function getNextUserId() {
  const lastUser = await User.findOne().sort({ userId: -1 });
  if (!lastUser) return "001";
  const nextId = String(parseInt(lastUser.userId, 10) + 1).padStart(3, "0");
  return nextId;
}

// Add user
router.post("/", async (req, res) => {
  try {
    const userId = await getNextUserId();
    const user = new User({ ...req.body, userId });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to add user" });
  }
});

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Get user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

module.exports = router;
