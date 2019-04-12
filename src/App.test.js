import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('<App />', () => {
    it('should render without error', () => {
        const wrapper = shallow(<App />);
        expect(wrapper).toBeDefined();
    });

    /* it('should render one img node', () => {
      const wrapper = shallow(<App />);
      expect(wrapper.find('<CoreLayout />')).toBeTruthy();
  }); */

    /* it('should have a className', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.prop('className')).toBeTruthy();
    }); */
});
