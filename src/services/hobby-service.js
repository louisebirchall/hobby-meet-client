import axios from "axios";

class HobbyService {
  constructor() {
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_API_HOST}/hobbies`,
      withCredentials: true,
    });
  }

  create = (name, typeOfActivity, description, hobbyImage, placeOfActivity) => {
    return this.service.post("/create", {
      name,
      typeOfActivity,
      description,
      hobbyImage,
      placeOfActivity,
    });
  };

  edit = (
    id,
    name,
    typeOfActivity,
    description,
    hobbyImage,
    placeOfActivity
  ) => {
    return (
      this.service.patch(`/${id}`),
      { name, typeOfActivity, description, hobbyImage, placeOfActivity }
    );
  };

  getHobby = (id) => {
    return this.service.get(`/${id}`);
  };
}

const hobbyService = new HobbyService();
export default hobbyService;
