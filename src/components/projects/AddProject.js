// components/projects/AddProject.js

import React, { Component } from "react";
import axios from "axios";

class AddProject extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "", description: "", imageUrl: "", originalName: "" };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
  }

  handleFormSubmit(event) {
    event.preventDefault();

    const { title, description, imageUrl } = this.state;

    axios
      .post(
        "http://localhost:5000/api/projects",
        { title, description, imageUrl },
        { withCredentials: true }
      )
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

  handleFileChange(event) {
    const uploadData = new FormData();

    uploadData.append("imageUrl", event.target.files[0]);
    // console.log(uploadData);

    axios
      .post("http://localhost:5000/api/upload", uploadData)
      .then((response) =>
        this.setState({
          imageUrl: response.data.secure_url,
          originalName: response.data.originalName,
        })
      )
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <div className="section">
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
          <div className="file has-name is-boxed">
            <label className="file-label">
              <input
                className="file-input"
                type="file"
                name="imageUrl"
                onChange={this.handleFileChange}
              />
              <span className="file-cta">
                <span className="file-icon">
                  <i className="fas fa-upload"></i>
                </span>
                <span className="file-label">Choose a file…</span>
              </span>
              <span className="file-name">
                {this.state.originalName && this.state.originalName}
              </span>
            </label>
          </div>
          <input className="button" type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default AddProject;
