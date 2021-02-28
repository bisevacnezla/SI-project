import React from "react";
import IspitiTabela from "./ispitiTabela";
import Enzyme, { shallow } from "enzyme";
import { render } from "enzyme";
import { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

it("postoji div", () => {
  const wrapper = shallow(<IspitiTabela />);
  expect(wrapper.find("div").exists()).toBeTruthy();
});

it("postoji tabela", () => {
  const wrapper = shallow(<IspitiTabela />);
  expect(wrapper.find("table").exists()).toBeTruthy();
});

it('tabela ima klasu "table"', () => {
  const wrapper = shallow(<IspitiTabela />);
  expect(
    wrapper
      .find("table")
      .first()
      .hasClass("table")
  ).toBeTruthy();
});

it("tabela ima tijelo", () => {
  const wrapper = shallow(<IspitiTabela />);
  expect(wrapper.find("tbody").exists()).toBeTruthy();
});

it("prvi red ima klasu table-success", () => {
  const wrapper = shallow(<IspitiTabela />);
  const rows = wrapper.find("tr");
  const prviRed = rows.first().hasClass("bg-primary");
  expect(prviRed).toBeTruthy();
});

it('prvo zaglavlje tabele ima tekst koji sadrzi rijec "Akademska godina"', () => {
  const wrapper = shallow(<IspitiTabela />);
  const rows = wrapper.find("tr");
  const prvoZaglavlje = rows
    .first()
    .find("th")
    .text()
    .includes("Akademska godina");
  expect(prvoZaglavlje).toBe(true);
});

it("postoji celija", () => {
  const wrapper = shallow(<IspitiTabela />);
  const celija = wrapper.find("th");
  expect(celija.exists()).toBeTruthy();
});
