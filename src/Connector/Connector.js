import React, { Component, useState } from 'react';
import classNames from "classnames";

import './Connector.css';

const Connector = ({coords, connector}) => {

    /* Set drag event handler */
    function drag(event, datum) {
        event.dataTransfer.setData("connector", JSON.stringify(datum));
    }

    return (
        /* Make it draggable and change the class name based on the passed properties */
        <div 
        /* eslint-disable */
            className={classNames('Connector', {"absolute-position": !!coords}) }
            style={ coords && {left: coords.x, top: coords.y} || {}}
            draggable="true" onDragStart={(event) => drag(event, {coords, connector})}
            >
            <img width='20px' src={connector.iconURL}/>
            {connector.name}
        </div>
    )
}

export default Connector;