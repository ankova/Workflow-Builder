import React from 'react';
import { act } from "react-dom/test-utils";

import { mount } from 'enzyme';

import Connector from '../Connector/Connector'
import App from './App';

describe('App component', () => {

  it('renders without crashing', () => {
    const dummyEventBus = { 
      on(){}, 
      removeListener(){}
    }
    const wrapper = mount(<App eventBus={dummyEventBus} />);
    const appHtml = wrapper.find('.App').html();
    const selectionHtml = wrapper.find('.Selection').html();

    expect(wrapper).toBeDefined();
    expect(appHtml).toBeDefined();
    expect(selectionHtml).toBeDefined();
  });
  
  it('hooks into the eventBus\' *on* and cleans up', () => {
    const mockEventBus = {
        on: jest.fn(()=>{}),    
        removeListener: jest.fn()
    }
    const wrapper = mount(<App eventBus={mockEventBus} />);
    const appHtml = wrapper.find('.App').html();
    expect(mockEventBus.on).toHaveBeenCalled();
    expect(mockEventBus.on.mock.calls[0][0]).toBe('event');

    wrapper.unmount();
    expect(mockEventBus.removeListener).toHaveBeenCalled();

  });
  
  it('adds emitted events to local state', () => {
    let callback;
    const mockEventBus = {
        on: jest.fn((ev, cb) => {
            if(ev === "event") {
              callback = cb;
            }
          }),
        removeListener: jest.fn(),
    };

    const mockEvents = [...Array(3).keys()].map((i) => ({
      coords: {x: i, y:i },
      connector: {
        "iconURL": `image-${i}.png`,
        "name": "Redshift"
      }
    }));
   
    const wrapper = mount(<App eventBus={mockEventBus} />);

    mockEvents.forEach(ev => act(() => {
      callback(ev);
    })); 

    wrapper.update();
    expect(wrapper.find('.Connector').length).toBe(3);
    expect(mockEventBus.on).toHaveBeenCalled();
  });
});

