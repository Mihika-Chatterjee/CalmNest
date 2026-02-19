// backend/routes/poemRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Route to submit poem
router.post('/submit', (req, res) => {
    const { title, author, content } = req.body;

    if (!title || !author || !content) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const query = 'INSERT INTO poems (title, author, content) VALUES (?, ?, ?)';
    db.query(query, [title, author, content], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Database error' });
        }
        res.json({ message: 'Poem submitted successfully!' });
    });
});

// Optional: route to get all poems
router.get('/all', (req, res) => {
    const query = 'SELECT * FROM poems ORDER BY id DESC';
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Database error' });
        }
        res.json(results);
    });
});

module.exports = router;
