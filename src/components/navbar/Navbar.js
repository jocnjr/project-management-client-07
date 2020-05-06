// components/navbar/Navbar.js

import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-menu">
        <div className="navbar-start">
          <Link to="/projects">Projects</Link>
          <Link to="/signup">Signup</Link>
        </div>
      </div>
      {/* <div className="navbar-end">
        <div className="navbar-item">Welcome, {username}</div>
        <div className="navbar-item">
          <button className="button is-small" onClick={logoutUser}>
            Logout
          </button>
        </div>
      </div> */}
    </nav>
  );
};

export default Navbar;
