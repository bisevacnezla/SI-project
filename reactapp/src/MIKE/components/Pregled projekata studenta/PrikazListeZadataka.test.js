import React from 'react';
import { configure } from 'enzyme';
import { mount, shallow, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import ListaZadataka from './ListaZadataka';

describe('Prikaz liste zadataka', () => {
    it("Postoji li forma sa listom zadataka odabranog projekta ", () => {
        const wrapper = shallow(<ListaZadataka />);
        expect(wrapper.find("Form").exists()).toBe(true);
    });
    it("Postoji li select sa listom zadataka odabranog projekta", () => {
        const wrapper = shallow(<ListaZadataka />);
        expect(wrapper.find("Select").exists()).toBe(true);
    });
    it("Postoji li bar jedan zadatak u selectu ", () => {
        const wrapper = shallow(<ListaZadataka />);
        expect(wrapper.find("option").exists()).toBe(true);
    });

});