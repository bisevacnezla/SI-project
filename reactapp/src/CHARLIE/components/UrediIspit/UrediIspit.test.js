import React from 'react';
import {shallow} from 'enzyme';
import UrediIspit from './UrediIspit';

describe('<UrediIspit />', () => {
 
  it('da li ima datetimepicker za rok prijave ispita', () => {
    const wrapper = shallow(<UrediIspit/>)
   
    expect(wrapper.find('#rokPrijaveIspita').exists()).toBe(true)
  })

  it('da li ima tabele za prikazivanje ispita', () => {
    const wrapper = shallow(<UrediIspit/>)
   
    expect(wrapper.find('#trajanjeIspita').exists()).toBe(true)
  })
  it('da li ima button za potvrdu izmjene ispita', () => {
    const wrapper = shallow(<UrediIspit/>)
   
    expect(wrapper.find('#btnPotvrdi').exists()).toBe(true)
  })

  it('da li ima text input za salu', () => {
    const wrapper = shallow(<UrediIspit/>)
   
    expect(wrapper.find('#sala').exists()).toBe(true)
  })
  it('da li ima input za napomenu', () => {
    const wrapper = shallow(<UrediIspit/>)
    expect(wrapper.find('#iNapomena').exists()).toBe(true)
  })

  it('da li ima input za kapacitet', () => {
    const wrapper = shallow(<UrediIspit/>)
    expect(wrapper.find('#kapacitet').exists()).toBe(true)
  })

}) 