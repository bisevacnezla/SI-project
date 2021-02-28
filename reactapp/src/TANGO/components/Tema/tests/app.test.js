import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import { exportAllDeclaration } from '@babel/types';
import Teme from '../tema';

test('renders without crashing', () => {
  shallow(<App />);
});

test('postoji dugme za brisanje teme', () => {
  const wrapper = shallow(<Teme/>)  
  expect(wrapper.find("#delteBtn")).toEqual(true) 
})


