import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { CalendarComponent } from './CalendarComponent'
import './MySchedule.css'

export const MySchedule = ({ userName }) => {
  const [events, setEvents] = useState([]);
  
  const [newEvent, setNewEvent] = useState({
    title: '',
    start: '',
    end: '',
    username: userName
  });

  useEffect(() => {
    axios.get("http://localhost:8081/events", {
        params: { username: userName }
      })
      .then((response) => setEvents(response.data))
      .catch((error) => console.log("Error fetching events", error));
  }, [userName]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    const startLocal = new Date(newEvent.start);
    const endLocal = new Date(newEvent.end);

    const formatDateTime = (date) => {
      const year = date.getFullYear();
      const month = ('0' + (date.getMonth() + 1)).slice(-2); // Month is zero-based
      const day = ('0' + date.getDate()).slice(-2);
      const hours = ('0' + date.getHours()).slice(-2);
      const minutes = ('0' + date.getMinutes()).slice(-2);
      const seconds = ('0' + date.getSeconds()).slice(-2);
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    const sqlStartDateTime = formatDateTime(startLocal);
    const sqlEndDateTime = formatDateTime(endLocal);
  
    const eventToAdd = {
      ...newEvent,
      start: sqlStartDateTime,
      end: sqlEndDateTime,
    };

    axios.post("http://localhost:8081/create-event", eventToAdd)
      .then((response) => setEvents([...events, eventToAdd]))
      .catch((error) => console.log("Error creating event", error));
    setNewEvent({ title: '', start: '', end: '', username: userName});
  };

  return (
    <div className="container">
      <div className="sidebar">
        <form onSubmit={handleAddEvent}>
          <p>Event Title</p>
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={newEvent.title}
            onChange={handleInputChange}
            required
          />
          <p>Start time</p>
          <input
            type="datetime-local"
            name="start"
            value={newEvent.start}
            onChange={handleInputChange}
            required
          />
          <p>End time</p>
          <input
            type="datetime-local"
            name="end"
            value={newEvent.end}
            onChange={handleInputChange}
            required
          />
          <button className="add-team-btn" type="submit">Add Event</button>
        </form>
      </div>
      <div className="calendar">
        <CalendarComponent events={events} />
      </div>
    </div>
    
  )
}
