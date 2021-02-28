import React from "react";
import DodajNovuSalu from './DodajNovuSalu';
import { mount, shallow, render } from "enzyme";

it("Da li se prikazuju komponente", () => {
  const component = shallow(<DodajNovuSalu />);
  expect(component).toMatchSnapshot();
});

it("Da li postoji radiobutton", () => {
    const wrapper = shallow(<DodajNovuSalu />);
    expect(wrapper.find("#da").exists()).toBe(true);
  });

it("Da li postoji radiobutton", () => {
    const wrapper = shallow(<DodajNovuSalu />);
    expect(wrapper.find("#ne").exists()).toBe(true);
  });