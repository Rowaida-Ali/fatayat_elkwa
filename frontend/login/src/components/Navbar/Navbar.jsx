import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="name">StudyPuffs</div>
      <ul className="navbar-links">
        <li><Link to="/Home">Home</Link></li>
        <li><Link to="/aboutpage">About</Link></li>
        <li><Link to="todo">Todo</Link></li>
        <li><Link to="/notes">Notes</Link></li>
        <li><Link to="/studyabroad">Study Abroad</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;

