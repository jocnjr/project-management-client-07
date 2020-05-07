// components/navbar/Navbar.js

import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import AuthService from "../auth/auth-service";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: null };
    this.service = new AuthService();
    this.logoutUser = this.logoutUser.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.userInSession !== prevProps.userInSession) {
      this.setState({ loggedInUser: this.props.userInSession });
    }
  }

  logoutUser() {
    this.service.logout().then(() => {
      this.setState({ loggedInUser: null });
      this.props.getUser(null);
    });
  }

  render() {
    if (this.state.loggedInUser) {
      return (
        <nav
          className="navbar is-fixed-top is-mobile"
          role="navigation"
          aria-label="main navigation"
        >
          <div className="navbar-menu">
            <div className="navbar-start">
              <NavLink
                className="navbar-item"
                activeClassName="is-active"
                to="/projects"
              >
                Projects
              </NavLink>
            </div>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              Welcome, {this.state.loggedInUser.username}
            </div>
            <div className="navbar-item">
              <button className="button is-small" onClick={this.logoutUser}>
                Logout
              </button>
            </div>
          </div>
        </nav>
      );
    } else {
      return (
        <nav
          className="navbar is-fixed-top is-mobile"
          role="navigation"
          aria-label="main navigation"
        >
          <div className="navbar-menu">
            <div className="navbar-start">
              <NavLink
                className="navbar-item"
                activeClassName="is-active"
                to="/"
              >
                Login
              </NavLink>
              <NavLink
                className="navbar-item"
                activeClassName="is-active"
                to="/signup"
              >
                Signup
              </NavLink>
            </div>
          </div>
        </nav>
      );
    }
  }
}

export default Navbar;
