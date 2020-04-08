import React, { useState, useEffect, Fragment } from 'react';
import Connector from '../Connector/Connector';
import Selection from '../Selection/Selection';

import './App.css';

const App = (props) => {
  const {eventBus} = props;

  const [ receivedEvents, setReceiedEvents ] = useState([]);

  {/* Watch on receivedEvents state changes */}
  useEffect(() => {
    const onReceive = (evt) => {
      if(evt.trayTrollSays) {
        console.log("Trolling: ", evt.trayTrollSays)
      } else {
        setReceiedEvents([...receivedEvents, evt]);
      }      
    };
    const onSelected = (evt) => {
      setReceiedEvents(receivedEvents.filter(ev => ev.connector.name !== evt.connector.name))
    }

    {/* Set event listener */}
    eventBus.on("event", onReceive);
    eventBus.on("selected", onSelected);

    {/* Remove event listener when component unmounts */}
    return function cleanup() {
      eventBus.removeListener("event", onReceive);
      eventBus.removeListener("selected", onSelected)
    };
  
  },[receivedEvents]);

  return (
    <Fragment>
      {/* Connector visualizer */}
      <div className="App">
        {receivedEvents.map((ev,i) => <Connector key={i} {...ev} />)}
      </div>
      
      {/** Setting the connector list container */}
      <Selection eventBus={eventBus} />
    </Fragment>
  );
}

export default App;
