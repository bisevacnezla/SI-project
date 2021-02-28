import React from "react";
import UnosTermina from "./unosTermina";
import { mount, shallow, render } from "enzyme";

it("Da li se prikazuju komponente", () => {
  const component = shallow(<UnosTermina />);
  expect(component).toMatchSnapshot();
});

it("Da li ima prikaz radnih dana za odabir u formi", () => {
  const strings = ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"];
  const component = shallow(<UnosTermina list={strings} />);
  expect(component).toMatchSnapshot();
});

it("Da li ima input za unos vremena", () => {
  const wrapper = shallow(<UnosTermina />);
  expect(wrapper.find("#satnica").exists()).toBe(true);
});

it("Da li ima input za unos broja časova", () => {
  const wrapper = shallow(<UnosTermina />);
  expect(wrapper.find("#brCasova").exists()).toBe(true);
});
