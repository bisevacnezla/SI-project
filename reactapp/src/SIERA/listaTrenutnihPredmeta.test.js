import React from 'react';
import ListaTrenutnihPredmeta from './listaTrenutnihPredmeta';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

it('prvi div ima klasu "align-self-start"', () => {
    const wrapper = shallow(<ListaTrenutnihPredmeta />);
    expect(wrapper.find('div').first().hasClass('align-self-start')).toBeTruthy();
});

it('postoji div', () => {
    const wrapper = shallow(<ListaTrenutnihPredmeta />);
    expect(wrapper.find('div').exists()).toBeTruthy();
});