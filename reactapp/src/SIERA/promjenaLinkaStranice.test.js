import React from "react";
import Stranice from "./stranice";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

it("postoji dugme za izmjenu", () => {
  const wrapper = shallow(<Stranice />);
  const button = wrapper.find("button").first();
  expect(button.text().includes("Edit")).toBe(true);
});
