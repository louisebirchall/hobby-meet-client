import axios from "axios";

class EventService {
  constructor() {
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_API_HOST}/events`,
      withCredentials: true,
    });
  }

  create = (
    image,
    title,
    description,
    equipment,
    date,
      user_id,
      attendees,
    attendees_max,
    attendees_min,
    pricePolicy,
    price,
    location,
    organizedBy
    //charity_id
  ) => {
    return this.service.post("/create", {
      image,
      title,
      description,
      equipment,
      date,
      user_id,
      attendees,
      attendees_max,
      attendees_min,
      pricePolicy,
      price,
      location,
      organizedBy,
      // charity_id,
    });
  };

  edit = (
    id,
    image,
    title,
    description,
    equipment,
    date,
    user_id,
    attendees,
    attendees_max,
    attendees_min,
    pricePolicy,
    price,
    location,
    organizedBy
    // charity_id
  ) => {
    return this.service.patch(`/${id}`, {
      image,
      title,
      description,
      equipment,
      date,
      user_id,
      attendees,
      attendees_max,
      attendees_min,
      pricePolicy,
      price,
      location,
      organizedBy,
      //charity_id,
    });
  };

  delete = (id) => {
    return this.service.delete(`/${id}`);
  };

  getEvent = (id) => {
    return this.service.get(`/${id}`);
  };

  getEvents = () => {
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

  attend = (id) => {
    return this.service.post(`/${id}/attend`);
  };

  random = (number) => {
    return this.service.get(`/random/${number}`);
  };
}

const eventService = new EventService();
export default eventService;
