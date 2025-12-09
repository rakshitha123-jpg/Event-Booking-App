import { useState, useEffect } from "react";
import "../style/main/ClientPage.css";

const ClientPage = () => {
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem("events");
    return savedEvents ? JSON.parse(savedEvents) : [];
  });

  const [currentEvent, setCurrentEvent] = useState({
    id: "",
    name: "",
    type: "",
    date: "",
    time: "",
    location: "",
    organizer: "",
    price: "",
    totalSeats: "",
    description: "",
    schedule: [],
    participants: [],
    image: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [scheduleInput, setScheduleInput] = useState("");
  const [participantInput, setParticipantInput] = useState({
    name: "",
    role: "",
    image: "",
  });

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    if (currentEvent.totalSeats && !currentEvent.availableSeats) {
      setCurrentEvent(prev => ({
        ...prev,
        availableSeats: prev.totalSeats,
        bookedSeats: Array(parseInt(prev.totalSeats)).fill(false)
      }));
    }
  }, [currentEvent.totalSeats]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentEvent(prev => {
      if (name === "totalSeats") {
        const total = parseInt(value) || 0;
        return {
          ...prev,
          totalSeats: value,
          availableSeats: value,
          bookedSeats: Array(total).fill(false)
        };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleAddSchedule = () => {
    if (scheduleInput.trim() !== "") {
      setCurrentEvent({
        ...currentEvent,
        schedule: [...currentEvent.schedule, scheduleInput],
      });
      setScheduleInput("");
    }
  };

  const handleAddParticipant = () => {
    if (participantInput.name.trim() !== "") {
      setCurrentEvent({
        ...currentEvent,
        participants: [...currentEvent.participants, participantInput],
      });
      setParticipantInput({ name: "", role: "", image: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setEvents(
        events.map((ev) => (ev.id === currentEvent.id ? currentEvent : ev))
      );
      setIsEditing(false);
    } else {
      if (events.length >= 10) {
        alert(" You can only store a maximum of 10 events.");
        return;
      }
      const newEvent = {
        ...currentEvent,
        availableSeats: currentEvent.totalSeats,
        bookedSeats: Array(parseInt(currentEvent.totalSeats || 0)).fill(false)
      };
      setEvents([...events, newEvent]);
    }
    setCurrentEvent({
      id: "",
      name: "",
      type: "",
      date: "",
      time: "",
      location: "",
      organizer: "",
      price: "",
      totalSeats: "",
      availableSeats: "",
      description: "",
      schedule: [],
      participants: [],
      image: "",
      bookedSeats: [],
    });
  };

  const handleEdit = (event) => {
    setCurrentEvent(event);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      setEvents(events.filter((ev) => ev.id !== id));
    }
  };
  return (
    <div className="page-container">
      <div className="left-section">
        <h2>{isEditing ? "Edit Event" : "Add Event"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            name="id"
            placeholder="ID"
            value={currentEvent.id}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="name"
            placeholder="Event Name"
            value={currentEvent.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="type"
            placeholder="Type"
            value={currentEvent.type}
            onChange={handleChange}
          />
          <input
            type="date"
            name="date"
            value={currentEvent.date}
            onChange={handleChange}
          />
          <input
            
            name="time"
            placeholder="Time"
            value={currentEvent.time}
            onChange={handleChange}
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={currentEvent.location}
            onChange={handleChange}
          />
          <input
            type="text"
            name="organizer"
            placeholder="Organizer"
            value={currentEvent.organizer}
            onChange={handleChange}
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={currentEvent.price}
             min={0}
            onChange={handleChange}
          />
          <input
            type="number"
            name="totalSeats"
            placeholder="Total Seats"
            value={currentEvent.totalSeats}
            onChange={handleChange}
             min={0}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={currentEvent.description}
            onChange={handleChange}
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={currentEvent.image}
            onChange={handleChange}
          />

          {/* Schedule Input */}
          <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
            <input
              type="text"
              placeholder="Add Schedule (e.g. 6:30 PM - Entry)"
              value={scheduleInput}
              onChange={(e) => setScheduleInput(e.target.value)}
            />
            <button type="button" onClick={handleAddSchedule}>
              +Add
            </button>
          </div>
          <ul>
            {currentEvent.schedule.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          {/* Participants Input */}
          <h4>Participants</h4>
          <input
            type="text"
            placeholder="Name"
            value={participantInput.name}
            onChange={(e) =>
              setParticipantInput({ ...participantInput, name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Role"
            value={participantInput.role}
            onChange={(e) =>
              setParticipantInput({ ...participantInput, role: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Image URL"
            value={participantInput.image}
            onChange={(e) =>
              setParticipantInput({ ...participantInput, image: e.target.value })
            }
          />
          <button type="button" onClick={handleAddParticipant}>
            + Add Participant
          </button>
          <ul>
            {currentEvent.participants.map((p, idx) => (
              <li key={idx}>
                {p.name} - {p.role}
              </li>
            ))}
          </ul>

          <button type="submit">{isEditing ? "Update" : "Add"} Event</button>
        </form>
      </div>

      {/* ============ Right Section: Table ================= */}
      <div className="right-section">
        <h2>Event Added History</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Type</th>
              <th>Date</th>
              <th>Time</th>
              <th>Location</th>
              <th>Organizer</th>
              <th>Price</th>
              <th>Seats</th>
              <th>Available</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.length === 0 ? (
              <tr>
                <td colSpan="11" style={{ textAlign: "center" }}>
                  No events added.
                </td>
              </tr>
            ) : (
              events.map((ev) => (
                <tr key={ev.id}>
                  <td>{ev.id}</td>
                  <td>{ev.name}</td>
                  <td>{ev.type}</td>
                  <td>{ev.date}</td>
                  <td>{ev.time}</td>
                  <td>{ev.location}</td>
                  <td>{ev.organizer}</td>
                  <td>{ev.price}</td>
                  <td>{ev.totalSeats}</td>
                  <td>
                    {ev.availableSeats === 0 ? (
                      <span style={{color: 'red', fontWeight: 'bold'}}>SOLD OUT</span>
                    ) : (
                      `${ev.availableSeats} available`
                    )}
                  </td>
                  <td>
                    <div style={{display:"flex",}}>
                    <span
                      className="action-icon"
                      onClick={() => handleEdit(ev)}
                      title="Edit"
                    >
                      ✏️
                    </span>
                    <span
                      className="action-icon"
                      onClick={() => handleDelete(ev.id)}
                      title="Delete"
                    >
                      🗑️
                    </span>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientPage;