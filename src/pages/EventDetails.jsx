import { useParams, Link, useNavigate } from "react-router-dom";
import "./EventDetails.css";
import { useState } from "react";

const EventDetails = ({ events }) => {
  const { id } = useParams();
  const event = events.find((e) => e.id === id || e.id === parseInt(id));
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState([]);

  if (!event) {
    return (
      <div className="container">
        <div className="event-not-found">
          <h2>Event Not Found</h2>
          <p>The event you're looking for doesn't exist.</p>
          <Link to="/" className="btn">
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleSeatSelection = (seatIndex) => {
    if (event.bookedSeats[seatIndex]) return; // Can't select already booked seat

    setSelectedSeats((prev) => {
      if (prev.includes(seatIndex)) {
        return prev.filter((i) => i !== seatIndex);
      } else {
        return [...prev, seatIndex];
      }
    });
  };

  const handleBookTicket = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat");
      return;
    }

    // In a real app, you would send this data to your backend
    // For now, we'll just navigate to payment
    navigate(`/payment/${event.id}`, {
      state: {
        event,
        selectedSeats,
        totalPrice: selectedSeats.length * event.price,
      },
    });
  };

  // Render seat layout
  const renderSeats = () => {
    const seats = [];
    const seatsPerRow = 10;
    const totalRows = Math.ceil(event.totalSeats / seatsPerRow);

    for (let row = 0; row < totalRows; row++) {
      const rowSeats = [];
      for (let col = 0; col < seatsPerRow; col++) {
        const seatIndex = row * seatsPerRow + col;
        if (seatIndex >= event.totalSeats) break;

        const isBooked = event.bookedSeats[seatIndex];
        const isSelected = selectedSeats.includes(seatIndex);

        rowSeats.push(
          <div
            key={seatIndex}
            className={`seat ${isBooked ? "booked" : ""} ${
              isSelected ? "selected" : ""
            }`}
            onClick={() => !isBooked && handleSeatSelection(seatIndex)}
          >
            {seatIndex + 1}
          </div>
        );
      }
      seats.push(
        <div key={row} className="seat-row">
          {rowSeats}
        </div>
      );
    }

    return seats;
  };

  return (
    <div className="event-details-page">
      <div className="container">
        <Link to="/" className="back-link">
          ← Back to Events
        </Link>

        <div className="event-details-grid">
          <div className="event-main">
            <div className="event-header">
              <img
                src={event.image}
                alt={event.name}
                className="event-image1"
              />
              <div className="event-meta">
                <span className="event-type1">{event.type}</span>
                <h1>{event.name}</h1>
                <p>
                  📅 {formatDate(event.date)} at {event.time}
                </p>
                <p>📍 {event.location}</p>
                <p>👤 Organized by {event.organizer}</p>
                <p>💰 ${event.price} per ticket</p>
                <p>
                  🎟️ Available {event.availableSeats} seat / {event.totalSeats}{" "}
                </p>
              </div>
            </div>

            <div className="event-section">
              <h2>Select Your Seats</h2>
              <div className="seats-container">
                <div className="seats-layout">{renderSeats()}</div>
                <div className="seat-legend">
                  <div className="legend-item">
                    <div className="seat available"></div>
                    <span>Available</span>
                  </div>
                  <div className="legend-item">
                    <div className="seat selected"></div>
                    <span>Selected</span>
                  </div>
                  <div className="legend-item">
                    <div className="seat booked"></div>
                    <span>Booked</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="event-section">
              <h2>About This Event</h2>
              <p>{event.description}</p>
            </div>

            <div className="event-section">
              <h2>Participants</h2>
              <div className="participants-grid">
                {event.participants.map((p, i) => (
                  <div key={i} className="participant-card">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="participant-image"
                    />
                    <div className="participant-info">
                      <h4>Name : {p.name}</h4>
                      <p>Character : {p.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="event-section">
              <h2>Schedule</h2>
              <ul className="schedule-list">
                {event.schedule.map((s, idx) => (
                  <li key={idx}>{s}</li>
                ))}
              </ul>
            </div>

            <div className="event-section">
              <h2>Venue Location</h2>
              <div style={{ marginTop: "10px", textAlign: "center" }}>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    event.location
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="google-map"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
            
          </div>

          <div className="event-booking">
            <div className="booking-card">
              <h2>Booking Summary</h2>
              <p className="ticket-info">
                Selected Seats: {selectedSeats.length}
              </p>
              <p className="ticket-info">Price per ticket:₹ {event.price}</p>
              <p className="ticket-info">
                Total: ₹{selectedSeats.length * event.price}
              </p>
              <button
                className="book-btn"
                onClick={handleBookTicket}
                disabled={selectedSeats.length === 0}
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
