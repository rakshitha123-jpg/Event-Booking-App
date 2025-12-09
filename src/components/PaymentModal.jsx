import './PaymentModal.css'

const PaymentModal = ({ event, selectedSeats, totalPrice, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>×</button>

        <div className="payment-result success">
          <h2> Payment Successful!</h2>
          <p>{selectedSeats.length} ticket(s) booked for <strong>{event.name}</strong></p>
          <p>Seats: {selectedSeats.map(s => s + 1).join(', ')}</p>
          <p>Total Amount: ₹{totalPrice}</p>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}

export default PaymentModal
