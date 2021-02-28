import React from "react";
import UgovorOUcenju from "./ugovorOUcenju";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

it("postoji prvi select", () => {
  const wrapper = shallow(<UgovorOUcenju />);
  expect(
    wrapper
      .find("select")
      .first()
      .hasClass("custom-select")
  ).toBeTruthy();
});

it("postoji drugi select", () => {
  const wrapper = shallow(<UgovorOUcenju />);
  expect(
    wrapper
      .find("select")
      .at(1)
      .hasClass("custom-select")
  ).toBeTruthy();
});

it("postoji treci select", () => {
  const wrapper = shallow(<UgovorOUcenju />);
  expect(
    wrapper
      .find("select")
      .at(2)
      .hasClass("custom-select")
  ).toBeTruthy();
});

it("postoji labela za unos godine studija", () => {
  const wrapper = shallow(<UgovorOUcenju />);
  const labela = wrapper.find("label").at(0);
  expect(labela.text().includes("Godina studija")).toBe(true);
});

it("postoji labela za unos smjera", () => {
  const wrapper = shallow(<UgovorOUcenju />);
  const labela = wrapper.find("label").at(1);
  expect(labela.text().includes("Smjer")).toBe(true);
});

it("postoji labela za unos godine studija", () => {
  const wrapper = shallow(<UgovorOUcenju />);
  const labela = wrapper.find("label").at(2);
  expect(labela.text().includes("Semestar")).toBe(true);
});
