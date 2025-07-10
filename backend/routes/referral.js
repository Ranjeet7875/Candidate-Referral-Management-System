const express = require("express");
const router = express.Router();
const ReferralModel = require("../modals/referralForm");

router.post("/candidates", async (req, res) => {
  try {
    const candidate = new ReferralModel(req.body);
    await candidate.save();
    res.status(201).json(candidate);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/candidates", async (req, res) => {
  try {
    const candidates = await ReferralModel.find();
    res.status(200).json(candidates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/candidates/:id/status", async (req, res) => {
  const { id } = req.params;
  const { Status } = req.body;
  try {
    const updated = await ReferralModel.findByIdAndUpdate(
      id,
      { Status },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/candidates/:id", async (req, res) => {
  try {
    const removed = await ReferralModel.findByIdAndDelete(req.params.id);
    res.status(200).json(removed);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
