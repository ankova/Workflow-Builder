import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import EventEmitter from './include/builder-squad-event-emitter';

import App from './App';
import Clock from './Clock/Clock';
import User from './User/User';

import './index.css';

ReactDOM.render(
  <Fragment>
    <User name='Aneta'/>
    <Clock />
    <EventEmitter>
      <App />
    </EventEmitter>
  </Fragment>,

  document.getElementById('root')
);
