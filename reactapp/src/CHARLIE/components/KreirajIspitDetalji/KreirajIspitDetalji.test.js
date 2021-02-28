import React from 'react';
import {shallow} from 'enzyme';
import KreirajIspitDetalji from './KreirajIspitDetalji'

describe('<KreirajIspitDetalji />', () => {
  it('renderuje formu za unos podataka', () => {
    const wrapper = shallow(<KreirajIspitDetalji/>)
    expect(wrapper.find('form').exists()).toBe(true)
  })

  it('da li ima input za napomenu', () => {
    const wrapper = shallow(<KreirajIspitDetalji/>)
    expect(wrapper.find('#ispitnaNapomena').exists()).toBe(true)
  })
  it('da li ima dugme za povratak na pocetnu formu', () => {
    const wrapper = shallow(<KreirajIspitDetalji/>)
    expect(wrapper.find('#btnPovratak').exists()).toBe(true)
  })
  it('da li ima dugme za spasavanje ispita', () => {
    const wrapper = shallow(<KreirajIspitDetalji/>)
    expect(wrapper.find('#btnSpasi').exists()).toBe(true)
  })

  it('da li ima date time picker', () => {
    const wrapper = shallow(<KreirajIspitDetalji/>)
    expect(wrapper.find('#datetimep').exists()).toBe(true)
  })

  it('da li ima input polje za unos vremena', () => {
    const wrapper = shallow(<KreirajIspitDetalji/>)
    expect(wrapper.find('#vrijemeT').exists()).toBe(true)
  })
  it('da li ima input polje za unos kapaciteta', () => {
    const wrapper = shallow(<KreirajIspitDetalji/>)
    expect(wrapper.find('#kapacitet').exists()).toBe(true)
  })
})