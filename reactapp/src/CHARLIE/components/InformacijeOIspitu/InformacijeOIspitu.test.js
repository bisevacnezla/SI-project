import React from 'react';
import {shallow} from 'enzyme';
import InformacijeOIspitu from './InformacijeOIspitu'

describe('<InformacijeOIspitu />', () => {
  it('renderuje formu za informacije o ispitu', () => {
    const wrapper = shallow(<InformacijeOIspitu/>)
    expect(wrapper.find('form').exists()).toBe(true)
  })

})