import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Todo from './Components/Todo';
import AddEvent from './Components/AddEvent/AddEvent';
import Header from './Components/Header/Header';

function App() {
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem('events');
    return savedEvents ? JSON.parse(savedEvents) : [];
  });

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
    console.log(events);
  }, [events])

  // Handle event addition or editing
  const handleAddEvent = (newEvent) => {
    setEvents((prevEvents) => {
      console.log(newEvent.index)
      if (newEvent.index !== null) {
        // Update existing event
        return prevEvents.map((event) =>
          event.index === newEvent.index ? { ...event, ...newEvent } : event
        );
      }

      // Add new event
      if(prevEvents.length >= 14) {
        alert('You can only add 14 events');
        return prevEvents;
      } else {
         return [...prevEvents, { ...newEvent, index: uuidv4() }];  //single line of code changed
      }
     
    });
  };

  // Handle event deletion
  const handleDeleteEvent = (indexToDelete) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.index !== indexToDelete));
  };

  // Handle checkbox toggle

  const handleCheckEvent = (indexToCheck) => {
    setEvents((prevEvents) => prevEvents.map ((evt) => evt.index === indexToCheck ? {...evt, checked: !evt.checked } : evt) );
  }

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Todo
              events={events}
              onAddEvent={handleAddEvent}
              onDeleteEvent={handleDeleteEvent}
              onCheckEvent={handleCheckEvent}
              
            />
          }
        />
        <Route
          path="/add-event"
          element={<AddEvent onAddEvent={handleAddEvent} events={events} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
