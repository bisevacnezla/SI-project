import React from 'react';
import {shallow} from 'enzyme';
import Login from './Login'

describe('<Login />', () => {
  it('renderuje login formu', () => {
    const wrapper = shallow(<Login/>)
    expect(wrapper.find('form').exists()).toBe(true)
  })

  it('da li postoji input text', () => {
    const wrapper = shallow(<Login/>)
    expect(wrapper.find('#korisnickoIme').exists()).toBe(true)
  })

  it('da li postoji input password', () => {
    const wrapper = shallow(<Login/>)
    expect(wrapper.find('#sifra').exists()).toBe(true)
  })

  it('da li postoji submit dugme', () => {
    const wrapper = shallow(<Login/>)
    expect(wrapper.find('#submit').exists()).toBe(true)
  })

  it('da li postoji div greska', () => {
    const wrapper = shallow(<Login/>)
    expect(wrapper.find('#greska').exists()).toBe(true)
  })
  it('da li postoji div footer', () => {
    const wrapper = shallow(<Login/>)
    expect(wrapper.find('#footer').exists()).toBe(true)
  })

})