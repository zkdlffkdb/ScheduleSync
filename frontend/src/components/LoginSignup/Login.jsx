import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import "./loginSignup.css";

import user_icon from '../Assets/user_icon.png';
import password_icon from '../Assets/password_icon.png';

const Login = ({onLogin}) => {
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    
    const navigate = useNavigate();

    function login(event) {
        event.preventDefault();
        axios.post("http://localhost:8081/login", {username, password})
            .then(res => {
                if (res.data === "Error") {
                    alert("Error");                
                } else if (res.data === "Failed") {
                    alert("Wrong username or password");
                } else {
                    // on success call onLogin() and navigate to my schedule
                    onLogin(res.data);
                    navigate("/my-schedule");
                }                
            }).catch(err => console.log(err));
        }

    return (
        <div className="container">
            <div className="header">
                <div className="text">Login</div>
                <div className="underline"></div>
            </div>
            <form onSubmit={login}>
                <div className="inputs">
                    {/*Email input*/}
                    <div className="input">
                        <img src={user_icon} alt="user_icon" />
                        <input placeholder="Username" onChange={e => setUsername(e.target.value)}/>                        
                    </div>

                    {/*Password input*/}
                    <div className="input">
                        <img src={password_icon} alt="password_icon"/>
                        <input type="password" placeholder="Enter your password" minLength="8"
                        onChange={e => setPassword(e.target.value)}/>
                    </div>
                    
                </div>
                {/*can possibly have a forgot password button here*/}
                <div className="submit-container">
                    <button type="submit">Login</button>
                </div>     
            </form>
            <div className="sign-up">
                <p>Haven't created an account? Sign up <Link to="/sign-up">here</Link></p>
            </div>
        </div>
  )
}

export default Login
