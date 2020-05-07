import React, { Component } from "react";
import "./App.css";
import ProjectList from "./components/projects/ProjectList";
import Navbar from "./components/navbar/Navbar";
import { Route, Switch } from "react-router-dom";
import ProjectDetails from "./components/projects/ProjectDetails";
import TaskDetails from "./components/tasks/TaskDetails";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import AuthService from "./components/auth/auth-service";
import ProtectedRoute from "./components/auth/protected-routes";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: null };
    this.service = new AuthService();

    this.getTheUser = this.getTheUser.bind(this);
    // this.fetchUser = this.fetchUser.bind(this);
  }

  // componentDidMount() {
  //   this.fetchUser();
  // }

  // componentDidUpdate() {
  //   this.fetchUser();
  // }

  fetchUser() {
    // console.log("inside fetchUser");
    if (this.state.loggedInUser === null) {
      // console.log("NULL inside fetchUser");
      this.service
        .loggedin()
        .then((response) => {
          // console.log("SUCCESS inside fetchUser");

          this.setState({
            loggedInUser: response,
          });
        })
        .catch((err) => {
          // console.log("ERROR inside fetchUser");

          this.setState({
            loggedInUser: false,
          });
        });
    }
  }

  getTheUser(userObj) {
    this.setState({
      loggedInUser: userObj,
    });
  }

  render() {
    this.fetchUser();
    if (this.state.loggedInUser) {
      return (
        <div className="section">
          <Navbar
            userInSession={this.state.loggedInUser}
            getUser={this.getTheUser}
          />
          <div className="container">
            <Switch>
              <ProtectedRoute
                exact
                user={this.state.loggedInUser}
                path="/projects/:id"
                component={ProjectDetails}
              />
              <ProtectedRoute
                exact
                user={this.state.loggedInUser}
                path="/projects"
                component={ProjectList}
              />
              <ProtectedRoute
                user={this.state.loggedInUser}
                exact
                path="/projects/:id/tasks/:taskId"
                component={TaskDetails}
              />
            </Switch>
          </div>
        </div>
      );
    } else {
      return (
        <div className="section">
          <Navbar
            userInSession={this.state.loggedInUser}
            getUser={this.getTheUser}
          />
          <div className="container">
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => (
                  <Login getUser={this.getTheUser} {...props} />
                )}
              />
              <Route
                exact
                path="/signup"
                render={(props) => (
                  <Signup getUser={this.getTheUser} {...props} />
                )}
              />
              <ProtectedRoute
                exact
                user={this.state.loggedInUser}
                path="/projects/:id"
                component={ProjectDetails}
              />
              <ProtectedRoute
                exact
                user={this.state.loggedInUser}
                path="/projects"
                component={ProjectList}
              />
              <ProtectedRoute
                user={this.state.loggedInUser}
                exact
                path="/projects/:id/tasks/:taskId"
                component={TaskDetails}
              />
            </Switch>
          </div>
        </div>
      );
    }
  }
}

export default App;
