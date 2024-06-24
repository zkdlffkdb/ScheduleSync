import React, { useState } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import validation from './signupValidation';
import "./loginSignup.css";

import user_icon from '../Assets/user_icon.png';
import email_icon from '../Assets/email_icon.png';
import password_icon from '../Assets/password_icon.png';

const Signup = () => {
    let [username, setUsername] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    const values = { username, email, password };
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    function signup(event) {
        event.preventDefault();
        const validationErrors = validation(values);
        setErrors(validationErrors);
        if (!validationErrors.username && !validationErrors.email && !validationErrors.password) {
            axios.post("http://localhost:8081/sign-up", {username, email, password})
            .then(res => {
                if (res.data.Status === "Success") {
                    navigate("/");
                } else {
                    // can also be changed to be represented differently later on
                    alert("This username has already been taken :( Please choose another username");
                }
            }).catch(err => console.log(err));
        }
    }

    return (
        <div className="container">
            <div className="header">
                <div className="text">Sign up</div>
                <div className="underline"></div>
            </div>
            <form onSubmit={signup}>
                <div className="inputs">
                    {/*Name input*/}
                    <div className="input">
                        <img src={user_icon} alt="user_icon" />
                        <input placeholder="Username" onChange={e => setUsername(e.target.value)}/>
                    </div>
                    <span className="error">{errors.username && <span>{errors.username}</span>}</span>

                    {/*Email input*/}
                    <div className="input">
                        <img src={email_icon} alt="email_icon" />
                        <input type="email" placeholder="email@domain.com" onChange={e => setEmail(e.target.value)}/>                     
                    </div>
                    <span className="error">{errors.email && <span>{errors.email}</span>}</span>

                    {/*Password input*/}
                    <div className="input">
                        <img src={password_icon} alt="password_icon"/>
                        <input type="password" placeholder="Enter your password" minLength="8" 
                        onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <span className="error">{errors.password && <span>{errors.password}</span>}</span>
                </div>
                {/*can possibly have a forgot password button here in the future*/}
                <div className="submit-container">
                    <button type="submit">Sign up</button>
                </div>
            </form>
            <div className="sign-up">
                <p>Go back to <Link to="/">Log in</Link></p>
            </div>
        </div>
  )
}

export default Signup
