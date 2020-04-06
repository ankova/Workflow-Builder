import React, { Component, useState } from 'react';

import './Connector.css';

const Connector = ({"data-tray": {coords, connector}}) => {
      
    return (
        connector &&
        <div className='Connector' style={{left: coords.x, top: coords.y}}>
            <img width='20px' src={connector.iconURL}/>
            {connector.name}
        </div>
            || null
    )
}

export default Connector;