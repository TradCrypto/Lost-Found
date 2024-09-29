const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./lost-and-found.db');

// Create a table for lost items if it doesn't exist
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        location TEXT NOT NULL,
        date TEXT NOT NULL
    )`);
});

module.exports = db;
