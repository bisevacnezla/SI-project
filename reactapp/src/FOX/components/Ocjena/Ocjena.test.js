import React from 'react';
import {shallow} from 'enzyme';
import Ocjena  from './Ocjena'

describe('<Ocjena />', () => {
  it('renderuje formu za unos ocjene', () => {
    const wrapper = shallow(<Ocjena/>)
    expect(wrapper.find('#form').exists()).toBe(true)
  })

  it('da li ima input za index', () => {
    const wrapper = shallow(<Ocjena/>)
    expect(wrapper.find('#indeksId').exists()).toBe(true)
  })
  it('da li ima input polje za ocjenu', () => {
    const wrapper = shallow(<Ocjena/>)
    expect(wrapper.find('#ocjenaId').exists()).toBe(true)
  })
  it('da li ima button za pretragu indeksa', () => {
    const wrapper = shallow(<Ocjena/>)
    expect(wrapper.find('#pretraziId').exists()).toBe(true)
  })
  it('da li ima button za unos ocjene', () => {
    const wrapper = shallow(<Ocjena/>)
    expect(wrapper.find('#unesiId').exists()).toBe(true)
  })

})