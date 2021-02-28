import React from 'react';
import Enzyme, { configure, mount, shallow, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import PregledDetaljaPredmeta from './PregledDetaljaPredmeta';

describe('Pregled detalja nekog predmeta na kojim je asistent', () => {
    it("Postoji lista predmeta na osnovu koje biramo odredjeni predmet ", () => {
        const wrapper = shallow(<PregledDetaljaPredmeta/>);
        expect(wrapper.find("#listaPredmeta").exists()).toBe(true);
    });

    it("Postoji forma sa detaljima odabranog predmeta", () => {
        const wrapper = shallow(<PregledDetaljaPredmeta/>);
        expect(wrapper.find("#detalji").exists()).toBe(true);
    });

});