const express = require("express");
const router = express.Router();
const db = require("../db"); // your MySQL connection file

// ➕ POST: Create a new thread
router.post("/threads", (req, res) => {
  const { title, content, category } = req.body;
  if (!title || !content || !category)
    return res.json({ success: false, message: "All fields are required." });

  const sql = "INSERT INTO threads (title, content, category) VALUES (?, ?, ?)";
  db.query(sql, [title, content, category], (err, result) => {
    if (err) {
      console.error("Error inserting thread:", err);
      return res.json({ success: false, message: "Database error." });
    }
    res.json({ success: true, message: "Thread posted successfully!" });
  });
});
// GET: All threads or by category (query param)
router.get("/threads", (req, res) => {
  const { category } = req.query;
  let sql = "SELECT * FROM threads";
  const params = [];

  if (category) {
    sql += " WHERE category = ?";
    params.push(category);
  }

  sql += " ORDER BY created_at DESC";

  db.query(sql, params, (err, results) => {
    if (err) {
      console.error("Error fetching threads:", err);
      return res.json({ success: false, message: "Error fetching threads." });
    }
    res.json({ success: true, threads: results });
  });
});

module.exports = router;
