import React from 'react';
import ReactDOM from 'react-dom';
import { configure } from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import  KreiranjeProjekta  from './FormaZaKreiranjeProjektaNaNivouPredmeta';

describe('Kreiranje projekta na nivou predmeta ', () => {

    it('Da li rendera uspjesno', () => {
        shallow(<KreiranjeProjekta/>);
      });

    it("Postoji li input za upis naziva projekta", () => {
        const wrapper = shallow(<KreiranjeProjekta/>);
        expect(wrapper.find("input[type='text']").exists()).toBe(true);
    });

    it("Postoji li select za odabir asistenta", () => {
        const wrapper = shallow(<KreiranjeProjekta/>);
        expect(wrapper.find("#pickupAssistent").exists()).toBe(true);
    });

    it("Postoji li bar jedan option unutar selecta za odabir asistenta", () => {
        const wrapper = shallow(<KreiranjeProjekta/>);
        expect(wrapper.find("option").exists()).toBe(true);
    });

    it("Postoji li polje za unos bodova", () => {
        const wrapper = shallow(<KreiranjeProjekta/>);
        expect(wrapper.find("#bodovi").exists()).toBe(true);
    });
    
    it("Postoji li submit dugme", () => {
        const wrapper = shallow(<KreiranjeProjekta/>);
        expect(wrapper.find("input[type='submit']").exists()).toBe(true);
    });

});