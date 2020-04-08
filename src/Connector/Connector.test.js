import React from 'react';
import { act } from "react-dom/test-utils";

import { mount } from 'enzyme';

import Connector from './Connector';

describe('Connector component', () => {
    let wrapper, eventData;

    beforeEach(() => {
        eventData = {
            coords: {x:100, y:100},
            connector: {
              "iconURL": "redshift.png",
              "name": "Redshift"
            }
          };
          wrapper = mount(<Connector {...eventData} />);
    })
    it('renders without crashing', () => {
      const connectorHtml = wrapper.find('.Connector').html();
  
      expect(wrapper).toBeDefined();
      expect(connectorHtml).toBeDefined();
    });

    it('checks if drag event works as expected', () => {
        const dragArgs =  {
            preventDefault: () => true,
            dataTransfer : { 
              setData: jest.fn()
            }
          };
        act(() => {
            wrapper.find('.Connector').simulate('dragstart', dragArgs);
        });

        expect(dragArgs.dataTransfer.setData).toHaveBeenCalled();
        expect(dragArgs.dataTransfer.setData).toHaveBeenCalledWith('connector', JSON.stringify(eventData));
    });
});