import React, { useState, useEffect } from 'react'
// import { CalendarComponent } from './CalendarComponent'
import axios from 'axios';
import './Collaborations.css';

import collab_icon from '../../Assets/collab_icon.png';

export const Collaborations = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const [teams, setTeams] = useState([]); // Storing list of teams
  const [teamName, setTeamName] = useState(""); // storing new team name
  const [collaborator, setCollaborator] = useState(""); // storing collaborator
  const [startDate, setStartDate] = useState(""); // storing start date
  const [endDate, setEndDate] = useState(""); // storing end date
  const [usernames, setUsernames] = useState([]);

  useEffect(() => {
    // Fetch the list of teams from the database when the component mounts
    axios.get("http://localhost:8081/collaborationevents")
      .then((response) => {
        setTeams(response.data); // Set the fetched teams in state
      })
      .catch((error) => {
        console.error("There was an error fetching the teams!", error);
      });

    // Fetch the list of usernames from the database for the collaborator dropdown
    axios.get("http://localhost:8081/usernames")
      .then((response) => {
        setUsernames(response.data); // Set the fetched usernames in state
      })
      .catch((error) => {
        console.error("There was an error fetching usernames!", error);
      });
  }, []); // Empty dependency array means this effect runs only once after initial render

  const handleAddTeam = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8081/create-team", {name: teamName, collaborator })
      .then((response) => {
        setTeams([...teams, response.data]); // add new team to list
        setTeamName(""); // Clearing input fields
        setCollaborator(""); 
        setStartDate("");
        setEndDate("");
        setOpenPopup(false); // Close popup
    }).catch((error) => {
      // for now send to console, to edit to show to user
      console.error("There was an error creating the team!", error);
    });
  };

  return (
    <div className="container">
      <div className="sidebar">
        <div className="create-team">
          <p>My Teams</p>
          <button className="corner-button-open" onClick={() => setOpenPopup(true)}>+</button>
        </div>
        {/*This text disappears when pop-up is opened for now, aim to make it be removed when team is created*/}
        {!openPopup && <p>Create a team to get started!</p>} 
        {teams.map((team, index) => (
          <button key={index} className="team-button">{team.name}</button>
        ))}
      </div>
      <div className="calendar">
        {openPopup && 
          <div className="pop-up">
            <form onSubmit={handleAddTeam}>
              <div className="team-name">
                <button className="corner-button-close" onClick={() => setOpenPopup(false)}>x</button>
                <input
                  type="text"
                  placeholder="Team name"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  required
                />
              </div>
              
              {/*Add collaborators*/}
              <div className="collaborators">
                <p>Add collaborators</p>
                <div className="collaborator-input">
                  <img src={collab_icon} alt="collab_icon" width="30" height="30"/>
                  <select 
                    value={collaborator}
                    onChange={(e) => setCollaborator(e.target.value)}
                    required 
                  >
                    <option value="">Username</option>
                    {usernames.map((username, index) => (
                      <option key={index} value={username}>{username}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/*Start and end time*/}
              <div className="timeframe">
                <div className="start">
                  <label htmlFor="start">Start date: </label>
                  <input
                    type="datetime-local"
                    name="start"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                  />
                </div>
                <div className="end">
                  <label htmlFor="end">End date: </label>
                  <input
                    type="datetime-local"
                    name="end"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button className="create-team-btn" type="submit">Create Team</button>
            </form>
          </div>
        }
        
      </div>
    </div>
    
  );
  
};