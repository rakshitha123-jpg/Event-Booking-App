import { useEffect, useState } from 'react'
import EventCard from '../components/EventCard'
import './Home.css'

const Home = ({ filters, onFilterChange }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [events, setEvents] = useState([])
  const [eventTypes, setEventTypes] = useState([])
  
  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || []
    setEvents(storedEvents)
    
    const types = [...new Set(storedEvents.map(event => event.type).filter(type => type))]
    setEventTypes(types)
  }, [])
 
  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
  }
  const filteredEvents = events.filter(event => {
    // Search filter
    const matchesSearch = 
      event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase())
    
    // Type filter
    const matchesType = filters.type === 'all' || event.type === filters.type
    
    // Date filter
    const matchesDate = !filters.date || event.date === filters.date
    
    // Location filter
    const matchesLocation = !filters.location || 
      event.location.toLowerCase().includes(filters.location.toLowerCase())
    
    return matchesSearch && matchesType && matchesDate && matchesLocation
  })

  const handleSearchSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div>
      <section className="hero">
          <div className="hero-content">
            <h1>Discover Amazing Events</h1>
            <p>Find and book tickets for the best events in your city</p>
            <form className="search-bar" onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Search events, locations, or organizers..."
                value={searchQuery}
                onChange={handleSearch}
              />
              <button type="submit" className="btn">Search</button>
            </form>
          </div>
      
      </section>
{/* ================= Only Filter Section ============================= */}
<div className='filter-bg'>
      <section className="filters-section"> 
        <div className="container" >
          <div className="filters">

            <div className="filter-group">
              <label htmlFor="type-filter">Event Type</label>
              <select 
                id="type-filter"
                value={filters.type} 
                onChange={(e) => onFilterChange({ type: e.target.value })}
              >
                <option value="all">All Types</option>
                {eventTypes.map(type => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="date-filter">Date</label>
              <input
                type="date"
                id="date-filter"
                value={filters.date}
                onChange={(e) => onFilterChange({ date: e.target.value })}
              />
            </div>

            <div className="filter-group">
              <label htmlFor="location-filter">Location</label>
              <input
                type="text"
                id="location-filter"
                placeholder="Enter location"
                value={filters.location}
                onChange={(e) => onFilterChange({ location: e.target.value })}
              />
            </div>

            <button 
              className="btn btn-secondary"
              onClick={() => {
                onFilterChange({ type: 'all', date: '', location: '' })
                setSearchQuery('')
              }}
            >
              Clear Filters
            </button>
          </div>
        </div>
      </section>
</div>


      <section className="events-section">
        <h2 className="section-title">Upcoming Events</h2>
        {filteredEvents.length === 0 ? (
          <div className="no-events">
            <p>No events found matching your criteria.</p>
          </div>
        ) : (
          <div className="events-grid">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default Home