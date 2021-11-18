import axios from "axios";


class UserService {
  constructor() {
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_API_HOST}/auth/profile`,
      withCredentials: true,
    });
  }

  create = (
    id,
    fullName,
    profileImage,
    sex,
    age,
    hobbies,
    typeOfUser
  ) => {
    return this.service.post(`/${id}`, {
      fullName,
      profileImage,
      sex,
      age,
      hobbies,
      typeOfUser
    });
  };


  edit = (
    id,
    username,
    email,
    fullName,
    profileImage,
    sex,
    age,
    hobbies,
    typeOfUser
  ) => {
    return (
      this.service.patch(`/${id}/edit`),
      {
        username,
        email,
        fullName,
        profileImage,
        sex,
        age,
        hobbies,
        typeOfUser,
      }
    );
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
