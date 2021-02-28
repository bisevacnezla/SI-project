import React from "react";

 import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';

 import FAQ from "./FAQ.js";


Enzyme.configure({ adapter: new Adapter()});

it("Postoji li faq lista ?", () => { 
    const wrapper = shallow(<FAQ/>);
    expect(wrapper.find("#listaFAQBeta").exists()).toBe(true);   
}); 

 