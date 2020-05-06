// auth/auth-service.js

import axios from "axios";

class AuthService {
  constructor() {
    this.service = axios.create({
      baseURL: "http://localhost:5000/api",
      withCredentials: true,
    });
  }

  signup(username, password) {
    return this.service
      .post("/signup", { username, password })
      .then((response) => response.data);
  }
}

export default AuthService;
