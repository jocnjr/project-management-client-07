// components/tasks/AddTask.js

import React, { Component } from "react";
import axios from "axios";

class AddTask extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "", description: "", isShowing: false };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.showAddTaskForm = this.showAddTaskForm.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const title = this.state.title;
    const description = this.state.description;
    const projectID = this.props.theProject._id; // <== we need to know to which project the created task belong, so we need to get its 'id'
    // it has to be the 'id' because we are referencing project
    // by its id in the task model on the server side ( project: {type: Schema.Types.ObjectId, ref: 'Project'})

    // { title, description, projectID } => this is 'req.body' that will be received on the server side in this route,
    // so the names have to match
    axios
      .post(
        "http://localhost:5000/api/tasks",
        {
          title,
          description,
          projectID,
        },
        { withCredentials: true }
      )
      .then(() => {
        // after submitting the form, retrieve project one more time so the new task is displayed as well
        //              |
        this.props.getTheProject();
        this.setState({ title: "", description: "" });
      })
      .catch((error) => console.log(error));
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  toggleForm() {
    this.setState((prevState) => {
      return {
        isShowing: !prevState.isShowing,
      };
    });
  }

  showAddTaskForm() {
    if (this.state.isShowing) {
      return (
        <div className="section">
          <h3 className="title is-3">Add Task</h3>
          <form onSubmit={this.handleFormSubmit}>
            <div className="field">
              <div className="control">
                <label className="label">Title</label>
                <input
                  className="input is-small"
                  type="text"
                  name="title"
                  value={this.state.title}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <label className="label">Description</label>
                <textarea
                  className="textarea"
                  name="description"
                  value={this.state.description}
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <input className="button" type="submit" value="Submit" />
          </form>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <hr />
        <button className="button" onClick={() => this.toggleForm()}>
          Add task
        </button>
        {this.showAddTaskForm()}
      </div>
    );
  }
}

export default AddTask;
