import EventCard from '../components/EventCard'
import './Home.css'

const AllEvents = ({ events }) => {
  return (
    <div>
      <section className="events-section">
        <h2 className="section-title">All Events</h2>
        {events.length === 0 ? (
          <div className="no-events">
            <p>No events available.</p>
          </div>
        ) : (
          <div className="events-grid">
            {events.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default AllEvents
