import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import EventDetails from './pages/EventDetails'
import './App.css'
import Payment from './pages/Payment'
import ClientPage from './pages/ClientPage'
import AllEvents from './pages/AllEvents'


function App() {
  const [events, setEvents] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])
  const [filters, setFilters] = useState({
    type: 'all',
    date: '',
    location: ''
  })

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || []
    setEvents(storedEvents)
  }, [])

  useEffect(() => {
    let result = events
    
    if (filters.type !== 'all') {
      result = result.filter(event => event.type === filters.type)
    }
    
    if (filters.date) {
      result = result.filter(event => event.date === filters.date)
    }
    
    if (filters.location) {
      result = result.filter(event => 
        event.location.toLowerCase().includes(filters.location.toLowerCase())
      )
    }
    
    setFilteredEvents(result)
  }, [filters, events])

  const handleFilterChange = (newFilters) => {
    setFilters({...filters, ...newFilters})
  }

  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          
          <Routes>
            
            <Route path="/" element={<Home events={filteredEvents} filters={filters} onFilterChange={handleFilterChange}/>} />
            <Route path="/event/:id" element={<EventDetails events={events} />} />
            <Route path="/payment/:id" element={<Payment events={events} />} />
             <Route path="/client" element={<ClientPage />} />
             <Route path="/events" element={<AllEvents events={events} />} />

          </Routes> 
         
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App