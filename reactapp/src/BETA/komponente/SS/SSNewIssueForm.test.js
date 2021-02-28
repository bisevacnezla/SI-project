import React from "react";

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';

import SSNewIssueForm from "./SSNewIssueForm";

Enzyme.configure({ adapter: new Adapter()});

it("Postoji li button send?", () => {
    const wrapper = shallow(<SSNewIssueForm />);
    expect(wrapper.find("#buttonSend").exists()).toBe(true);
});

it("Postoji li button X?", () => {
    const wrapper = shallow(<SSNewIssueForm />);
    expect(wrapper.find("#closeIssueForm").exists()).toBe(true);
});

