import React from "react";
import UgovorOUcenju from "./ugovorOUcenju";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

it("postoji labela za izborne predmete", () => {
  const wrapper = shallow(<UgovorOUcenju />);
  const labela = wrapper.find("label").at(3);
  expect(labela.text().includes("Izborni predmeti")).toBe(true);
});

it("postoji paragraf", () => {
  const wrapper = shallow(<UgovorOUcenju />);
  const paragraf = wrapper.find("p").at(0);
  expect(paragraf.text().includes("Nema izbornih predmeta")).toBe(true);
});
