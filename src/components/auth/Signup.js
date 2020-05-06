// auth/Signup.js

import React, { Component } from "react";
import AuthService from "./auth-service";
import { Link } from "react-router-dom";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
    this.service = new AuthService();
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // handleChange() and handleSubmit() will be added here

  handleFormSubmit(event) {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    this.service
      .signup(username, password)
      .then((response) => {
        this.setState({
          username: "",
          password: "",
        });
        console.log(response);
        // this.props.getUser(response)
      })
      .catch((error) => console.log(error));
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div className="section">
        <form onSubmit={this.handleFormSubmit}>
          <div className="field">
            <div className="control">
              <label>Username:</label>
              <input
                className="input is-small"
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label>Password:</label>
              <input
                className="input is-small"
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <input className="button" type="submit" value="Signup" />
        </form>
        <p>
          Already have account?
          <Link to={"/"}> Login</Link>
        </p>
      </div>
    );
  }
}

export default Signup;
