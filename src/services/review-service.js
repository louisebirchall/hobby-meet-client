import axios from "axios";

class ReviewService {
  constructor() {
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_API_HOST}/reviews`,
      withCredentials: true,
    });
  }
}


const reviewService = new ReviewService();
export default reviewService;