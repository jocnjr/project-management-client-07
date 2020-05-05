import React, { Component } from "react";
import "./App.css";
import ProjectList from "./components/projects/ProjectList";
import Navbar from "./components/navbar/Navbar";
import { Route, Switch } from "react-router-dom";
import ProjectDetails from "./components/projects/ProjectDetails";
import TaskDetails from "./components/tasks/TaskDetails";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/projects" component={ProjectList} />
          <Route exact path="/projects/:projectId" component={ProjectDetails} />
          <Route
            exact
            path="/projects/:projectId/tasks/:taskId"
            component={TaskDetails}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
