import React, { useState } from 'react'
// import { CalendarComponent } from './CalendarComponent'
import axios from 'axios';

export const Collaborations = () => {
  const [openPopup, setOpenPopup] = useState(false);

  const handleAddTeam = (e) => {
    axios.get("http://localhost:8081/collaborationevents")
  };

  return (
    <div className="Container">
      <div className="create-popup">
        <button onClick={() => setOpenPopup(true)}>
          Create a new Team
        </button>
      </div>

      {/* The actual popup */}
      {openPopup && 
        <div className="container">
          <div className="create-team">
            <form onSubmit={handleAddTeam}>
              <label>Team name:</label>
              <input
                type="text" 
                placeholder="Enter team name" 
              />
              <label>Member:</label>
              <input 
                type='text' 
                placeholder="Enter your team member's username" 
              />
              <button onClick={() => setOpenPopup(false)}>Close</button>
              <button type="submit">Create</button>
            </form>
          </div>
        </div>
      }
    </div>
  );
};