import React from 'react';
import OdabirDana from './OdabirDana.js';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });
it("Prikazuje formu za prikaz odabira dana", () => {
  const component = shallow(<OdabirDana />);
  expect(component).toMatchSnapshot();
});
it("Postoji li button za generisanje rasporeda", () => {
  const wrapper = shallow(<OdabirDana />);
  expect(wrapper.find("#generisi").exists()).toBe(true);
});
it("Postoji li div za ponedjeljak", () => {
  const wrapper = shallow(<OdabirDana />);
  expect(wrapper.find("#pon").exists()).toBe(true);
});
it("Postoji li div za utorak", () => {
    const wrapper = shallow(<OdabirDana />);
    expect(wrapper.find("#uto").exists()).toBe(true);
});
it("Postoji li div za srijedu", () => {
    const wrapper = shallow(<OdabirDana />);
    expect(wrapper.find("#sri").exists()).toBe(true);
});
it("Postoji li div za cetvrtak", () => {
    const wrapper = shallow(<OdabirDana />);
    expect(wrapper.find("#cet").exists()).toBe(true);
});
it("Postoji li div za petak", () => {
    const wrapper = shallow(<OdabirDana />);
    expect(wrapper.find("#pet").exists()).toBe(true);
});
it("Postoji li button za unos", () => {
    const wrapper = shallow(<OdabirDana />);
    expect(wrapper.find("#b1").exists()).toBe(true);
});
it("Postoji li button za ponistavanje", () => {
    const wrapper = shallow(<OdabirDana />);
    expect(wrapper.find("#b6").exists()).toBe(true);
});
