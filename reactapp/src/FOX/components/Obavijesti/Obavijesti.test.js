import React from 'react';
import {shallow} from 'enzyme';
import Obavijesti from './Obavijesti'

describe('<Obavijesti />', () => {
  it('renderuje formu za unos obavijesti', () => {
    const wrapper = shallow(<Obavijesti/>)
    expect(wrapper.find('form').exists()).toBe(true)
  })

  it('da li ima input za naslov', () => {
    const wrapper = shallow(<Obavijesti/>)
    expect(wrapper.find('#naslovId').exists()).toBe(true)
  })
  it('da li ima textarea polje za sadrzaj', () => {
    const wrapper = shallow(<KreirajIspitDetalji/>)
    expect(wrapper.find('#sadrzajId').exists()).toBe(true)
  })
  it('da li ima dugme za spasavanje obavijesti', () => {
    const wrapper = shallow(<KreirajIspitDetalji/>)
    expect(wrapper.find('#sacuvajId').exists()).toBe(true)
  })

})