import React from "react";

 import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';

 import IssueList from "./issueList.js";

 
Enzyme.configure({ adapter: new Adapter()});

it("Postoji li kategorizirana lista sa brojem upita u svakoj kategoriji ?", () => { 
    const wrapper = shallow(<IssueList/>);
    expect(wrapper.find("#issue-tabs-Spinner").exists()).toBe(true);       
}); 

 