// auth/Signup.js

import React, { Component } from "react";
import AuthService from "./auth-service";
import { Link } from "react-router-dom";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errorMsgUsername: null,
      errorMsgPassword: null,
    };
    this.service = new AuthService();
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

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
          errorMsgUsername: null,
          errorMsgPassword: null,
        });
        console.log(response);
        this.props.getUser(response);
        this.props.history.push("/projects");
      })
      .catch((error) => {
        const { message } = error.response.data;
        message.includes("password")
          ? this.setState({
              errorMsgPassword: message,
            })
          : this.setState({
              errorMsgUsername: message,
            });
        console.log(message);
      });
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
              <label className="label">Username</label>
              <input
                className="input is-small"
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
              />
            </div>
            {this.state.errorMsgUsername && (
              <p className="help is-danger">{this.state.errorMsgUsername}</p>
            )}
          </div>
          <div className="field">
            <div className="control">
              <label className="label">Password</label>
              <input
                className="input is-small"
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </div>
            {this.state.errorMsgPassword && (
              <p className="help is-danger">{this.state.errorMsgPassword}</p>
            )}
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
