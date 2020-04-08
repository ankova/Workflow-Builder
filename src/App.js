import React, { useState, useEffect, Fragment } from 'react';
import Connector from './Connector/Connector';
import Selection from './Selection/Selection';

import './App.css';
import Selecton from './Selection/Selection';

const App = (props) => {
  const {eventBus} = props;

  const [ receivedEvents, setReceiedEvents ] = useState([]);
  const [ selectedEvents, setSelectedEvents ] = useState([]);

  {/* Set drop event handlers and update state */}
  function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drop(ev) {
    ev.preventDefault();
    var datum = JSON.parse(ev.dataTransfer.getData("connector"));
    setSelectedEvents([...selectedEvents, {connector: datum.connector}]);
    setReceiedEvents(receivedEvents.filter(ev => ev.connector.name !== datum.connector.name))
  }

  {/* Watch on receivedEvents state changes */}
  useEffect(() => {
    const onReceive = (evt) => {
      if(evt.trayTrollSays) {
        console.log("Trolling: ", evt.trayTrollSays)
      } else {
        setReceiedEvents([...receivedEvents, evt]);
      }      
    };

    {/* Set event listener */}
    eventBus.on("event", onReceive);

    {/* Remove event listener when component unmounts */}
    return function cleanup() {
      eventBus.removeListener("event", onReceive)
    };
  
  },[receivedEvents]);

  return (
    <Fragment>
      {/* Connector visualizer */}
      <div className="App">
        {receivedEvents.map((ev,i) => <Connector key={i} {...ev} />)}
      </div>
      
      {/** Setting the connector list container */}
  
      <div className="Selection"
          onDrop={(event) => drop(event)} 
          onDragOver={(event) => allowDrop(event)}>

        {selectedEvents.map((ev,i) =>
          <Connector key={i} {...ev} />
        )}
      </div>
    </Fragment>
  );
}

export default App;
