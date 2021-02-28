import React from 'react';
import IzborVodje  from './FormaZaIzborVodje';
import Enzyme, { configure, shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
 

Enzyme.configure({ adapter: new Adapter() });

it("Da li se prikazuju komponente", ()=> {
    const component=shallow(<IzborVodje />);
    expect(component).toMatchSnapshot();
});

it("Da li postoji forma za izbor vodje", ()=> {
    const wrapper=shallow(<IzborVodje />);
    expect(wrapper.find("#formaIzbor")).toBeDefined();
});

it("Da li postoji select koji prikazuje generisane grupe", ()=> {
    const wrapper=shallow(<IzborVodje />);
    expect(wrapper.find("#selectGrupe")).toBeDefined();
 
});

it("Da li je omogucen unos odabranog vodje za odgovarajucu generisanu grupu", ()=> {
    const wrapper=shallow(<IzborVodje />);
    expect(wrapper.find("#textVodja")).toBeDefined();
 
});

