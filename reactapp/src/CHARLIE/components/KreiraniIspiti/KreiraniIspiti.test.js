import React from 'react';
import {shallow} from 'enzyme';
import KreiraniIspiti from './KreiraniIspiti'

describe('<KreiraniIspiti />', () => {
 
  it('da li ima tabele za prikazivanje ispita', () => {
    const wrapper = shallow(<KreiraniIspiti/>)
   
    expect(wrapper.find('#tabelica').exists()).toBe(true)
  })
}) 