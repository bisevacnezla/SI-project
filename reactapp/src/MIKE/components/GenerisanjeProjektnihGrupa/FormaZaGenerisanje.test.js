import React from 'react';
import GenerisanjeProjektneGrupe from './FormaZaGenerisanje'
import Enzyme, { configure, shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
 

Enzyme.configure({ adapter: new Adapter() });

it("Da li se prikazuju komponente", ()=> {
    const component=shallow(<GenerisanjeProjektneGrupe />);
    expect(component).toMatchSnapshot();
});

it("Da li postoji forma za generisanje projektne grupe", ()=> {
    const wrapper=shallow(<GenerisanjeProjektneGrupe />);
    expect(wrapper.find("#formaGenerisanje")).toBeDefined();
});

it("Da li postoji select koji prikazuje predmete za koje je moguce kreirati projektnu grupu", ()=> {
    const wrapper=shallow(<GenerisanjeProjektneGrupe />);
    expect(wrapper.find("#selectPredmeti")).toBeDefined();
 
});

it("Da li je omogucen odabir broja studenata po grupi", ()=> {
    const wrapper=shallow(<GenerisanjeProjektneGrupe />);
    expect(wrapper.find("#brojStudenata")).toBeDefined();
 
});

it("Da li je omogucen odabir redoslijeda generisana studenata po grupi", ()=> {
    const wrapper=shallow(<GenerisanjeProjektneGrupe />);
    expect(wrapper.find("#checkbox")).toBeDefined();
 
});

