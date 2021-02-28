import React from "react";
import PrikazTermina from "./prikazTermina";

import { shallow } from "enzyme";

it("renderuje formu za prikaz odredjenog dana", () => {
  const component = shallow(<PrikazTermina />);
  expect(component).toMatchSnapshot();
});
it("postoje li prikazi liste termina za ponedjeljak", () => {
  const wrapper = shallow(<PrikazTermina />);
  expect(wrapper.find("#Ponedjeljak").exists()).toBe(true);
});
it("postoje li prikazi liste termina za utorak", () => {
  const wrapper = shallow(<PrikazTermina />);
  expect(wrapper.find("#Utorak").exists()).toBe(true);
});
it("postoje li prikazi liste termina za srijedu", () => {
  const wrapper = shallow(<PrikazTermina />);
  expect(wrapper.find("#Srijeda").exists()).toBe(true);
});
it("postoje li prikazi liste termina za četvrtak", () => {
  const wrapper = shallow(<PrikazTermina />);
  expect(wrapper.find("#Cetvrtak").exists()).toBe(true);
});
it("postoje li prikazi liste termina za petak", () => {
  const wrapper = shallow(<PrikazTermina />);
  expect(wrapper.find("#Petak").exists()).toBe(true);
});
