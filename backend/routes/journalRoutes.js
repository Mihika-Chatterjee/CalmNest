const express = require('express');
const router = express.Router();
const connection = require('../db'); 



function requireLogin(req, res, next) {
  if (!req.session.user) return res.status(401).json({ error: 'Not logged in' });
  next();
}


router.post("/submit_journal", requireLogin, (req, res) => {
  const { entry } = req.body;
  if (!entry) return res.json({ success: false, message: "Journal entry cannot be empty." });

  const sql = "INSERT INTO journal (user_id, entry, created_at) VALUES (?, ?, NOW())";
  db.query(sql, [req.session.user.id, entry], (err) => {
    if (err) {
      console.error("Error saving journal entry:", err);
      return res.json({ success: false, message: "Error saving journal entry." });
    }
    res.json({ success: true, message: "Journal entry saved successfully!" });
  });
});


router.get("/get_journal", requireLogin, (req, res) => {
  const sql = "SELECT * FROM journal WHERE user_id=? ORDER BY created_at DESC";
  db.query(sql, [req.session.user.id], (err, results) => {
    if (err) {
      console.error("Error fetching journal entries:", err);
      return res.json({ success: false, message: "Error fetching entries." });
    }
    res.json({ success: true, entries: results });
  });
});

module.exports = router;
