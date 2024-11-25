import React, { useState } from "react";
import { Link } from 'react-router-dom';
import './Todo.css';
import EventStatus from "./EventStatus/EventStatus";

import Calender from "./Calender/Calender";

function Todo({ events, onDeleteEvent, onCheckEvent }) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [showCalender, setShowCalender] = useState(true);
  
    const handlePrevMonth = () => {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    };
  
    const handleNextMonth = () => {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    };


  
    return (
      <div>
        <div className="container">
          <main>
            <center>
               <button className="toggle-calender" onClick={() => setShowCalender(!showCalender) }>{showCalender ? "Hide Calender" : "Show Calender"}</button>
            </center>
            <div className= { showCalender ? "calendar" : "hide-calender"}>
              <h2>
                <button onClick={handlePrevMonth}>&lt;</button>
                {currentDate.toLocaleString("default", { month: "long" })}{" "}
                {currentDate.getFullYear()}
                <button onClick={handleNextMonth}>&gt;</button>
              </h2>
  
              
                
                <div className="days">
                <Calender currentDate={currentDate} events={events} />
              </div>
            </div>
            <div className="schedule">
            
  <EventStatus
    events={events}
    onCheckEvent={onCheckEvent}
    onDeleteEvent={onDeleteEvent}
  />

              {/* {events.map((event, index) => (
                <EventDetails
                  key={index}
                  index={index}
                  title={event.title}
                  details={event.details}
                  time={event.time}
                  checked={event.checked}
                  notes={event.notes}
                  onEditEvent={onEditEvent}
                  onDeleteEvent={onDeleteEvent}
                  onCheckEvent={onCheckEvent}
                />
              ))} */}
            </div>
          </main>
          <Link to="/add-event">
            <div className="add-event">
              <i className="bi bi-plus-lg" aria-label="Add Event"></i>
            </div>
          </Link>
        </div>
      </div>
    );
  }
  
  export default Todo;