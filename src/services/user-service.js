import axios from "axios";


class UserService {
  constructor() {
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_API_HOST}/auth/profiles`,
      withCredentials: true,
    });
  }


  edit = (
    id,
    username,
    email,
    fullName,
    image,
    sex,
    age,
    type,
    hobbies,
  ) => {
    return this.service.patch(`/${id}`, {
        username,
        email,
        fullName,
        image,
        sex,
        age,
        type,
        hobbies,
      })
  };

  delete = (id) => {
    return this.service.delete(`${id}`);
  };

  getUser = (id) => {
    return this.service.get(`/${id}`);
  };

  getUsers = () => {
    return this.service.get();
  };
}

const userService = new UserService();
export default userService;
