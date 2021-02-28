import React from "react";

 import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';

 import IssueListSS from "./IssueListSS.js";

 
Enzyme.configure({ adapter: new Adapter()});

it("Postoji li kategorizirana lista sa brojem upita u svakoj kategoriji ?", () => { 
    const wrapper = shallow(<IssueListSS/>);
    expect(wrapper.find("#issue-tabs-Spinner").exists()).toBe(true);       
}); 

 