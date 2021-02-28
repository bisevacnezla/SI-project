import React from "react";
import TabelaSortiranaPoBrojuIspita from "./tabelaSortiranaPoBrojuIspita";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

it("postoji prvi div", () => {
  const wrapper = shallow(<TabelaSortiranaPoBrojuIspita />);
  expect(
    wrapper
        .find("div")
        .first()
        .hasClass("col-sm-12")
    ).toBeTruthy();
});

it("postoji span", () => {
    const wrapper = shallow(<TabelaSortiranaPoBrojuIspita />);
    expect(
        wrapper
            .find("span")
            .exists()
    ).toBeTruthy();
});
