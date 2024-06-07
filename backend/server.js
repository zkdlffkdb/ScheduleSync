import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Pandabearkai12", // fill in with your password
    database: "signup"
})

// Endpoint to create an event
app.post("/create-event", (req, res) => {
    const sql = "INSERT INTO events (`title`, `start`, `end`) VALUES (?)";
    const values = [
        req.body.title,
        req.body.start,
        req.body.end
    ];
    db.query(sql, [values], (err, result) => {
        if (err) {
            console.error('Error creating event:', err);
            return res.status(500).json("Error creating event");
        } else {
            return res.json(result);
        }
    });
});

// Endpoint to fetch events
app.get("/events", (req, res) => {
    const sql = "SELECT * FROM events";
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching events:', err);
            return res.status(500).json("Error fetching events");
        } else {
            return res.json(result);
        }
    });
});

app.post("/sign-up", (req, res) => {
    const sql = "INSERT INTO login (`name`, `email`, `password`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ];
    db.query(sql, [values], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            return res.json(result);
        }
    });
});

app.post("/login", (req, res) => {
    // make password case sensitive later??
    const sql = "SELECT * FROM login WHERE `email` = ? AND `password` = ?";
    db.query(sql, [req.body.email, req.body.password], (err, result) => {
        if (err) {
            return res.json("Error");
        } else if (result.length > 0) {
            return res.json(result[0].name);
        } else {
            return res.json("Failed");
        }
    })
})

const PORT = 8081;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
