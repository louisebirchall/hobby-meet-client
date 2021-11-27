import axios from "axios";


class PostService {
  constructor() {
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_API_HOST}/posts`,
      withCredentials: true,
    });
  }
  

  create = (image, description) => {
    return  this.service.post("/create", { image, description, })};

  edit = (id, image, description) => {
    return  this.service.patch(`/${id}/edit`, { id, image, description })};

  delete = (id) => {
    return this.service.delete(`${id}`);
  };

  // for the specific post (id)
  getPost = (id) => {
    return this.service.get(`${id}`);
  };

  // for the list of posts (for example inside the profile)
  getPosts = () => {
    return this.service.get();
  };
}

const postService = new PostService();
export default postService;