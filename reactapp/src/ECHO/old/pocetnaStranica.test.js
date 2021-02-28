import React from "react";
import PocetnaStranica from "./pocetnaStranica";

import { shallow } from "enzyme";

it("renderuje formu za prikaz pocetne stranice", () => {
  const component = shallow(<PocetnaStranica />);
  expect(component).toMatchSnapshot();
});

it("postoje li prikazi opcija za administratora", () => {
  const wrapper = shallow(<PocetnaStranica />);
  expect(wrapper.find("#adminDiv").exists()).toBe(true);
});

it("postoje li prikazi za opciju sale", () => {
  const wrapper = shallow(<PocetnaStranica />);
  expect(wrapper.find("#saleDiv").exists()).toBe(true);
});

it("postoje li prikazi opcija za profesora", () => {
  const wrapper = shallow(<PocetnaStranica />);
  expect(wrapper.find("#profDiv").exists()).toBe(true);
});
