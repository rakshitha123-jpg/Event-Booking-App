import { useState } from 'react'
import './BookingForm.css'

const BookingForm = ({ event, onBookingComplete }) => {
  const [ticketCount, setTicketCount] = useState(1)
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: ''
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [bookingStatus, setBookingStatus] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCustomerInfo(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsProcessing(true)
    setBookingStatus(null)

    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const isSuccess = Math.random() > 0.3
      
      if (isSuccess) {
        setBookingStatus({ type: 'success', message: 'Booking confirmed! Check your email for details.' })
        if (onBookingComplete) {
          onBookingComplete({
            event,
            ticketCount,
            customerInfo,
            total: ticketCount * event.price,
            bookingId: `BK-${Date.now()}`
          })
        }
      } else {
        setBookingStatus({ type: 'error', message: 'Booking failed. Please try again.' })
      }
    } catch (error) {
      setBookingStatus({ type: 'error', message: 'An error occurred. Please try again.' })
    } finally {
      setIsProcessing(false)
    }
  }

  const totalPrice = ticketCount * event.price

  return (
    <div className="booking-form-container">
      <h3>Book Tickets</h3>
      
      {bookingStatus && (
        <div className={`booking-status ${bookingStatus.type}`}>
          {bookingStatus.message}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="booking-form">
        <div className="form-group">
          <label htmlFor="ticketCount">Number of Tickets</label>
          <select 
            id="ticketCount"
            value={ticketCount} 
            onChange={(e) => setTicketCount(parseInt(e.target.value))}
            disabled={isProcessing}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={customerInfo.name}
            onChange={handleInputChange}
            required
            disabled={isProcessing}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={customerInfo.email}
            onChange={handleInputChange}
            required
            disabled={isProcessing}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={customerInfo.phone}
            onChange={handleInputChange}
            required
            disabled={isProcessing}
          />
        </div>
        
        <div className="price-summary">
          <p>Price per ticket: <span>${event.price}</span></p>
          <p className="total">Total: <span>${totalPrice.toFixed(2)}</span></p>
        </div>
        
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Confirm Booking'}
        </button>
      </form>
    </div>
  )
}

export default BookingForm