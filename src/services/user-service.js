import axios from "axios";

class UserService {
  constructor() {
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_API_HOST}/user`, // what route as user is created in auth
      withCredentials: true,
    });
  }

  //   create = (name, typeOfActivity, description, hobbyImage, placeOfActivity) => {
  //     return this.service.post("/create", {
  //       name,
  //       typeOfActivity,
  //       description,
  //       hobbyImage,
  //       placeOfActivity,
  //     });
  //   };

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
      this.service.patch(`/${id}`),
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
