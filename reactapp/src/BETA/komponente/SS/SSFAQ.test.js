import React from "react";

 import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';

 import SSFAQ from "./SSFAQ.js";


Enzyme.configure({ adapter: new Adapter()});

it("Postoji li faq lista ?", () => { 
    const wrapper = shallow(<SSFAQ/>);
    expect(wrapper.find("#listaFAQBeta").exists()).toBe(true);  
}); 

it("Postoji li button za objavljivanje novog faq ?", () => { 
    const wrapper = shallow(<SSFAQ/>);
    expect(wrapper.find("#buttonObjaviFaq").exists()).toBe(true);  
}); 

it("Postoji li labela za naslov ?", () => { 
    const wrapper = shallow(<SSFAQ/>);
    expect(wrapper.find("#FAQGlavniNaslov").exists()).toBe(true);  
}); 


 