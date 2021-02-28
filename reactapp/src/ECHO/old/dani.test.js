import React from "react";
import Dani from "./dani.js";
import { shallow } from "enzyme";

it("renderuje formu za prikaz odredjenog dana", () => {
  const component = shallow(<Dani />);
  expect(component).toMatchSnapshot();
});
it("postoji li button za sljedeci dan", () => {
  const wrapper = shallow(<Dani />);
  expect(wrapper.find("#Sljedeci").exists()).toBe(true);
});
it("postoji li button za prethodni dan", () => {
  const wrapper = shallow(<Dani />);
  expect(wrapper.find("#Prethodni").exists()).toBe(true);
});
it("postoji li tabela prikaza termina za odabrani dan", () => {
  const wrapper = shallow(<Dani />);
  expect(wrapper.find("#tabelica").exists()).toBe(true);
});
