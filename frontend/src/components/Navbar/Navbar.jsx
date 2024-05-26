import React, {useState} from 'react'
import {NavLink, Link} from 'react-router-dom';
import "./Navbar.css";

export const Navbar = () => {
    let [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav>
            <Link to="/" className="title">ScheduleSync</Link>
            <div className="menu" onClick={() => {setMenuOpen(!menuOpen)}}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <ul className={menuOpen?"open":""}>
                <li>
                    <NavLink to="/my-schedule">My Schedule</NavLink>
                </li>
                <li>
                    <NavLink to="/my-collaborations">My Collaborations</NavLink>
                </li>
                <li>
                    <NavLink to="my-account">My Account</NavLink>
                </li>
            </ul>
        </nav>
  )
}