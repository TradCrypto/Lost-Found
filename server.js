const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const db = require('./database');

const app = express();
app.use(bodyParser.json());

// Nodemailer setup for sending emails
const transporter = nodemailer.createTransport({
    service: 'gmail', // or another email provider like SMTP
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password' // Consider using environment variables for sensitive data
    }
});

// Route to add a new lost item
app.post('/report', (req, res) => {
    const { name, description, location, date } = req.body;

    // Insert the lost item into the database
    const query = `INSERT INTO items (name, description, location, date) VALUES (?, ?, ?, ?)`;
    db.run(query, [name, description, location, date], function(err) {
        if (err) {
            return res.status(500).send("Error saving item to the database.");
        }

        // Send email notification
        const mailOptions = {
            from: 'your-email@gmail.com',
            to: 'school-email@example.com',
            subject: 'New Lost Item Reported',
            text: `A new lost item has been reported:\n\n
                   Name: ${name}\n
                   Description: ${description}\n
                   Last Seen Location: ${location}\n
                   Date Lost: ${date}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).send("Error sending email.");
            }
            res.status(200).send("Lost item has been reported and your email is sent.");
        });
    });
});

// Route to retrieve all lost items
app.get('/items', (req, res) => {
    db.all(`SELECT * FROM items`, (err, rows) => {
        if (err) {
            return res.status(500).send("Error retrieving items from the database.");
        }
        res.status(200).json(rows);
    });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
