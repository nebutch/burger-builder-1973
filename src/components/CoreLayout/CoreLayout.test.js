import React from 'react';
import { shallow, mount } from 'enzyme';
import CoreLayout from './CoreLayout';

it('should render without error', () => {
    const wrapper = shallow(<CoreLayout />);
    expect(wrapper).toBeDefined();
});

it('should have one main node', () => {
    const wrapper = mount(<CoreLayout />);
    expect(wrapper.find('main')).toHaveLength(1);
});

it('should have one div node', () => {
    const wrapper = mount(<CoreLayout />);
    expect(wrapper.find('div')).toHaveLength(1);
});

/* it('should render one img node', () => {
      const wrapper = shallow(<App />);
      expect(wrapper.find('<CoreLayout />')).toBeTruthy();
  }); */

/* it('should have a className', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.prop('className')).toBeTruthy();
    }); */
