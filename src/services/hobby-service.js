import axios from "axios";

class HobbyService {
  constructor() {
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_API_HOST}/hobbies`,
      withCredentials: true,
    });
  }

  create = (name, typeOfActivity, description, placeOfActivity, image) => {
    return this.service.post("/create", {
      name, 
      typeOfActivity, 
      description, 
      placeOfActivity, 
      image
    });
  };

  edit = (id, name, typeOfActivity, description, placeOfActivity, image) => {
    return this.service.patch(`/${id}`, {
      name, 
      typeOfActivity, 
      description, 
      placeOfActivity, 
      image
      })
  };

  delete = (id) => {
    return this.service.delete(`/${id}`);
  };

  getHobby = (id) => {
    return this.service.get(`/${id}`);
  };

  getHobbies = () => {
    return this.service.get();
  };

  createPost = (id, description, image) => {
    return this.service.post(`/${id}/posts/create`, {
      description,
      image,
    });
  };
}

const hobbyService = new HobbyService();
export default hobbyService;
