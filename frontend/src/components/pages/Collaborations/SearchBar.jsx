import React, { useState } from 'react';
import axios from 'axios';
import './SearchBar.css'

export const SearchBar = ({ onSelect, currentUsername }) => {
    const [input, setInput] = useState("");
    const [usernames, setUsernames] = useState([]);
    
    const fetchUsers = (value) => {
        axios.get('http://localhost:8081/fetch-usernames', {
            params: { value, currentUsername }
        })
        .then((response) => {
            // Update the state with the fetched usernames
            setUsernames(response.data); 
        })
        .catch((error) => {
            console.error('There was an error fetching the usernames!', error);
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
        <div className="wrapper">
            <input
                placeholder='Type to search...'
                value={input}
                onChange={(e) => handleChange(e.target.value)}
            />
            <ul className='dropdown'>
                {usernames.map((user, index) => (
                    <li className='selector' key={index} onClick={() => handleSelect(user.username)}>
                        {user.username}
                    </li>
                ))}
            </ul>
        </div>
    );
};
