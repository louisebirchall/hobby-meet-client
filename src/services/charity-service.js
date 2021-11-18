import axios from "axios";

class CharityService {
  constructor() {
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_API_HOST}/charities`,
      withCredentials: true,
    });
  }

  create = (name, description, image) => {
    return this.service.post("/create", {
      name,
      description,
      image,
    });
  };

  edit = (id, name, description, image) => {
    return this.service.patch(`/${id}/edit`, {
      name,
      description,
      image,
    });
  };

  delete = (id) => {
    return this.service.delete(`${id}`);
  };

  getCharity = (id) => {
    return this.service.get(`/${id}`);
  };

  getCharities = () => {
    return this.service.get();
  };

  createPost = (id, description, image) => {
    return this.service.post(`/${id}/posts/create`, {
      description,
      image,
    });
  };

  createReview = (id, likes) => {
    return this.service.post(`/${id}/reviews/create`, {
      likes,
    });
  };
  
}

const charityService = new CharityService();
export default charityService;
