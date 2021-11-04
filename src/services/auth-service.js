import axios from "axios";

class AuthService {
  constructor() {
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_API_HOST}/auth`,
      withCredentials: true,
    });
  }

  signup = (username, password) => {
    return this.service.post("/signup", { username, password });
  };

  login = (username, password) => {
    return this.service.post("/login", { username, password });
  };

  logout = (username, password) => {
    return this.service.post("/logout");
  };

  loggedin = () => {
    return this.service.get("/loggedin", { withCredentials: true });
  };
}

const authService = new AuthService();
export default authService;
