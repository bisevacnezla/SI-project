import React from 'react';
import {shallow} from 'enzyme';
import TabelaUnosa  from './TabelaUnosa'

describe('<TabelaUnosa />', () => {
  it('renderuje formu za unos bodova', () => {
    const wrapper = shallow(<TabelaUnosa/>)
    expect(wrapper.find('form').exists()).toBe(true)
  })
  it('da li ima dropdown meni za tip ispita', () => {
    const wrapper = shallow(<TabelaUnosa/>)
    expect(wrapper.find('#dropId').exists()).toBe(true)
  })
  it('da li ima input za index', () => {
    const wrapper = shallow(<TabelaUnosa/>)
    expect(wrapper.find('#indeksId').exists()).toBe(true)
  })
  it('da li ima input polje za bodove', () => {
    const wrapper = shallow(<TabelaUnosa/>)
    expect(wrapper.find('#bodoviId').exists()).toBe(true)
  })
  it('da li ima button za pretragu indeksa', () => {
    const wrapper = shallow(<TabelaUnosa/>)
    expect(wrapper.find('#pretraziId').exists()).toBe(true)
  })
  it('da li ima button za unos bodova', () => {
    const wrapper = shallow(<TabelaUnosa/>)
    expect(wrapper.find('#unesiId').exists()).toBe(true)
  })

})