import { useState, useEffect,useRef } from 'react';
import { FaArrowRight, FaArrowLeft, FaGlassCheers, FaBirthdayCake, FaRing, FaCalendarAlt, FaMusic, FaCamera, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { FiCheckCircle } from 'react-icons/fi';
import 'react-calendar/dist/Calendar.css';
import './Main.css';
import axios from 'axios';
import BookingComponent from './BookingComponent';
import CalendarComponent from './CalendarComponent';
import Contact from '../components/Contact';
const HomePage = () => {
  // Image slider state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [email, setEmail] = useState('');
  const [bookedDates, setBookedDates] = useState([]);
  const [selectedDateRange, setSelectedDateRange] = useState([new Date(), new Date()]);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Fetch booked dates from backend
  useEffect(() => {
    const fetchBookedDates = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/bookings/dates/');
        const dates = response.data.map(dateStr => new Date(dateStr));
        setBookedDates(dates);
      } catch (error) {
        console.error('Error fetching booked dates:', error);
      }
    };
    fetchBookedDates();
  }, []);

   const handleBookingSuccess = (dates) => {
    // Add all dates in the range to booked dates
    const start = new Date(dates[0]);
    const end = new Date(dates[1]);
    const newDates = [];
    
    while (start <= end) {
      newDates.push(new Date(start));
      start.setDate(start.getDate() + 1);
    }
    
    setBookedDates([...bookedDates, ...newDates]);
  };

  // Slides data
  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      title: 'Elegant Event Spaces',
      description: 'Perfect venues for your most memorable celebrations'
    },
    {
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      title: 'Wedding Venue Excellence',
      description: 'Create your dream wedding in our beautiful halls'
    },
    {
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      title: 'Corporate Event Specialists',
      description: 'Professional spaces for business gatherings'
    },
    {
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      title: 'Birthday Party Paradise',
      description: 'Celebrate your special day in style'
    },
    {
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      title: 'Anniversary Celebrations',
      description: 'Mark your milestones in our elegant spaces'
    }
  ];

  // Auto slide change
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // Manual slide navigation
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Check if date is booked
  const isDateBooked = (date) => {
    return bookedDates.some(
      bookedDate => date.toDateString() === bookedDate.toDateString()
    );
  };

 

  // Handle booking form changes
  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Services data
  const services = [
    {
      icon: <FaGlassCheers />,
      title: 'Wedding Receptions',
      description: 'Complete wedding packages with decoration and catering'
    },
    {
      icon: <FaBirthdayCake />,
      title: 'Birthday Parties',
      description: 'Themed birthday celebrations for all ages'
    },
    {
      icon: <FaRing />,
      title: 'Engagement Functions',
      description: 'Elegant spaces for your pre-wedding celebrations'
    },
    {
      icon: <FaCalendarAlt />,
      title: 'Corporate Events',
      description: 'Professional settings for meetings and conferences'
    },
    {
      icon: <FaMusic />,
      title: 'Entertainment Packages',
      description: 'DJ, live music, and sound systems available'
    },
    {
      icon: <FaCamera />,
      title: 'Photography Services',
      description: 'Professional event photography and videography'
    }
  ];

  // Features data
  const features = [
    "Spacious banquet halls",
    "Customizable decor options",
    "Professional sound systems",
    "Catering services available",
    "Ample parking space",
    "Air-conditioned venues",
    "Event planning assistance",
    "Flexible seating arrangements"
  ];


  const handleDateSelect = (dates) => {
    setSelectedDateRange(dates);
  };

  // Helper function to check if any date in range is booked
function isDateRangeBooked(dateRange) {
  const [start, end] = dateRange;
  const current = new Date(start);
  
  while (current <= end) {
    if (bookedDates.some(d => d.toDateString() === current.toDateString())) {
      return true;
    }
    current.setDate(current.getDate() + 1);
  }
  return false;
}

