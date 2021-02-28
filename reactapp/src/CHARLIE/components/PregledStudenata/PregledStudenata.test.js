import React from 'react';
import {shallow} from 'enzyme';
import PregledStudenata from './PregledStudenata'

describe('<PregledStudenata />', () => {
    it('da li ima button-a za vracanje nazad', () => {
        const wrapper = shallow(<PregledStudenata/>)
        expect(wrapper.find('#vratiMeNazad').exists()).toBe(true)
    })
})