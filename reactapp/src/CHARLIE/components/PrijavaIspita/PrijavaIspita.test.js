import React from 'react';
import {shallow} from 'enzyme';
import PrijavaIspita from './PrijavaIspita';

describe('<PrijavaIspita />', () => {
 
  it('da li postoje usmeni ispiti', () => {
    const wrapper = shallow(<PrijavaIspita/>)
   
    expect(wrapper.find('#usmeniIspiti').exists()).toBe(true)
  })

  it('da li postoji button za prijavljene ispite', () => {
    const wrapper = shallow(<PrijavaIspita/>)
   
    expect(wrapper.find('#prijavljeniIspiti').exists()).toBe(true)
  })

  it('da li postoje uvidi u radove', () => {
    const wrapper = shallow(<PrijavaIspita/>)
   
    expect(wrapper.find('#uvidURadove').exists()).toBe(true)
  })
}) 