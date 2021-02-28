import React from 'react';
import ReactDOM from 'react-dom';
import Rezultati from './app';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';

Enzyme.configure({ adapter:new Adapter()}); 
/* it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
}); */
it("Postoji li info o anketi", () => {
  const wrapper = shallow(<Rezultati />);
  expect(wrapper.find("#info").exists());
});
it("Postoji li rezultati ankete", () => {
  const wrapper = shallow(<Rezultati />);
  expect(wrapper.find("#show").exists());
});
