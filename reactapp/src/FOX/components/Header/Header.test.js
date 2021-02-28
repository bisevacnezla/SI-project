import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {shallow, mount} from 'enzyme';

//Unit test - Header za početnu stranicu
test('<Header /> komponenta za početnu stranicu', () => {
    const wrapper = mount(<Header isPocetna={true}/>);
    //Kod stranice predemeta postoji link
    expect(wrapper.contains("#logOut"));
} )

//Unit test - Header za stranicu predmeta
it ('<Header /> komponenta za stranicu predmeta', () => {
    const wrapper = mount(<Header isPocetna={false}/>);
    //Kod stranice predemeta postoji navbar
    expect(wrapper.contains("#navbar001_class"));
  })