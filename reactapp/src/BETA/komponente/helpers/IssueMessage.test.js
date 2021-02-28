import React from "react";

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';

import IssueMessage from "./IssueMessage";

Enzyme.configure({ adapter: new Adapter()});

it("Postoji li div za id, datum i vrijeme poruke?", () => {
    const wrapper = shallow(<IssueMessage />);
    expect(wrapper.find("#BETA_divIDVrijeme").exists()).toBe(true);
});

it("Postoji li div za tekst poruke?", () => {
    const wrapper = shallow(<IssueMessage />);
    expect(wrapper.find("#BETA_divMessageText").exists()).toBe(true);
});