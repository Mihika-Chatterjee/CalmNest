const express = require("express");
const { spawn } = require("child_process");
const router = express.Router();

// Example: Get recommendations from Python
router.get("/recommend/:mood", (req, res) => {
  const mood = req.params.mood;

  // run Python file
  const python = spawn("python", ["ml_recommendation.py", mood]);

  let dataToSend = "";

  python.stdout.on("data", (data) => {
    dataToSend += data.toString();
  });

  python.on("close", (code) => {
    console.log(`Python exited with code ${code}`);
    res.json({ recommendations: dataToSend.trim() });
  });
});

module.exports = router;
