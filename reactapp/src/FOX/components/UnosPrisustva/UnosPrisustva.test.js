import React from 'react';
import ReactDOM from 'react-dom';
import UnosPrisustva from './UnosPrisustva';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {shallow, mount} from 'enzyme';

//Unit test - Forma za unos prisustva
test('<UnosPrisustva /> komponenta', () => {
    const wrapper = mount(<UnosPrisustva/>);
    expect(wrapper.contains("#unosPrisustvaID"));
})