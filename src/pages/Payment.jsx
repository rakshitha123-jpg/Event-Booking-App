import { useState, useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import './Payment.css'
import PaymentModal from '../components/PaymentModal'

const Payment = ({ events }) => {
  const location = useLocation()
  const { id } = useParams()
  const { selectedSeats, totalPrice } = location.state || {}
  
  const [user, setUser] = useState({ 
    name: '', 
    email: '', 
    tickets: selectedSeats ? selectedSeats.length : 1 
  })
  const [paymentMethod, setPaymentMethod] = useState('upi')
  const [card, setCard] = useState({ number: '', name: '', expiry: '', cvv: '' })
  const [event, setEvent] = useState(null)
  const [showModal, setShowModal] = useState(false) // modal toggle

  useEffect(() => {
    const eventFromProps = events.find(e => e.id === id || e.id === parseInt(id))
    if (eventFromProps) {
      setEvent(eventFromProps)
    } else {
      const storedEvents = JSON.parse(localStorage.getItem("events")) || []
      const eventFromStorage = storedEvents.find(e => e.id === id || e.id === parseInt(id))
      setEvent(eventFromStorage)
    }
  }, [id, events])

  const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value })
  const handleCardChange = (e) => setCard({ ...card, [e.target.name]: e.target.value })

  const handlePayment = (e) => {
    e.preventDefault()
    
    if (!event || !selectedSeats) {
      alert("Error: Event or seat information missing.")
      return
    }
    
    // Update the event's booked seats
    const updatedEvents = events.map(ev => {
      if (ev.id === event.id) {
        const updatedBookedSeats = [...ev.bookedSeats]
        selectedSeats.forEach(seatIndex => {
          updatedBookedSeats[seatIndex] = true
        })
        
        return {
          ...ev,
          bookedSeats: updatedBookedSeats,
          availableSeats: ev.availableSeats - selectedSeats.length
        }
      }
      return ev
    })
    
   
    localStorage.setItem("events", JSON.stringify(updatedEvents))
    
    setShowModal(true)

  }

  if (!event) {
    return (
      <div className="payment-container">
        <div className="payment-card">
          <h2>Event not found</h2>
          <p>Please go back and try again.</p>
        </div>
      </div>
    )
  }

  if (!selectedSeats || selectedSeats.length === 0) {
    return (
      <div className="payment-container">
        <div className="payment-card">
          <h2>No seats selected</h2>
          <p>Please go back and select seats before proceeding to payment.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="payment-container">
      <div className="payment-card">
        <div className="payment-left">
          <h1>Secure Payment</h1>
          <p>Complete your booking for <strong>{event.name}</strong></p>
          <div className="payment-event-details">
            <p><strong>Selected Seats:</strong> {selectedSeats.map(seat => seat + 1).join(', ')}</p>
            <p><strong>Number of Tickets:</strong> {selectedSeats.length}</p>
            <p><strong>Price per Ticket:</strong> ₹{event.price}</p>
            <p><strong>Total Amount:</strong> ₹ {totalPrice}</p>
          </div>
          <div className="payment-icon">💳</div>
        </div>
        <div className="payment-right">
          <form onSubmit={handlePayment}>
            <h3>Personal Information</h3>
            <label>Full Name</label>
            <input 
              type="text" 
              name="name" 
              value={user.name} 
              onChange={handleChange} 
              placeholder="Enter Your Name" 
              required 
            />

            <label>Email Address</label>
            <input 
              type="email" 
              name="email" 
              value={user.email} 
              onChange={handleChange} 
              placeholder="enter_your_email@example.com" 
              required 
            />

            <h3>Payment Method</h3>
            <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
              <option value="credit">Credit Card</option>
              <option value="debit">Debit Card</option>
              <option value="upi" >UPI</option>
              <option value="netbanking">Net Banking</option>
            </select>

            {(paymentMethod === 'credit' || paymentMethod === 'debit') && (
              <div className="card-details">
                <label>Card Number</label>
                <input 
                  type="text" 
                  name="number" 
                  value={card.number} 
                  onChange={handleCardChange} 
                  placeholder="xxxx-xxxx-xxxx-xxxx" 
                  required 
                />

                <label>Cardholder Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={card.name} 
                  onChange={handleCardChange} 
                  placeholder="John Doe" 
                  required 
                />

                <div className="card-row">
                  <div>
                    <label>Expiry Date</label>
                    <input 
                      type="text" 
                      name="expiry" 
                      value={card.expiry} 
                      onChange={handleCardChange} 
                      placeholder="MM/YY" 
                      required 
                    />
                  </div>
                  <div>
                    <label>CVV</label>
                    <input 
                      type="password" 
                      name="cvv" 
                      value={card.cvv} 
                      onChange={handleCardChange} 
                      placeholder="123" 
                      required 
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod !== 'credit' && paymentMethod !== 'debit' && (
              <p className="sandbox-note">You selected {paymentMethod.toUpperCase()} (Sandbox Mode)</p>
            )}

            <div className="payment-summary">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Tickets ({selectedSeats.length})</span>
                <span>₹{event.price} × {selectedSeats.length}</span>
              </div>
              <div className="summary-total">
                <span>Total</span>
                <span>₹{totalPrice}</span>
              </div>
            </div>

            <button type="submit" className="pay-btn">Pay ${totalPrice}</button>
          </form>
        </div>
      </div>
     {showModal && (
  <PaymentModal
    event={event}
    selectedSeats={selectedSeats}
    totalPrice={totalPrice}
    onClose={() => {
      setShowModal(false)
      window.location.href = '/' 
    }}
  />
)}
    </div>
  )
}

export default Payment