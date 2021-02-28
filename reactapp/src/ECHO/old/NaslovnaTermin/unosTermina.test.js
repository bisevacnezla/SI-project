import React from "react";
import UnosTermina from "./unosTermina";
import { mount, shallow, render } from "enzyme";

it("Da li se prikazuje poruka o uspjesnom unosu", () => {
  const wrapper = shallow(<UnosTermina />);
  expect(wrapper.find("#alertID").exists()).toBe(true);
});