// Add this script to make filters work
document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.ad-filter-btn');
  const galleryItems = document.querySelectorAll('.ad-gallery-item');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Update active state
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      const filter = button.dataset.filter;
      
      // Filter items
      galleryItems.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
});

  return (
    <>
     
      <div className="in-home-page">
        {/* Hero Slider Section */}
        <section className="in-hero-slider">
          <div className="in-slider-container">
            {slides.map((slide, index) => (
              <div 
                key={index}
                className={`in-slide ${index === currentSlide ? 'in-active' : ''}`}
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="in-overlay"></div>
                <div className="in-slide-content">
                  <h1>{slide.title}</h1>
                  <p>{slide.description}</p>
                  <div className="in-hero-buttons">
                    <button 
                      className="in-btn in-btn-primary"
                      onClick={() => setShowBookingModal(true)}
                    >
                      Book Now
                    </button>
                    <button className="in-btn in-btn-outline">Learn More</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="in-slider-nav in-prev" onClick={prevSlide}>
            <FaArrowLeft />
          </button>
          <button className="in-slider-nav in-next" onClick={nextSlide}>
            <FaArrowRight />
          </button>
          <div className="in-slider-dots">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`in-dot ${index === currentSlide ? 'in-active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </section>

        {/* About Section */}
        <section className="in-about-section">
          <div className="in-container">
            <div className="in-about-content">
              <div className="in-about-text">
                <h2>About Our <span style={{color:'darkgreen',fontSize:'46px'}}>MM</span> Functionhall</h2>
                <p className="in-subtitle">
                  Where Memories Are Made
                </p>
                <p>
                  MM Function Hall is Kalikiri's premier event venue, specializing in weddings, birthdays, corporate events, and social gatherings. Our elegant spaces combine modern amenities with timeless charm to create the perfect backdrop for your special occasion.
                </p>
                <div className="in-features-list">
                  {features.slice(0, 4).map((feature, index) => (
                    <div key={index} className="in-feature-item">
                      <FiCheckCircle className="in-feature-icon" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="in-about-image">
                <img 
                  src="https://images.unsplash.com/photo-1567942712661-82b9b407abbf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                  alt="MM Function Hall interior" 
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="in-stats-section">
      <div className="in-container">
        <div className="in-stats-grid">
          <StatItem target={500} label="Events Hosted" />
          <StatItem target={3} label="Elegant Halls" />
          <StatItem target={1000} label="Happy Clients" />
          <StatItem target={15} label="Years Experience" />
        </div>
      </div>
    </section>

        {/* Services Section */}
        <section className="in-services-section">
          <div className="in-container">
            <div className="in-section-header">
              <h2>Our Event Services</h2>
              <p className="in-section-subtitle">
                Comprehensive solutions for all your celebration needs
              </p>
            </div>
            <div className="in-services-grid">
              {services.map((service, index) => (
                <div key={index} className="in-service-card">
                  <div className="in-service-icon">{service.icon}</div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <a href="#" className="in-learn-more">Learn more →</a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Booking Calendar Section */}
        <section className="in-booking-section">
          <div className="in-container">
            <div className="in-section-header">
              <h2>Check Availability</h2>
              <p className="in-section-subtitle">
                Select your preferred date range to book the function hall (1-7 days)
              </p>
            </div>
            <div className="in-calendar-wrapper">
              <CalendarComponent 
                bookedDates={bookedDates}
                selectedDateRange={selectedDateRange}
                setSelectedDateRange={setSelectedDateRange}
                onDateSelect={handleDateSelect}
              />
              <div className="in-calendar-sidebar">
                <h3>Book Your Event</h3>
                <p>Selected Date Range: {selectedDateRange[0].toDateString()} to {selectedDateRange[1].toDateString()}</p>
                <p className="in-availability">
                  {isDateRangeBooked(selectedDateRange) ? 
                    <span className="in-booked">Booked - Please select another date</span> : 
                    <span className="in-available">Available for booking!</span>
                  }
                </p>
                <button 
                  className="in-btn in-btn-primary" 
                  onClick={() => setShowBookingModal(true)}
                  disabled={isDateRangeBooked(selectedDateRange)}
                >
                  Book These Dates
                </button>
                <div className="in-legend">
                  <div className="in-legend-item">
                    <div className="booked-dot"></div>
                    <span>Booked Dates</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="ad-gallery-section">
  <div className="ad-container">
    <div className="ad-section-header">
      <h2>Our Event Gallery</h2>
      <p className="ad-section-subtitle">
        Discover unforgettable moments from our expertly crafted events
      </p>
      <div className="ad-filter-buttons">
        <button className="ad-filter-btn active" data-filter="all">All Events</button>
        <button className="ad-filter-btn" data-filter="wedding">Weddings</button>
        <button className="ad-filter-btn" data-filter="corporate">Corporate</button>
        <button className="ad-filter-btn" data-filter="social">Social</button>
      </div>
    </div>
    
    <div className="ad-gallery-grid">
      {/* Wedding Events */}
      <div className="ad-gallery-item" data-category="wedding">
        <img src="https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Elegant wedding ceremony" />
        <div className="ad-gallery-overlay">
          <div className="ad-overlay-content">
            <h3>Elegant Wedding</h3>
            <p>Grand ballroom with floral arrangements</p>
            <span className="ad-view-more">View Photos</span>
          </div>
        </div>
      </div>
      
      {/* Corporate Events */}
      <div className="ad-gallery-item" data-category="corporate">
        <img src="https://images.unsplash.com/photo-1544396821-4dd40b938ad3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Corporate conference" />
        <div className="ad-gallery-overlay">
          <div className="ad-overlay-content">
            <h3>Annual Conference</h3>
            <p>500+ attendees with stage setup</p>
            <span className="ad-view-more">View Photos</span>
          </div>
        </div>
      </div>
      
      {/* Social Events */}
      <div className="ad-gallery-item" data-category="social">
        <img src="https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Birthday celebration" />
        <div className="ad-gallery-overlay">
          <div className="ad-overlay-content">
            <h3>Milestone Birthday</h3>
            <p>Themed decorations and entertainment</p>
            <span className="ad-view-more">View Photos</span>
          </div>
        </div>
      </div>
      
      {/* Additional Gallery Items */}
      <div className="ad-gallery-item" data-category="wedding">
        <img src="https://images.unsplash.com/photo-1670529776180-60e4132ab90c?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Z2FyZGVuJTIwd2VkZGluZ3xlbnwwfHwwfHx8MA%3D%3D" alt="Outdoor wedding" />
        <div className="ad-gallery-overlay">
          <div className="ad-overlay-content">
            <h3>Garden Wedding</h3>
            <p>Romantic outdoor ceremony</p>
            <span className="ad-view-more">View Photos</span>
          </div>
        </div>
      </div>
      
      <div className="ad-gallery-item" data-category="corporate">
        <img src="https://images.unsplash.com/photo-1431540015161-0bf868a2d407?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Product launch" />
        <div className="ad-gallery-overlay">
          <div className="ad-overlay-content">
            <h3>Product Launch</h3>
            <p>Immersive brand experience</p>
            <span className="ad-view-more">View Photos</span>
          </div>
        </div>
      </div>
      
      <div className="ad-gallery-item" data-category="social">
        <img src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Anniversary party" />
        <div className="ad-gallery-overlay">
          <div className="ad-overlay-content">
            <h3>Golden Anniversary</h3>
            <p>50 years of love celebration</p>
            <span className="ad-view-more">View Photos</span>
          </div>
        </div>
      </div>
      
      <div className="ad-gallery-item" data-category="wedding">
        <img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Wedding reception" />
        <div className="ad-gallery-overlay">
          <div className="ad-overlay-content">
            <h3>Reception Party</h3>
            <p>Live band and dance floor</p>
            <span className="ad-view-more">View Photos</span>
          </div>
        </div>
      </div>
      
      <div className="ad-gallery-item" data-category="corporate">
        <img src="https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Award ceremony" />
        <div className="ad-gallery-overlay">
          <div className="ad-overlay-content">
            <h3>Awards Gala</h3>
            <p>Red carpet and formal dinner</p>
            <span className="ad-view-more">View Photos</span>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</section>

        {/* Testimonials Section */}
        <section className="in-testimonials-section">
          <div className="in-container">
            <div className="in-section-header">
              <h2>What Our Clients Say</h2>
              <p className="in-section-subtitle">
                Hear from those who celebrated with us
              </p>
            </div>
            <div className="in-testimonials-grid">
              <div className="in-testimonial-card">
                <div className="in-testimonial-content">
                  <p>"MM Function Hall made our wedding dreams come true! The staff was incredibly helpful and the venue was beautifully decorated exactly as we envisioned."</p>
                </div>
                <div className="in-testimonial-author">
                  <img src="https://randomuser.me/api/portraits/women/32.jpg" alt="Priya Reddy" />
                  <div>
                    <h4>Priya Reddy</h4>
                    <p>Wedding Client</p>
                  </div>
                </div>
              </div>
              <div className="in-testimonial-card">
                <div className="in-testimonial-content">
                  <p>"We've hosted our annual corporate event here for 3 years running. Professional service, excellent facilities, and great catering options."</p>
                </div>
                <div className="in-testimonial-author">
                  <img src="https://randomuser.me/api/portraits/men/44.jpg" alt="Rajesh Kumar" />
                  <div>
                    <h4>Rajesh Kumar</h4>
                    <p>Corporate Client</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <Contact />

        {/* CTA Section */}
        <section className="in-cta-section">
          <div className="in-container">
            <h2>Ready to Book Your Event?</h2>
            <p>
              Contact us today to check availability and start planning your perfect celebration at MM Function Hall.
            </p>

          </div>
        </section>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="in-booking-modal">
          <div className="in-modal-content">
            <button 
              className="in-modal-close"
              onClick={() => {
                setShowBookingModal(false);
                setBookingSuccess(false);
              }}
            >
              &times;
            </button>

              {showBookingModal && (
        <>
       
        <BookingComponent 
          selectedDateRange={selectedDateRange}
          onClose={() => setShowBookingModal(false)}
          onBookingSuccess={handleBookingSuccess}
        />
        </>
      )}

            
          </div>
        </div>
      )}

    </>
  );
};



const StatItem = ({ target, label }) => {
  const [count, setCount] = useState(0);
  const ref = useRef();
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          animateCount();
          setHasAnimated(true);
        }
      },
      { threshold: 0.6 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const animateCount = () => {
    let start = 0;
    const duration = 1500; // 1.5 seconds
    const startTime = performance.now();

    const step = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const currentCount = Math.floor(progress * target);
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(step);
  };

  return (
    <div className="in-stat-item" ref={ref}>
      <h3>{count}{target >= 1000 ? "+" : ""}</h3>
      <p>{label}</p>
    </div>
  );
};



export default HomePage;