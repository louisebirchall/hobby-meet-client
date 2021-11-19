import axios from "axios";

class SearchService {
    constructor() {
      this.service = axios.create({
        baseURL: `${process.env.REACT_APP_API_HOST}/search`,
        withCredentials: true,
      });
    }
}
const searchService = new SearchService();
export default searchService;