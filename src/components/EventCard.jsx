import { Link } from "react-router-dom";
import "../style/main/EventCard.css";

const EventCard = ({ event }) => {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getEventTypeIcon = (type) => {
    switch (type) {
      case "dance":
        return "💃";
      case "singing":
        return "🎤";
      case "magic":
        return "🎩";
      default:
        return "🎭";
    }
  };

  return (
    <div className="event-card">
      <div className="event-image">
        <img src={event.image} />
        <div className="event-type">
          {getEventTypeIcon(event.type)} {event.type}
        </div>
      </div>

      <div className="event-content">
        <h3 className="event-title">{event.name}</h3>
        <p className="event-date">
          <span className="icon">📅</span>
          {formatDate(event.date)} at {event.time}
        </p>
        <p className="event-location">
          <span className="location-text">Location 📍</span>
          {event.location}
        </p>
        <p className="event-organizer">
          <span className="icon">👤</span>
          Organized by {event.organizer}
        </p>
        <p className="event-seats">
          🎟️ Total Seats:{" "}
          <span style={{ color: "yellow" }}>{event.totalSeats}</span>
        </p>
        <p className="event-seats">
          🪑 Available Seats:{" "}
          <span style={{ color: event.availableSeats === 0 ? "red" : "green" }}>
            {event.availableSeats === 0
              ? "Ticket Already Sold"
              : event.availableSeats}
          </span>
        </p>

        <div className="event-footer">
          <span className="event-price">Price : &#8377;{event.price}.00</span>
          <Link to={`/event/${event.id}`} className="btn">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
