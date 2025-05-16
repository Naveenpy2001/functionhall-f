import { useState, useEffect } from 'react';
import axios from 'axios';
import { FiCheck, FiX, FiMail, FiClock, FiLogOut } from 'react-icons/fi';
import {useNavigate} from 'react-router-dom'

const AdminBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [filter, setFilter] = useState('all');
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const navigate = useNavigate()

  useEffect(() => {
    // Check if already authenticated
    const auth = localStorage.getItem('mm_admin_authenticated');
    if (auth === 'true') {
      setAuthenticated(true);
      fetchBookings();
    }
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('https://function-b-2.onrender.com/api/bookings/');
      setBookings(response.data);
      setLoading(false);
      console.log('data : ',response.data);
      
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'mm_admin' && password === 'mm@1234') {
      setAuthenticated(true);
      localStorage.setItem('mm_admin_authenticated', 'true');
      fetchBookings();
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    navigate('/')
    setAuthenticated(false);
    localStorage.removeItem('mm_admin_authenticated');
  };

  const handleStatusChange = async (id, status) => {
    try {
      await axios.patch(`https://function-b-2.onrender.com/api/bookings/${id}/`, { status });
      
      setBookings(bookings.map(booking => 
        booking.id === id ? { ...booking, status } : booking
      ));
      
      await axios.post(`https://function-b-2.onrender.com/api/bookings/${id}/send-confirmation/`, { status });
      
      console.error(`Booking ${status} and confirmation email sent!`);
    } catch (error) {
      console.error('Error updating booking:', error);
      console.error('Failed to update booking status.');
    }
  };

  // Filter bookings
  const filteredBookings = bookings.filter(booking => {
    if (filter === 'all') return true;
    return booking.status === filter;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBookings.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);

  if (!authenticated) {
    return (
      <div className="ad-auth-container">
        <div className="ad-auth-box">
          <h2>Admin Login</h2>
          <form onSubmit={handleLogin}>
            <div className="ad-form-group">
              <label>Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
              />
            </div>
            <div className="ad-form-group">
              <label>Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>
            <button type="submit" className="ad-btn ad-btn-primary">Login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="ad-admin-container">
      <div className="ad-header">
        <h1>Booking Management</h1>
        <button onClick={handleLogout} className="ad-btn ad-btn-logout">
          <FiLogOut /> Logout
        </button>
      </div>

      <div className="ad-controls">
        <div className="ad-filter">
          <label>Filter by status:</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All Bookings</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="ad-loading">Loading bookings...</div>
      ) : (
        <>
          <div className="ad-bookings-table">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Event Type</th>
                  <th>phone</th>
                  <th>E-mail</th>
                  <th>Dates</th>
                  <th>Guests</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map(booking => (
                  <tr key={booking.id}>
                    <td>{booking.id}</td>
                    <td>{booking.name}</td>
                    <td>{booking.event_type}</td>
                    <td>{booking.phone}</td>
                    <td>{booking.email}</td>
                    <td>{booking.start_date} to {booking.end_date}</td>
                    <td>{booking.guests}</td>
                    <td>
                      <span className={`ad-status ad-${booking.status}`}>
                        {booking.status === 'pending' && <FiClock />}
                        {booking.status === 'confirmed' && <FiCheck />}
                        {booking.status === 'rejected' && <FiX />}
                        {booking.status}
                      </span>
                    </td>
                    <td className="ad-actions">
                      {booking.status === 'pending' && (
                        <>
                          <button 
                            onClick={() => handleStatusChange(booking.id, 'confirmed')}
                            className="ad-btn ad-btn-success"
                          >
                            <FiCheck /> Accept
                          </button>
                          <button 
                            onClick={() => handleStatusChange(booking.id, 'rejected')}
                            className="ad-btn ad-btn-danger"
                          >
                            <FiX /> Reject
                          </button>
                        </>
                      )}
                      <button 
                        onClick={() => {
                          axios.post(`https://function-b-2.onrender.com/api/bookings/${booking.id}/send-email/`, {
                            subject: 'Regarding your booking',
                            message: 'Your custom message here'
                          });
                          alert('Email sent to customer');
                        }}
                        className="ad-btn ad-btn-secondary"
                      >
                        <FiMail /> Email
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredBookings.length > itemsPerPage && (
            <div className="ad-pagination">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span>Page {currentPage} of {totalPages}</span>
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminBookingsPage;

// CSS Styles
const styles = `
.ad-auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.ad-auth-box {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
}

.ad-auth-box h2 {
  margin-bottom: 1.5rem;
  text-align: center;
  color: #333;
}

.ad-form-group {
  margin-bottom: 1rem;
}

.ad-form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.ad-form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.ad-btn {
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s;
}

.ad-btn-primary {
  background-color: #4f46e5;
  color: white;
  width: 100%;
}

.ad-btn-primary:hover {
  background-color: #4338ca;
}

.ad-admin-container {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.ad-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.ad-header h1 {
  color: #333;
}

.ad-btn-logout {
  background-color: #ef4444;
  color: white;
}

.ad-btn-logout:hover {
  background-color: #dc2626;
}

.ad-controls {
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.ad-filter select {
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ddd;
  margin-left: 0.5rem;
}

.ad-bookings-table {
  overflow-x: auto;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.ad-bookings-table table {
  width: 100%;
  border-collapse: collapse;
}

.ad-bookings-table th, .ad-bookings-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.ad-bookings-table th {
  background-color: #f9fafb;
  font-weight: 600;
  color: #4b5563;
}

.ad-status {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
}

.ad-pending {
  background-color: #fef3c7;
  color: #92400e;
}

.ad-confirmed {
  background-color: #d1fae5;
  color: #065f46;
}

.ad-rejected {
  background-color: #fee2e2;
  color: #991b1b;
}

.ad-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.ad-btn-success {
  background-color: #10b981;
  color: white;
}

.ad-btn-success:hover {
  background-color: #059669;
}

.ad-btn-danger {
  background-color: #ef4444;
  color: white;
}

.ad-btn-danger:hover {
  background-color: #dc2626;
}

.ad-btn-secondary {
  background-color: #e5e7eb;
  color: #4b5563;
}

.ad-btn-secondary:hover {
  background-color: #d1d5db;
}

.ad-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
}

.ad-pagination button {
  padding: 0.5rem 1rem;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.ad-pagination button:disabled {
  background-color: #c7d2fe;
  cursor: not-allowed;
}

.ad-pagination span {
  font-size: 0.875rem;
  color: #4b5563;
}

.ad-loading {
  text-align: center;
  padding: 2rem;
  color: #4b5563;
}
`;

// Add styles to the document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);