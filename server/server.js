const express = require('express');
const db = require('./db');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse JSON request body

let time = 0; // Define start time for console messages

// Middleware to do console logging for HTTP requests (reduces duplication)
app.use((req, res, next) => {
    time += 1;
    console.log(`${time}: ${req.method} request for ${req.url}`);
    next(); // Keep going
  });

// User signup
app.post('/api/signup', (req, res) => {

});

// Get scholarship data
app.get('/api/scholarships', (req, res) => {
    const query = 'SELECT * FROM Scholarships';

    db.query(query, (err, results) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: "Failed to fetch scholarships" });
        }
        res.json(results);
      });
});

// Get scholarship by id
app.get('/api/scholarships/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM Scholarships WHERE id = ?';

    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Failed to fetch scholarship" });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "Scholarship not found" });
        }
        res.json(results[0]);
    });
});

// Get list of saved scholarships
app.get('/api/saved-scholarships', (req, res) => {
    const query = `SELECT s.* FROM SavedLists sl JOIN Scholarships s ON sl.scholarship_id = s.id`;

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Failed to fetch saved scholarships" });
        }
        res.json(results);
    });
});

// Save liked scholarship to list
app.post('/api/saved-scholarships', (req, res) => {
    const { scholarship_id } = req.body;

    // Check if there the scholarship already exists in the list
    const checkQuery = 'SELECT * FROM Scholarships WHERE id = ?';
    const insertQuery = 'INSERT INTO SavedLists (scholarship_id) VALUES (?)';

    db.query(checkQuery, [scholarship_id], (err, results) => {
        if (err || results.length === 0) {
            return res.status(400).json({ error: "Invalid scholarship ID" });
        }

        db.query(insertQuery, [scholarship_id], (err) => {
            if (err) {
                return res.status(500).json({ error: "Failed to save scholarship or already saved" });
            }
            res.json({ message: "Scholarship saved successfully." });
        });
    });
});

// Remove liked scholarship from list
app.delete('/api/saved-scholarships/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM SavedLists WHERE scholarship_id = ?';

    db.query(query, [id], (err, results) => {
        if (err || results.selected === 0) {
            return res.status(400).json({ error: "Failed to remove scholarship or it doesn't exist" });
        }
        res.json({ message: "Scholarship removed successfully." });
    });
});

// Start app by calling listen method
app.listen(port, () => {
    console.log(`Listening on port ${port}`); // Print log message to indicate start
});