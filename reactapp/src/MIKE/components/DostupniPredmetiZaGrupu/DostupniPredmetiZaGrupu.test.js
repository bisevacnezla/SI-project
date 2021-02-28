import React from 'react';
import ReactDOM from 'react-dom';
import { configure } from 'enzyme';
import { mount, shallow, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import DostupniPredmetiZaGrupu from './DostupniPredmetiZaGrupu';

describe('PregledZadatakaProjekta', () => {

    it('Da li rendera uspjesno', () => {
        const div = document.createElement('div');
        ReactDOM.render(<DostupniPredmetiZaGrupu/>, div);
        ReactDOM.unmountComponentAtNode(div);
      });

    it("Postoji li select za odabir predmeta", () => {
        const wrapper = shallow(<DostupniPredmetiZaGrupu />);
        expect(wrapper.find("Input").exists()).toBe(true);
    });

    it("Postoji li forma", () => {
        const wrapper = shallow(<DostupniPredmetiZaGrupu/>);
        expect(wrapper.find("Form").exists()).toBe(true);
    });

    it("Postoji li bar jedan option unutar selecta", () => {
        const wrapper = shallow(<DostupniPredmetiZaGrupu/>);
        expect(wrapper.find("option").exists()).toBe(true);
    });

    it("Postoji li tabela za prikaz projekata", () => {
        const wrapper = shallow(<DostupniPredmetiZaGrupu/>);
        expect(wrapper.find("Table").exists()).toBe(true);
    });

    it("Da li select ima 1 opciju (testni podaci)", () => {
        const wrapper = shallow(<DostupniPredmetiZaGrupu/>);
        expect(wrapper.find("Input").children().length).toBe(1);
    });
    
    it("Da li tabela ima 1 red (testni podaci)", () => {
        const wrapper = shallow(<DostupniPredmetiZaGrupu/>);
        expect(wrapper.find("tbody").children().length).toBe(1);
    });
});
