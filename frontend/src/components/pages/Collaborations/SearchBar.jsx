import React, { useState } from 'react';
import axios from 'axios';
import './SearchBar.css';

export const SearchBar = ({ onSelect, currentUsername }) => {
    const [input, setInput] = useState("");
    const [usernames, setUsernames] = useState([]);

    const fetchUsers = (value) => {
        axios.get('http://localhost:8081/fetch-usernames', {
            params: { value: value, currentUsername: currentUsername }
        })
        .then(response => {
            setUsernames(response.data);
        })
        .catch(error => {
            console.error('There was an error fetching the usernames!', error);
            console.log(error.response);
        });
    };

    const handleChange = (value) => {
        setInput(value);
        // Fetch usernames based on the input value
        fetchUsers(value);
    };

    const handleSelect = (username) => {
        setInput(username);
        setUsernames([]);
        onSelect(username);
    };

    return (
        <div className="search-bar">
            <input
                placeholder='Type to search...'
                value={input}
                onChange={(e) => handleChange(e.target.value)}
            />
            <div className="dropdown">
               <ul>
                    {usernames.map((user, index) => (
                        <li key={index} onClick={() => handleSelect(user.username)}>
                           {user.username}
                        </li>
                    ))}
                </ul> 
            </div>
            
        </div>
  )
}
