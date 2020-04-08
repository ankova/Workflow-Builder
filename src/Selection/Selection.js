import React, { useState } from 'react';
import Connector from '../Connector/Connector';

// import './Selector.css';
const Selecton = (props) => {

    const {eventBus} = props;
    const [ selectedEvents, setSelectedEvents ] = useState([]);

    function allowDrop(ev) {
        ev.preventDefault();
    }
    
    function drop(ev) {
        ev.preventDefault();
        var eventData = JSON.parse(ev.dataTransfer.getData("connector"));
        setSelectedEvents([...selectedEvents, {connector: eventData.connector}]);
        eventBus.emit("selected", eventData);
    }
    return (
        <div className="Selection"
            onDrop={(event) => drop(event)} 
            onDragOver={(event) => allowDrop(event)}>

            {selectedEvents.map((ev,i) =>
            <Connector key={i} {...ev} />
            )}
        </div>
    )
};

export default Selecton;