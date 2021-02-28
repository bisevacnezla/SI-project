import React from 'react';
import { configure, shallow, mount} from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16'
import KomponentaBrojBodova from './KomponentaBrojBodova';
import MockKreiranjeProjektaAsistent from './MockKreiranjeProjektaAsistent';
configure({ adapter: new Adapter() });
describe('Testiranje prikaza unosa broja', function() {
  it('prikaz prilikom ucitavanja', function() {
    const wrapper = shallow(<KomponentaBrojBodova />); 
    const input=wrapper.find('[type="number"]');
    expect(input).to.have.length(1);
  });
  it('pocetni broj bodova je 0', function() {
    const wrapper = mount(<MockKreiranjeProjektaAsistent />);
    wrapper.find('input'); 
    expect(wrapper.state('brojBodova')).to.equal(0);
  });
  it('promjena broja koji se prikazuje', function() {
    const wrapper = mount(<MockKreiranjeProjektaAsistent />);
    wrapper.find('input').simulate('change',{target:{value:30}}); 
    expect(wrapper.state('brojBodova')).to.equal(30);
  });
  /*it('ispis opisa predmeta', function() {
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
  });*/
});