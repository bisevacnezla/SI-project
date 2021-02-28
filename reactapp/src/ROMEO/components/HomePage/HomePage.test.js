import React from 'react';
import {shallow} from 'enzyme';
import Login from './Home'

describe('<Home />', () => {
  
  it('da li postoji div menu', () => {
    const wrapper = shallow(<Login/>)
    expect(wrapper.find('#menu').exists()).toBe(true)
  })

  it('da li postoji div header', () => {
    const wrapper = shallow(<Login/>)
    expect(wrapper.find('#header').exists()).toBe(true)
  })

  it('da li postoji div main', () => {
    const wrapper = shallow(<Login/>)
    expect(wrapper.find('#main').exists()).toBe(true)
  })
  it('da li postoji div footer', () => {
    const wrapper = shallow(<Login/>)
    expect(wrapper.find('#footer').exists()).toBe(true)
  })

})