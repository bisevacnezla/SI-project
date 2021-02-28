import React from 'react';
import {shallow} from 'enzyme';
import KreirajIspit from './KreirajIspit'

describe('<KreirajIspit />', () => {
  it('da li ima button-a za kreiranje ispita', () => {
    const wrapper = shallow(<KreirajIspit/>)
    expect(wrapper.find('#kreirajDugme').exists()).toBe(true)
  })

  it('da li ima button-a za vracanje nazad', () => {
    const wrapper = shallow(<KreirajIspit/>)
    expect(wrapper.find('#nazadDugme').exists()).toBe(true)
  })

  it('renderuje dugme koje ga proslijedjuje na kreirane ispite', () => {
    const wrapper = shallow(<KreirajIspit/>)
    expect(wrapper.find('button').exists()).toBe(true)
  })
  it('renderuje formu za odabir ispitnog tipa', () =>{
    const wrapper=shallow(<KreirajIspit/>)
    expect(wrapper.find('#odabirTipIspita').exists()).toBe(true)
  })

  it("shouldn't render an alert initially", () => {
    const wrapper=shallow(<KreirajIspit/>)
    wrapper.setState({ validationError: false })
    expect(wrapper.find("[className='alert alert-danger']").exists()).toBe(
      false
    )
  })

})