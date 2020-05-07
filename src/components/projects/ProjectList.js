// components/projects/ProjectList.js

import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import AddProject from "./AddProject";

class ProjectList extends Component {
  constructor(props) {
    super(props);
    this.state = { listOfProjects: [] };
    this.getAllProjects = this.getAllProjects.bind(this);
  }

  getAllProjects() {
    axios
      .get(`http://localhost:5000/api/projects`, { withCredentials: true })
      .then((responseFromApi) => {
        this.setState({
          listOfProjects: responseFromApi.data,
        });
      });
  }

  componentDidMount() {
    this.getAllProjects();
  }

  render() {
    return (
      <div>
        <div style={{ width: "60%", float: "left" }}>
          {this.state.listOfProjects.map((project) => {
            return (
              <div key={project._id}>
                <h3 className="title is-2">
                  <Link to={`/projects/${project._id}`}>{project.title}</Link>
                </h3>
                <p className="content" style={{ maxWidth: "400px" }}>
                  {project.description}{" "}
                </p>
                <ul className="section">
                  {project.tasks.length > 0 && (
                    <>
                      <h5 className="title is-5">tasks</h5>
                      {project.tasks.map((task, index) => {
                        return (
                          <li key={index} className="subtitle is-5">
                            <Link
                              to={`/projects/${project._id}/tasks/${task._id}`}
                            >
                              {task.title}
                            </Link>
                          </li>
                        );
                      })}
                    </>
                  )}
                </ul>
              </div>
            );
          })}
        </div>
        <div style={{ width: "40%", float: "right" }}>
          <AddProject getData={this.getAllProjects} />
        </div>
      </div>
    );
  }
}

export default ProjectList;
