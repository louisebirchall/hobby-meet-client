import React, { Component } from "react";
import { Link } from "react-router-dom";
import eventService from "../../services/event-service";

class EventsPage extends Component {
  state = {
    listOfEvents: null,
    isLoading: true,
  };

  componentDidMount() {
    // console.log(process.env.REACT_APP_SERVER_API);
    eventService.getEvents()
      .then((response) => {
        this.setState({ listOfEvents: response.data, isLoading: false });
      })
      .catch((err) => {
        // this.props.history.push("/500");
      });
  }

  render() {
    const { listOfEvents, isLoading } = this.state;

    return (
      <div>
        <h1>All The Events</h1>

        {isLoading && <h1>...isLoading</h1>}

        {!isLoading &&
          listOfEvents.map((eachEvent) => {
            return (
              <div key={eachEvent._id}>
                <Link to={`/events/${eachEvent._id}`}>{eachEvent.title}</Link>
              </div>
            );
          })}
      </div>
    );
  }
}

export default EventsPage;
