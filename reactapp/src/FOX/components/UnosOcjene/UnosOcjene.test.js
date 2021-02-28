import React from 'react';
import {shallow} from 'enzyme';
import UnosOcjene  from '.UnosOcjene'

describe('<UnosOcjene />', () => {
  it('renderuje formu za unos ocjene', () => {
    const wrapper = shallow(<UnosOcjene/>)
    expect(wrapper.find('#form').exists()).toBe(true)
  })
  it('da li ima container za ocjenu', () => {
    const wrapper = shallow(<UnosOcjene/>)
    expect(wrapper.find('#cont').exists()).toBe(true)
  })
  
})