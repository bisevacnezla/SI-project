import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AnketePocetna from './pocetna';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
it("Postoji li button za kreiranje ankete", () => {
  const wrapper = shallow(<AnketePocetna />);
  expect(wrapper.find("#kreiranje").exists()).toBe(true);
});
it("Postoji li button za popunjavanje ankete", () => {
  const wrapper = shallow(<AnketePocetna />);
  expect(wrapper.find("#popunjavanje").exists()).toBe(true);
});
it("Postoji li button za prikaz mojih anketa", () => {
  const wrapper = shallow(<AnketePocetna />);
  expect(wrapper.find("#mojeAnkete").exists()).toBe(true);
});
it("Postoji li button za prikaz javnih anketa", () => {
  const wrapper = shallow(<AnketePocetna />);
  expect(wrapper.find("#javneAnkete").exists()).toBe(true);
});
it("Postoji li button za prikaz rezultata", () => {
  const wrapper = shallow(<AnketePocetna />);
  expect(wrapper.find("#rezultati").exists()).toBe(true);
});