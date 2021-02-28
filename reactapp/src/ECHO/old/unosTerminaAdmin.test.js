import React from "react";
import UnosTermina from "./unosTermina";
import UnosTerminaAdmin from "./unosTerminaAdmin";
import { mount, shallow, render } from "enzyme";
import "../setupTests.js";

it("Da li se prikazuju komponente", () => {
  const component = shallow(<UnosTerminaAdmin />);
  expect(component).toMatchSnapshot();
});

it("Da li ima prikaz radnih dana za odabir u formi", () => {
  const strings = ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"];
  const component = shallow(<UnosTerminaAdmin list={strings} />);
  expect(component).toMatchSnapshot();
});
/*
it("Da li ima input za unos vremena", () => {
  const wrapper = shallow(<UnosTerminaAdmin />);
  expect(wrapper.find("#satnica").exists()).toBe(true);
});
*/
/*
it("Da li ima input za unos broja časova", () => {
  const wrapper = shallow(<UnosTerminaAdmin />);
  expect(wrapper.find("#brCasova").exists()).toBe(true);
});
*/

it("Da li ispisuje pravilno ime i prezime profesora", () => {
    const wrapper = shallow(<UnosTerminaAdmin text="Ime Prezimovic" />);
    const tekst = <h3> Izabrani profesor: Ime Prezimovic </h3>;
    // expect(wrapper.contains(welcome)).toBe(true);
    expect(wrapper.contains(tekst)).toEqual(true);
});