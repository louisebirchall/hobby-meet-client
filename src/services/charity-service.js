import axios from "axios";

class CharityService {
  constructor() {
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_API_HOST}/charities`,
      withCredentials: true,
    });
  }

  create = (name, description, image, post_id, review_id) => {
    return this.service.post("/create", {
      name,
      description,
      image,
      post_id,
      review_id,
    });
  };

  edit = (id, name, description, image, post_id, review_id) => {
    return (
      this.service.patch(`/${id}/edit`),
      { name, description, image, post_id, review_id }
    );
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
}

const charityService = new CharityService();
export default charityService;
