import React from 'react';
import { configure } from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import  ListaGrupa  from './PrikazListeProjektnihGrupa';

describe('Odabir grupe iz liste projektnih grupa', () => {

    it('Da li rendera uspjesno', () => {
        shallow(<ListaGrupa/>);
    });
    

    it("Postoji li div za odabir grupe", () => {
        const wrapper = shallow(<ListaGrupa/>);
        expect(wrapper.find("div").exists()).toBe(true);
    });
    
});