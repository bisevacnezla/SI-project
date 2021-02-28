import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {shallow} from 'enzyme';


Enzyme.configure({adapter: new Adapter()});

//Unit test za header
it ('renders <Header /> component inside <App /> component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find("#Header").exists());
})

//Unit test za footer
it ('renders <Footer /> component inside <App /> component', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find("#Footer").exists());
})


