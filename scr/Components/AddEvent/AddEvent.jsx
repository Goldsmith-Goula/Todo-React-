import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './AddEvent.css';

const AddEvent = ({ onAddEvent, events }) => {
  const [index, setIndex] = useState(null);
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  const [checked, setChecked] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const { fromEdit, eventIndex } = location.state || {};
    if (fromEdit && eventIndex !== undefined) {
      const eventToEdit = events.find((event) => {
        return event.index === eventIndex;
      });   //big problem here
      if (eventToEdit) {
        setIndex(eventIndex);
        setTitle(eventToEdit.title);
        setDetails(eventToEdit.details);
        setTime(eventToEdit.time);
        setNotes(eventToEdit.notes);
        setChecked(eventToEdit.checked);
      }
    }
  }, [location.state, events]);

  const today = new Date().toISOString().slice(0, 16);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && details.trim() && time.trim()) {
      const newEvent = { index, title, details, time, checked, notes };
      onAddEvent(newEvent);
      navigate('/');
    } else {
      alert('Please fill in all required fields.');
    }
  };

  return (
<>
  <center>
    <form onSubmit={handleSubmit} className="event-input">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Event Title"
        required
      />
      <input
        type="text"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        placeholder="Add description"
        required
      />
      <input
        type="datetime-local"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        placeholder="Time"
        min={today}
        required
      />
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Notes"
      />
      
      <span className='inline-btns'> 
        
        <button id='new-event-btn' type="submit">
        {index !== null ? 'Update Event' : 'Add Event'}
      </button>
<button className='cancel-btn' onClick={()=> navigate('/')}>Cancel</button>
</span>
   
    </form>
    </center>
    </>
  );
};

export default AddEvent;
