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
    const eventToAdd = {
      ...newEvent,
      start: new Date(newEvent.start),
      end: new Date(newEvent.end),
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
