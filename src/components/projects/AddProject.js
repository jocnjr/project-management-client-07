// components/projects/AddProject.js

import React, { Component } from "react";
import axios from "axios";

class AddProject extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "", description: "" };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleFormSubmit(event) {
    event.preventDefault();
    console.log("inside add project form submit");
    const title = this.state.title;
    const description = this.state.description;
    axios
      .post("http://localhost:5000/api/projects", { title, description })
      .then(() => {
        this.props.getData();
        this.setState({ title: "", description: "" });
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
              <label>Title:</label>
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
              <label>Description:</label>
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

export default AddProject;
