import React, { useState } from 'react';
import PropTypes from 'prop-types';
import EventDetails from '../EventDetails/EventDetails';

import './EventStatus.css';

const EventStatus = ({ events, onCheckEvent, onDeleteEvent }) => {
  const [filter, setFilter] = useState('all');

  // Extract reusable filtering logic
  const filterEvents = (events, filter) => {
    const now = new Date();
    return events.filter((event) => {
      if (filter === 'all') return true;
      if (filter === 'completed') return event.checked;
      if (filter === 'pending') return !event.checked && new Date(event.time) >= now;
      if (filter === 'overdue') return !event.checked && new Date(event.time) < now;
      return true;
    });
  };

  const filteredEvents = filterEvents(events, filter);

  return (
    <div className="event-status">
      {/* Filter Buttons */}
      <div className="filters">
        {['all', 'completed', 'pending', 'overdue'].map((status) => (
          <button
            key={status}
            className={` ${status} ${filter === status ? 'active' : ''}`}
            onClick={() => setFilter(status)}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Display Events */}
      <div className="events-list">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event, index) => (
            <EventDetails
            
              index={event.index || index}
              title={event.title}
              details={event.details}
              time={event.time}
              checked={event.checked}
              notes={event.notes}
              onCheckEvent={onCheckEvent}
              onDeleteEvent={onDeleteEvent}
            />
          ))
        ) : (
          <center><strong>No events found for this filter.</strong></center>
        )}
      </div>
    </div>
  );
};

EventStatus.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      details: PropTypes.string,
      time: PropTypes.string.isRequired,
      checked: PropTypes.bool,
      notes: PropTypes.string,
    })
  ).isRequired,
  onCheckEvent: PropTypes.func.isRequired,
  onDeleteEvent: PropTypes.func.isRequired,
};

export default EventStatus;
