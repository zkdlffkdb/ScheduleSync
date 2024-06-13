import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { CalendarComponent } from './CalendarComponent'
import './MySchedule.css'

export const MySchedule = () => {
  const [events, setEvents] = useState([]);
  
  const [newEvent, setNewEvent] = useState({
    title: '',
    start: '',
    end: '',
  });

  useEffect(() => {
    axios.get("http://localhost:8081/events")
      .then((response) => setEvents(response.data))
      .catch((error) => console.log("Error fetching events", error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    const startLocal = new Date(newEvent.start);
    const endLocal = new Date(newEvent.end);
    
    const startYear = startLocal.getFullYear();
    const startMonth = ('0' + (startLocal.getMonth() + 1)).slice(-2); // Month is zero-based
    const startDay = ('0' + startLocal.getDate()).slice(-2);
    const startHours = ('0' + startLocal.getHours()).slice(-2);
    const startMinutes = ('0' + startLocal.getMinutes()).slice(-2);
    const startSeconds = ('0' + startLocal.getSeconds()).slice(-2);
    const sqlStartDateTime = `${startYear}-${startMonth}-${startDay} ${startHours}:${startMinutes}:${startSeconds}`;

    const endYear = endLocal.getFullYear();
    const endMonth = ('0' + (endLocal.getMonth() + 1)).slice(-2);
    const endDay = ('0' + endLocal.getDate()).slice(-2);
    const endHours = ('0' + endLocal.getHours()).slice(-2);
    const endMinutes = ('0' + endLocal.getMinutes()).slice(-2);
    const endSeconds = ('0' + endLocal.getSeconds()).slice(-2);
    const sqlEndDateTime = `${endYear}-${endMonth}-${endDay} ${endHours}:${endMinutes}:${endSeconds}`;

    const eventToAdd = {
      ...newEvent,
      start: sqlStartDateTime,
      end: sqlEndDateTime,
    };
    axios.post("http://localhost:8081/create-event", eventToAdd)
      .then((response) => setEvents([...events, eventToAdd]))
      .catch((error) => console.log("Error creating event", error));
    setNewEvent({ title: '', start: '', end: '' });
  };

  return (
    <div className="container">
      <div className="add-event">
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
          <button type="submit">Add Event</button>
        </form>
      </div>
      <div className="calendar">
        <CalendarComponent events={events} />
      </div>
    </div>
    
  )
}
