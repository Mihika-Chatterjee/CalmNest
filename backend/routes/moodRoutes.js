const express = require('express');
const router = express.Router();

// Temporary in-memory storage
let moods = [
  { date: "2025-10-04", mood: 5 },
  { date: "2025-10-05", mood: 4 },
  { date: "2025-10-06", mood: 3 }
];

// GET /mood-history
router.get('/mood-history', (req, res) => {
  res.json(moods);
});

// POST /recommend
router.post('/recommend', (req, res) => {
  const { mood } = req.body;
  // Simple static recommendations for demo
  const recommendations = {
    Happy: ["Listen to upbeat music", "Go for a walk"],
    Neutral: ["Try journaling", "Do a 5-minute meditation"],
    Anxious: ["Take deep breaths", "Listen to calming music"],
    Angry: ["Exercise", "Write down your feelings"],
    Sad: ["Call a friend", "Watch a funny show"],
    Depressed: ["Reach out for support", "Take a short walk"]
  };
  res.json({ recommendations: recommendations[mood] || [] });
});

module.exports = router;
