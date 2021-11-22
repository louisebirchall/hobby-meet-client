import axios from "axios";

class ProductService {
  constructor() {
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_API_HOST}/products`,
      withCredentials: true,
    });
  }

  create = (title, image, description, pricePolicy, price) => {
    return this.service.post("/create", {
      title,
      image,
      description,
      pricePolicy,
      price,
    });
  };

  edit = (id, title, image, description, pricePolicy, price) => {
    return this.service.patch(`/${id}`, {
      title,
      image,
      description,
      pricePolicy,
      price,
    });
  };

  delete = (id) => {
    return this.service.delete(`/${id}`);
  };

  getProduct = (id) => {
    return this.service.get(`/${id}`);
  };

  getProducts = () => {
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
const productService = new ProductService();
export default productService;
