import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalendarComponent.css';

const CalendarComponent = ({ bookedDates, onDateSelect, selectedDateRange, setSelectedDateRange }) => {
  const [activeStartDate, setActiveStartDate] = useState(new Date());

  // Check if date is booked
  const isDateBooked = (date) => {
    return bookedDates.some(
      bookedDate => date.toDateString() === bookedDate.toDateString()
    );
  };

  // Tile content for calendar
  const tileContent = ({ date, view }) => {
    if (view === 'month' && isDateBooked(date)) {
      return <div className="booked-dot"></div>;
    }
    return null;
  };

  // Tile disabled for calendar
  const tileDisabled = ({ date, view }) => {
    if (view === 'month') {
      // Disable past dates and booked dates
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date < today || isDateBooked(date);
    }
    return false;
  };

  // Handle date change
  const handleDateChange = (value) => {

    if (!Array.isArray(value)) {
      value = [value, value];
    }
    setSelectedDateRange(value);
    onDateSelect(value);
  };

  return (
    <div className="in-calendar-container">
      <Calendar
        onChange={handleDateChange}
        value={selectedDateRange}
        tileContent={tileContent}
        tileDisabled={tileDisabled}
        minDate={new Date()}
        className="in-calendar"
        selectRange={true}
        minDetail="month"
        activeStartDate={activeStartDate}
        onActiveStartDateChange={({ activeStartDate }) => setActiveStartDate(activeStartDate)}
        onClickDay={(value) => handleDateChange(value)} // Handle single date click
      />
    </div>
  );
};

export default CalendarComponent;