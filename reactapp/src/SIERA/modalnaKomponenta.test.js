import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ModalnaKomponenta from "./modalnaKomponenta";
import Modal from "react-bootstrap/Modal";
import { jsxEmptyExpression } from "@babel/types";

Enzyme.configure({ adapter: new Adapter() });

it("postoji modal", () => {
  const wrapper = shallow(<ModalnaKomponenta />);
  expect(wrapper.find(Modal).exists()).toBeTruthy();
});

it("postoji input polje", () => {
  const wrapper = shallow(<ModalnaKomponenta />);
  expect(wrapper.find("input").exists()).toBeTruthy();
});

it("postoji dugme za slanje zahtjeva", () => {
  const wrapper = shallow(<ModalnaKomponenta />);
  const button = wrapper.find("button").first();
  expect(button.text().includes("Pošalji zahtjev")).toBe(true);
});

it("postoji dugme za zatvaranje", () => {
  const wrapper = shallow(<ModalnaKomponenta />);
  const button = wrapper.find("button");
  expect(
    button
      .at(1)
      .text()
      .includes("Zatvori")
  ).toBe(true);
});
