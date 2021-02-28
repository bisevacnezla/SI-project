import React from "react";

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';

import IssueMessageSS from "./IssueMessageSS";

Enzyme.configure({ adapter: new Adapter()});

it("Postoji li div za id, datum i vrijeme poruke?", () => {
    const wrapper = shallow(<IssueMessageSS />);
    expect(wrapper.find("#BETA_divIDVrijemeSS").exists()).toBe(true);
});

it("Postoji li div za tekst poruke?", () => {
    const wrapper = shallow(<IssueMessageSS />);
    expect(wrapper.find("#BETA_divMessageTextSS").exists()).toBe(true);
});