import React from 'react';
import {shallow} from 'enzyme';
import UnosBodova  from '.UnosBodova'

describe('<UnosBodova />', () => {
  it('renderuje formu za unos bodova', () => {
    const wrapper = shallow(<UnosBodova/>)
    expect(wrapper.find('#form').exists()).toBe(true)
  })
  it('da li ima container za bodove', () => {
    const wrapper = shallow(<UnosBodova/>)
    expect(wrapper.find('#cont').exists()).toBe(true)
    })
})