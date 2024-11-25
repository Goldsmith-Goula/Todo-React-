import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import './EventDetails.css'

function EventDetails({
  index,
  title,
  details,
  time,
  checked,
  notes,
  onCheckEvent,
  onDeleteEvent,
}) {
  const navigate = useNavigate();

  const handleCheckClick = () => {
    onCheckEvent(index); // Call the onCheckEvent function with the index
  };

  const handleEditClick = () => {
    navigate('/add-event', { state: { fromEdit: true, eventIndex: index } });
  };

  const handleDeleteClick = () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      onDeleteEvent(index);
    }
  };

  const formatTime = (isoTime) => {
    if (!isoTime) return '';
    const date = new Date(isoTime);
    const options = {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    }
    return new Intl.DateTimeFormat('en-US', options).format(date);

  }

  return (
    <details className="event">
      <summary className="event-header">
        <span>
          <i
            className={`bi ${checked ? "bi-check-circle-fill" : "bi-circle"}`}
            onClick={handleCheckClick} // Handle checkbox click
          ></i>
          
          {title}
        </span>
        <span className="event-crud">
          <i className="bi bi-pencil-square" onClick={handleEditClick}></i>
          <i className="bi bi-trash" onClick={handleDeleteClick}></i>
        </span>
      </summary>
      <dl className="event-details">
        <label className="label">Description</label>
        <p>{details}</p>
        <label className="label">Time</label>
        <p>{formatTime(time)}</p>

        {notes && (
          <>
            <label className="label">Notes</label>
            <p>{notes}</p>
          </>
        )}
      </dl>
    </details>
  );
}

EventDetails.propTypes = {
  index: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  details: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  notes: PropTypes.string,
  onCheckEvent: PropTypes.func.isRequired,
  onDeleteEvent: PropTypes.func.isRequired,
};

export default EventDetails;