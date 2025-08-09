const express = require("express");
const router = express.Router();
const Client = require("../models/client");

// Helper to generate next client ID
async function getNextClientId() {
  const lastClient = await Client.findOne().sort({ clientId: -1 });
  if (!lastClient) return "001";
  const nextId = String(parseInt(lastClient.clientId, 10) + 1).padStart(3, "0");
  return nextId;
}

router.post("/", async (req, res) => {
  try {
    const clientId = await getNextClientId();
    const client = new Client({ ...req.body, clientId });
    await client.save();
    res.status(201).json(client);
  } catch (err) {
    res.status(500).json({ error: "Failed to add client" });
  }
});

// Get all clients
router.get("/", async (req, res) => {
  try {
    const client = await Client.find();
    res.json(client);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch clients" });
  }
});

// Update a client
router.put("/:id", async (req, res) => {
  try {
    const updatedClient = await Client.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedClient);
  } catch (err) {
    res.status(500).json({ error: "Failed to update client" });
  }
});

module.exports = router;