import axios from "axios";

// needs sth like a counter that show the amount of likes
// but this will be needed in the actual "form" => AddReviewForm

class ReviewService {
  constructor() {
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_API_HOST}/reviews`,
      withCredentials: true,
    });
  }

  // for "creating" a like

  create = (comment, likes, dislikes) => {
    return (
      this.service.post("/create"), // maybe better /like?
      {
        comment,
        likes,
        dislikes,
      }
    );
  };

  // only editing or deleting a like necessary? to discuss!

  edit = (id, comment, likes, dislikes) => {
    return (
      this.service.patch(`/${id}/edit`),
      {
        id,
        comment,
        likes,
        dislikes,
      }
    );
  };

  delete = (id) => {
    return this.service.delete(`${id}`);
  };

  // to see the given (dis)likes below reviewed details:

  getReview = (id) => {
    return this.service.get(`${id}`);
  };

  getReviews = () => {
    return this.service.get();
  };
}

const reviewService = new ReviewService();
export default reviewService;
