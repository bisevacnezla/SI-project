import React from "react";
import PrikaziSaleForma from './PrikaziSaleForma';
import { mount, shallow, render } from "enzyme";

it("Da li se prikazuju komponente", () => {
  const component = shallow(<PrikaziSaleForma />);
  expect(component).toMatchSnapshot();
});

it("Da li postoji select koji prikazuje sve sale", () => {
    const wrapper = shallow(<PrikaziSaleForma/>);
    expect(wrapper.find("#naslovSelect").exists()).toBe(true);
  });

  it("Da li postoji dugme za zatvaranje forme", () => {
    const wrapper = shallow(<PrikaziSaleForma/>);
    expect(wrapper.find("#zatvoriDugme").exists()).toBe(true);
  });
