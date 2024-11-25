import React from "react";
import PropTypes from "prop-types";
import './Calender.css';

function Calendar({ currentDate, events }) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate(); // Get number of days in the month
  const firstDay = new Date(year, month, 1).getDay(); // Get the first day of the month
  const today = new Date();

  const getClassForDay = (day) => {
    const dayDate = new Date(year, month, day);

    // Find events for this day
    const dayEvents = events.filter((event) => {
      const eventDate = new Date(event.time);
      return (
        eventDate.getFullYear() === year &&
        eventDate.getMonth() === month &&
        eventDate.getDate() === day
      );
    });

    // Assign classes based on event status
    if (dayEvents.some((event) => event.checked)) return "completed"; // Green for completed
    if (dayEvents.some((event) => !event.checked && dayDate < today))
      return "overdue"; // Red for overdue
    if (dayEvents.some((event) => !event.checked && dayDate >= today))
      return "pending"; // Blue for upcoming events

    return ""; // No events
  };

  // Create array for days of the week
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const days = [];

  // Add the days of the week to the top of the calendar
  daysOfWeek.forEach((day, index) => {
    days.push(<span key={`day-${index}`} className="day-header">{day}</span>);
  });

  // Fill in the empty slots before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    days.push(<span key={`empty-${i}`} className="empty"></span>);
  }

  // Fill in the actual days
  for (let day = 1; day <= daysInMonth; day++) {
    const isToday =
      day === today.getDate() &&
      year === today.getFullYear() &&
      month === today.getMonth();

    days.push(
      <span
        key={day}
        className={`${getClassForDay(day)} ${isToday ? "today" : ""}`}
      >
        {day}
      </span>
    );
  }

  return <div className="calendar-grid">{days}</div>;
}

Calendar.propTypes = {
  currentDate: PropTypes.instanceOf(Date).isRequired,
  events: PropTypes.arrayOf(
    PropTypes.shape({
      time: PropTypes.string.isRequired,
      checked: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

export default Calendar;