import React from 'react';
import { configure, shallow, mount} from 'enzyme';
import { expect } from 'chai';
import PrikazPredmeta from './PrikazPredmeta';
import Pocetni from './Pocetni';
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() });
describe('Testiranje prikaza predmeta', function() {
  it('ispis pocetnog teksta', function() {
    const wrapper = shallow(<PrikazPredmeta />); 
    const tekst = <p>Test prikaza predmeta</p>;
    expect(wrapper.contains(tekst)).to.equal(true);
  });
  it('ispis naziva predmeta', function() {
    const wrapper = mount(<Pocetni />);
    wrapper.find('button').simulate('click'); 
    const tekst = <p>Predmet: SI</p>;
    expect(wrapper.contains(tekst)).to.equal(true);
  });
  it('ispis opisa predmeta', function() {
    const wrapper = mount(<Pocetni />);
    wrapper.find('button').simulate('click'); 
    const tekst = <p>Opis projekta: Projekat kreiranja informacionog sistema za fakultet</p>;
    expect(wrapper.contains(tekst)).to.equal(true);
  });
  it('ispis mogućeg broja bodova', function() {
    const wrapper = mount(<Pocetni />);
    wrapper.find('button').simulate('click'); 
    const tekst = <p>Broj mogućih bodova: 50</p>;
    expect(wrapper.contains(tekst)).to.equal(true);
  });
});