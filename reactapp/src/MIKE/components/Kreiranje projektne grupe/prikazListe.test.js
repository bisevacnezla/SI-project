import React from 'react';
import Lista  from './prikazListe';
import Enzyme, { configure, shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
 

Enzyme.configure({ adapter: new Adapter() });

it("Da li se prikazuju komponente", ()=> {
    const component=shallow(<Lista />);
    expect(component).toMatchSnapshot();
});

it("Da li postoji select koji prikazuje sve predmete", ()=> {
    const wrapper=shallow(<Lista />);
    expect(wrapper.find("#selectListe")).toBeDefined();
 
});

