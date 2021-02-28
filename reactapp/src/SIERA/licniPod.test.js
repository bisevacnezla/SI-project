import React from "react";
import {shallow} from "enzyme";
import LicniPod from "./licniPod";

describe('<LicniPod/>', ()=>{
    it("postoji dugme za izmjene", ()=>{
        const wrapper = shallow(<LicniPod/>)
        expect(wrapper.find("#editBtn").exists()).toBe(true);
    })
});