import React, {useState} from 'react';
import "./loginSignup.css";

import user_icon from '../Assets/user_icon.png';
import email_icon from '../Assets/email_icon.png';
import password_icon from '../Assets/password_icon.png';

const LoginSignup = () => {
    let [action, setAction] = useState("Sign up");
    return (  
        <div className="container">
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                {action==="Login"?<div></div>:<div className="input">
                    <img src={user_icon} alt="user_icon"/>
                    <input type="text" placeholder="Name"/>
                </div>}                
                <div className="input">
                    <img src={email_icon} alt="email_icon"/>
                    <input type="email" placeholder="email@domain.com" />
                </div>
                
                <div className="input">
                    <img src={password_icon} alt="password_icon"/>
                    <input type="password" placeholder="Password"/>
                </div>
            </div>
            {action==="Sign up"?<div></div>:<div className="forgot-password"><span>Forgot Password</span></div>}
            <div className="submit-container">
                <div className={action==="Login"?"submit gray":"submit"} onClick={()=>{setAction("Sign up")}}>Sign up</div>
                <div className={action==="Sign up"?"submit gray":"submit"} onClick={()=>{setAction("Login")}}>Login</div>
            </div>

        </div>
  );
};

export default LoginSignup;