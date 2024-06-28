import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "", // fill in with your password
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
    const getLoginId = "SELECT loginId FROM login WHERE username = ?";

    db.query(getLoginId, [req.body.username], (err, result) => {
        if (err) {
            console.error('Unable to find user', err); // should not happen
            return res.status(500).json("Unable to find user");
        } else {
            if (req.body.start > req.body.end) {
                // handling case where same day, end time earlier than start time
                // also different day, ending earlier than start
                // last one, where both before current datetime
                // comparison is done using strings, must have further testing in case i missed an edge case
                return res.json({Status: "Invalid time"});
            } else {
                const userId = result[0].loginId;
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
        }
    });
});

// Endpoint to fetch events
app.get("/events", (req, res) => {
    const getLoginId = "SELECT loginId FROM login WHERE username = ?";
    db.query(getLoginId, [req.query.username], (err, result) => {
        if (err) {
            console.error('Unable to find user', err); // should not happen
            return res.status(500).json("Unable to find user");
        } else {
            const userId = result[0].loginId;
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

// Endpoint to fetch teams
app.get("/fetch-teams", (req, res) => {
    const getLoginId = "SELECT loginId FROM login WHERE username = ?";
    db.query(getLoginId, [req.query.username], (err, result) => {
        if (err) {
            console.error('Unable to find user', err);
            return res.status(500).json("Unable to find user");
        } else {
            if (result.length === 0) {
                return res.status(404).json("User not found");
            }
            const userId = result[0].loginId;
            const sql = `
                SELECT team.teamId, team.teamName, team.startDate, team.endDate 
                FROM form
                JOIN team ON form.teamId = team.teamId
                WHERE form.loginId = ?
                GROUP BY team.teamId, team.teamName`;
            db.query(sql, [userId], (err, teams) => {
                if (err) {
                    console.error('Error retrieving teams:', err);
                    return res.status(500).json("Error retrieving teams");
                } else {
                    return res.json(teams);
                }
            });
        }
    });
});

// can be used to fetch events in the team later on 
    /*
    const getEvents = "SELECT * FROM events";
    db.query(getEvents, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            return res.json(result);
        }
    });
    */

app.post("/create-team", (req, res) => {
    // first register the team, must first check if added user exists 
    const getLoginId = "SELECT loginId FROM login WHERE username = ?";
    db.query(getLoginId, [req.body.collaborator], (err, result) => {
        if (err) {
            console.error('Error retrieving username', err);
            return res.status(500).json("Error retrieveing username");
        } else if (result.length == 0) {
            console.error("User does not exist");
            res.json({Status: "No existing user"});
        } else {
            if (req.body.startDate > req.body.endDate) {
                return res.json({Status: "Invalid datetime"});
            } else {
                const collaboratorUserId = result[0].loginId; // this is for later
                // we create the team
                const makeTeam = "INSERT INTO team (`teamName`, `startDate`, `endDate`) VALUES (?)";
                const values = [
                    req.body.name,
                    req.body.startDate,
                    req.body.endDate
                ];
                db.query(makeTeam, [values], (err, result) => {
                    if (err) {
                        if (err.code == 'ER_DUP_ENTRY') {
                            console.error("Duplicate team name");
                            return res.json({Status: "Duplicate team name"});
                        }
                        console.log(err);
                    } else {
                        //get teamId for the form
                        const gettingTeamId = "SELECT teamId FROM team WHERE teamName = ?";
                        db.query(gettingTeamId, [req.body.name], (err, result) => {
                            if (err) {
                                console.error('Error getting teamId', err);
                                return res.status(500).json("Error getting teamId");
                            } else {
                                const teamId = result[0].teamId;
                                // creating the entry in form for the collaborator
                                const collabForm = "INSERT INTO form (`loginId`, `teamId`) VALUES (?)";
                                const values = [
                                    collaboratorUserId,
                                    teamId
                                ];
                                db.query(collabForm, [values], (err, result) => {
                                    if (err) {
                                        console.error("Error filling form (collaborator)", err);
                                        return res.status(500).json("Error filling form (collaborator)");
                                    } else {
                                        // must create entry for user himself
                                        const getUsersLoginId = "SELECT loginId FROM login WHERE username = ?";
                                        db.query(getUsersLoginId, [req.body.username], (err, result) => {
                                            if (err) {
                                                console.error("Cannot get user's loginId", err);
                                                return res.status(500).json("Cannot get user's loginId");
                                            } else {
                                                const usersLoginId = result[0].loginId;
                                                const usersForm = "INSERT INTO form (`loginId`, `teamId`) VALUES (?)";
                                                const values = [
                                                    usersLoginId,
                                                    teamId
                                                ];
                                                db.query(usersForm, [values], (err, result) => {
                                                    if (err) {
                                                        console.error("Error filling form (user)", err);
                                                        return res.status(500).json("Error filling form (user)");
                                                    } else {
                                                        return res.json(result);
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        }
    });
});

// Endpoint to fetch events for all team members in collab page
app.get("/fetch-team-events", (req, res) => {
    const teamId = req.query.teamId;
    const sql = `
        SELECT events.*
        FROM form
        JOIN events ON form.loginId = events.loginId
        WHERE form.teamId = ?`;
    
    db.query(sql, [teamId], (err, result) => {
        if (err) {
            console.error('Error retrieving events:', err);
            return res.status(500).json("Error retrieving events");
        } else {
            return res.json(result);
        }
    });
});

const PORT = 8081;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
