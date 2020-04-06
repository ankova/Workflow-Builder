import React, { Component, useState, useEffect, useContext } from 'react';
import EventEmitter from './include/builder-squad-event-emitter';
import Connector from './Connector/Connector';
import './App.css';

const App = () => {
  // const [ receivedEvents, setReceiedEvents ] = useState([]);

  return (
    <div className="App">
      <EventEmitter>
        <Connector />
      </EventEmitter>
    </div>
  );
}

export default App;
