import React from 'react';
import { act } from "react-dom/test-utils";
import { mount } from 'enzyme';

import Selection from './Selection';

describe('Selection component', () => {
  it('renders without crashing', () => {
    const wrapper = mount(<Selection />);
    const selectionHtml = wrapper.find('.Selection').html();

    expect(wrapper).toBeDefined();
    expect(selectionHtml).toBeDefined();
  });
  
  it('emits the dropped event to the eventBus', () => {
    const mockEventBus = {
      emit: jest.fn()
    };

    const wrapper = mount(<Selection eventBus={mockEventBus} />);
    const selectionHtml = wrapper.find('.Selection').html();

    const eventData = {
      coords: {x:100, y:100},
      connector: {
        "iconURL": "redshift.png",
        "name": "Redshift"
      }
    }
    const dropArgs =  {
      preventDefault: () => true,
      dataTransfer : { 
        getData: () => JSON.stringify(eventData)
      }
    };

    act(() => {
        wrapper.find('.Selection').simulate('drop', dropArgs);
      });

    expect(mockEventBus.emit).toHaveBeenCalled();
    expect(mockEventBus.emit).toHaveBeenCalledWith('selected', eventData);
  });
});

