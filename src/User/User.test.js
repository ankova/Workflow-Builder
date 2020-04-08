import React from 'react';
import { shallow } from 'enzyme';

import User from './User';

describe('Connector component', () => {
    it('renders without crashing', () => {
        const props = {name: 'Test'};
        const wrapper = shallow(<User {...props} />);

        expect(wrapper).toBeDefined();
        expect(wrapper.find('h2').text()).toBe("Test\'s visualizer");
      });
});