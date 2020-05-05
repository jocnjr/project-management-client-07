// components/tasks/TaskDetails.js

import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class TaskDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getTheTask = this.getTheTask.bind(this);
  }

  componentDidMount() {
    this.getTheTask();
  }

  getTheTask() {
    const { params } = this.props.match;
    axios
      .get(
        `http://localhost:5000/api/projects/${params.id}/tasks/${params.taskId}`
      )
      .then((responseFromApi) => {
        const theTask = responseFromApi.data;
        this.setState(theTask);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        {this.state.project && (
          <>
            <h1>{this.state.title}</h1>
            <p>{this.state.description}</p>
            <Link to={`/projects/${this.state.project._id}`}>
              Back to project
            </Link>
          </>
        )}
      </div>
    );
  }
}

export default TaskDetails;
