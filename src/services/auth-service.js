import axios from "axios";

class AuthService {
  constructor() {
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_API_HOST}/auth`,
      withCredentials: true,
    });
  }

  signup = (username, email, password) => {
    return this.service.post(
      "/signup",
      { username, email, password },
      { withCredentials: true }
    );
  };

  login = (username, password) => {
    console.log("logging");
    return this.service.post("/login", { username, password });
  };

  logout = () => {
    return this.service.post("/logout");
  };

  loggedin = () => {
    return this.service.get("/loggedin", { withCredentials: true });
  };

}

const authService = new AuthService();
export default authService;
