import React from 'react';
import { configure } from 'enzyme';
import { mount, shallow, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import DetaljiZadatka from './DetaljiZadatka';

describe('Pregled detalja predmeta', () => {
    it("Postoji li forma u kojoj su prikazani detalji odabranog zadatka ", () => {
        const wrapper = shallow(<DetaljiZadatka />);
        expect(wrapper.find("Form").exists()).toBe(true);
    });
});