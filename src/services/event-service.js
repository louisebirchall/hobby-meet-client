import axios from "axios";

class EventService {
  constructor() {
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_API_HOST}/events`,
      withCredentials: true,
    });
  }

  create = (
    eventImage,
    title,
    description,
    equipment,
    date,
    owner_id,
    attendees,
    attendees_max,
    attendees_min,
    pricePolicy,
    price,
    location,
    organizedBy,
    charity_id
  ) => {
    return this.service.post("/create", {
      eventImage,
      title,
      description,
      equipment,
      date,
      owner_id,
      attendees,
      attendees_max,
      attendees_min,
      pricePolicy,
      price,
      location,
      organizedBy,
      charity_id,
    });
  };

  edit = (
    id,
    eventImage,
    title,
    description,
    equipment,
    date,
    owner_id,
    attendees,
    attendees_max,
    attendees_min,
    pricePolicy,
    price,
    location,
    organizedBy,
    charity_id
  ) => {
    return (
      this.service.patch(`/${id}/edit`),
      {
        eventImage,
        title,
        description,
        equipment,
        date,
        owner_id,
        attendees,
        attendees_max,
        attendees_min,
        pricePolicy,
        price,
        location,
        organizedBy,
        charity_id,
      }
    );
  };

  delete = (id) => {
    return this.service.delete(`${id}`);
  };

  getEvent = (id) => {
    return this.service.get(`/${id}`);
  };

  getEvents = () => {
    return this.service.get();
  };
}

const eventService = new EventService();
export default eventService;
