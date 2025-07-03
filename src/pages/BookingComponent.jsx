import { useState } from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import axios from 'axios';

const BookingComponent = ({ selectedDateRange, onClose, onBookingSuccess }) => {
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    event_type: 'wedding',
    guests: '',
    notes: ''
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const [loading,setLoading] = useState(false)

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBookingSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    try {
      const bookingData = {
        ...bookingForm,
        start_date: selectedDateRange[0].toISOString().split('T')[0],
        end_date: selectedDateRange[1].toISOString().split('T')[0],
        status: 'pending' // Add status field
      };      
      
      const response = await axios.post('http://127.0.0.1:8000/api/bookings/', bookingData);
      setLoading(false)
      setBookingSuccess(true);
      onBookingSuccess(selectedDateRange);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        onClose();
        setBookingSuccess(false);
        setBookingForm({
          name: '',
          email: '',
          phone: '',
          event_type: 'wedding',
          guests: '',
          notes: ''
        });
      }, 5000);

    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('Failed to submit booking. Please try again.');
      setLoading(false)
    }
  };

  return (
    <div className="in-booking-modal">
      <div className="in-modal-content">
        <button 
          className="in-modal-close"
          onClick={() => {
            onClose();
            setBookingSuccess(false);
          }}
        >
          &times;
        </button>
        {bookingSuccess ? (
          <div className="in-booking-success">
            <FiCheckCircle className="in-success-icon" />
            <h2>Booking Request Submitted!</h2>
            <p>Thank you for your interest in MM Function Hall.</p>
            <p>We'll review your request and contact you shortly.</p>
          </div>
        ) : (
          <>
          
            <h2>Book Your Event</h2>
            <p>Selected Date Range: {selectedDateRange[0].toDateString()} to {selectedDateRange[1].toDateString()}</p>
            <form onSubmit={handleBookingSubmit}>
              <div className="in-form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={bookingForm.name}
                  onChange={handleBookingChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={bookingForm.email}
                  onChange={handleBookingChange}
                  required
                />
              </div>
              <div className="in-form-group">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={bookingForm.phone}
                  onChange={handleBookingChange}
                  required
                />
                <select
                  name="event_type"
                  value={bookingForm.event_type}
                  onChange={handleBookingChange}
                  required
                >
                  <option value="wedding">Wedding</option>
                  <option value="birthday">Birthday</option>
                  <option value="corporate">Corporate Event</option>
                  <option value="engagement">Engagement</option>
                  <option value="anniversary">Anniversary</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="in-form-group">
                <input
                  type="number"
                  name="guests"
                  placeholder="Number of Guests"
                  value={bookingForm.guests}
                  onChange={handleBookingChange}
                  min="1"
                  required
                />
              </div>
              <textarea
                name="notes"
                placeholder="Additional Notes (Decorations, Catering, etc.)"
                value={bookingForm.notes}
                onChange={handleBookingChange}
                rows="4"
              />
              {
                loading ? (<>
                  <div class="spinner">
  <span></span>
  <span></span>
  <span></span>
  <span></span>
</div>
                </>
                ) : (
                  <button type="submit" className="in-btn in-btn-primary">
                Submit Booking Request
              </button>
                )
              }
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default BookingComponent;