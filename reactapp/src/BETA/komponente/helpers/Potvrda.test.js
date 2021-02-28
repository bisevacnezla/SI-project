import React from "react";

 import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';

 import Potvrda from "./Potvrda.js";


Enzyme.configure({ adapter: new Adapter()});

it("Postoji li Obavjestenje o uspješno poslanom upitu ?", () => { 
    const wrapper = shallow(<Potvrda
        key={0}
        successful="true"
        msg="Uspješno ste poslali odgovor"
    />);
    expect(wrapper.find("#PopUp-Beta").exists()).toBe(true);   
}); 

 