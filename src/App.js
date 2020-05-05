import React, { Component } from "react";
import "./App.css";
import ProjectList from "./components/projects/ProjectList";
import Navbar from "./components/navbar/Navbar";
import { Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Route exact path="/projects" component={ProjectList} />
      </div>
    );
  }
}

export default App;
