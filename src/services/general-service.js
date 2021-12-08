import axios from "axios";


// generalService
class GeneralService {
  constructor() {
    this.service = axios.create({
      baseURL: process.env.REACT_APP_API_HOST,
      withCredentials: true,
    });
  }

  upload = (data) => {
    return this.service.post("/upload", data);
  };

  search = (search, type) => {
    return this.service.get("/search", {params: {search, type}});
  };

}

const generalService = new GeneralService();
export default generalService;

