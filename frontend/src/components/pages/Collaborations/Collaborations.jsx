import React, { useState, useEffect } from 'react'
import { CalendarComponent } from './CalendarComponent'
import axios from 'axios';
import './Collaborations.css';

import collab_icon from '../../Assets/collab_icon.png';

export const Collaborations = ({ userName }) => {
  const [openPopup, setOpenPopup] = useState(false);
  const [teams, setTeams] = useState([]); // Storing list of teams
  const [teamName, setTeamName] = useState(""); // storing new team name
  const [collaborator, setCollaborator] = useState(""); // storing collaborator
  const [startDate, setStartDate] = useState(""); // storing start date
  const [endDate, setEndDate] = useState(""); // storing end date
  const [selectedTeam, setSelectedTeam] = useState(null); // selected team
  const [events, setEvents] = useState([]); // storing events

  useEffect(() => {
    // Fetch the list of teams from the database when the component mounts
    axios.get("http://localhost:8081/fetch-teams", {
      params: { username: userName }
      })
      .then((response) => {
        setTeams(response.data); // Set the fetched teams in state
      })
      .catch((error) => {
        console.error("There was an error fetching the teams!", error);
      });
  }, [userName]);

  const handleAddTeam = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8081/create-team", {
      name: teamName,
      collaborator: collaborator,
      startDate: startDate,
      endDate: endDate,
      username: userName
    })
      .then((response) => {
        if (response.data.Status === "No existing user") {
          // temporary configuration, can be represented differently later
          alert("No existing user");
        } else if (response.data.Status === "Duplicate team name") {
          alert("This team name already exists, please choose another one");
        } else if (response.data.Status === "Invalid datetime") {
          alert("Please choose an valid timeframe");
        }
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

  const fetchTeamEvents = (teamId) => {
    axios
      .get('http://localhost:8081/fetch-team-events', {
        params: { teamId },
      })
      .then((response) => {
        setEvents(response.data); // Set the fetched events in state
        setSelectedTeam(teamId); // Set the selected team
      })
      .catch((error) => {
        console.error('There was an error fetching the team events!', error);
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
          <button 
            key={team.teamId} 
            className={`team-button color-${index % 4}`}
            onClick={() => fetchTeamEvents(team.teamId)}
          >
            {team.teamName}
          </button>
        ))}
      </div>
      <div className="calendar">

        {/* Pop-up */}
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
                  <input
                  type="text"
                  placeholder="Username"
                  value={collaborator}
                  onChange={(e) => setCollaborator(e.target.value)}
                  required
                />
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

        {/* Team calendar */}
        {selectedTeam && (
          <div className="events-calendar">
            <h2>Events for Team {selectedTeam}</h2>
            <CalendarComponent events={events} />
          </div>
        )}
        
      </div>
    </div>
    
  );
  
};