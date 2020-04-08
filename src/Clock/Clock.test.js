import React from 'react';
import { mount } from 'enzyme';
import moment, { updateLocale } from 'moment';

import Clock from './Clock';

jest.useFakeTimers();

describe('Connector component', () => {
    it('renders without crashing', () => {
        const wrapper = mount(<Clock />);
        const currentTime = moment().format("HH:mm:ss.S");

        expect(wrapper).toBeDefined();
        expect(wrapper.find('.Clock')).toBeDefined();
        expect(wrapper.find('.Clock').text()).toBe(currentTime);
      });
      
      it('checks if clock timing is set', () => {
        expect(setInterval).toHaveBeenCalled();
        expect(setInterval).toHaveBeenCalledTimes(1);
        expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000);
        expect(clearInterval).toHaveBeenCalled();
        expect(clearInterval).toHaveBeenCalledTimes(1);
      });
});