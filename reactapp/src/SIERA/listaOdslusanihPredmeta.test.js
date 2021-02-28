import React from 'react';
import ListaOdslusanihPredmeta from './listaOdslusanihPredmeta';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

it('postoji prvi div', () => {
    const wrapper = shallow(<ListaOdslusanihPredmeta />);
    expect(wrapper.find('div').exists()).toBeTruthy();
});

it('postoji labela', () => {
    const wrapper = shallow(<ListaOdslusanihPredmeta />);
    expect(wrapper.find('label').exists()).toBeTruthy();
});

it('labela ima klasu "col-form-label"', () => {
    const wrapper = shallow(<ListaOdslusanihPredmeta />);
    expect(wrapper.find('label').exists()).toBeTruthy();
});