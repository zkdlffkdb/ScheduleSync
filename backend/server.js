import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Tigger#123", // fill in with your password
    database: "signup"
})

app.post("/sign-up", (req, res) => {
    const sql = "INSERT INTO login (`username`, `email`, `password`) VALUES (?)";
    const values = [
        req.body.username,
        req.body.email,
        req.body.password
    ];
    db.query(sql, [values], (err, result) => {
        // probably can include an extra error if there is duplicate username
        if (err) {
            if (err.code == 'ER_DUP_ENTRY') {
                return res.json({Error: "Duplicate User"});
            }
            console.log(err);
        } else {
            return res.json({Status: "Success"});
        }
    });
});

app.post("/login", (req, res) => {
    // make password case sensitive later??
    const sql = "SELECT * FROM login WHERE `username` = ? AND `password` = ?";
    db.query(sql, [req.body.username, req.body.password], (err, result) => {
        if (err) {
            return res.json("Error");
        } else if (result.length > 0) {
            return res.json(result[0].username);
        } else {
            return res.json("Failed");
        }
    })
})

// Endpoint to create an event
app.post("/create-event", (req, res) => {
    // include one more col to tie events to certain loginId
    const getLoginId = "SELECT loginid FROM login WHERE username = ?";

    db.query(getLoginId, [req.body.username], (err, result) => {
        if (err) {
            console.error('Unable to find user', err); // should not happen
            return res.status(500).json("Unable to find user");
        } else {
            const userId = result[0].loginid;
            const sql = "INSERT INTO events (`title`, `start`, `end`, `loginId`) VALUES (?)";
            const values = [
                req.body.title,
                req.body.start,
                req.body.end,
                userId
            ];
            db.query(sql, [values], (err, result) => {
                if (err) {
                    console.error('Error creating event:', err);
                    return res.status(500).json("Error creating event");
                } else {
                    return res.json(result);
                }
            });
        }
    });
});

// Endpoint to fetch events
app.get("/events", (req, res) => {
    // amend to change it to only relevant events, not all
    const getLoginId = "SELECT loginid FROM login WHERE username = ?";
    db.query(getLoginId, [req.query.username], (err, result) => {
        if (err) {
            console.error('Unable to find user', err); // should not happen
            return res.status(500).json("Unable to find user");
        } else {
            const userId = result[0].loginid;
            const sql = "SELECT * FROM events WHERE loginId = ?";
            db.query(sql, [userId], (err, result) => {
                if (err) {
                    console.error('Error retrieving events:', err);
                    return res.status(500).json("Error retrieving events");
                } else {
                    return res.json(result);
                }
            });
        }
    });
});

app.post("/create-team"), (req, res) => {
    // have not yet created database for this portion
};

app.get("/collaborationevents"), (req, res) => {
    const getEvents = "SELECT * FROM events";
    db.query(getEvents, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            return res.json(result);
        }
    });
}

const PORT = 8081;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});