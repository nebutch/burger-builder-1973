import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import App from './App';

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('<App />', () => {
    it('should render without error', () => {
        const wrapper = shallow(<App />);
        expect(wrapper).toBeTruthy();
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
