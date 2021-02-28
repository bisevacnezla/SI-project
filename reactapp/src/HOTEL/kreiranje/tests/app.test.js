import React from 'react';
import ReactDOM from 'react-dom';
import App from '../app';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import { exportAllDeclaration } from '@babel/types';

test('renders without crashing', () => {
  shallow(<App />);
});

test('odabir vrste ankete', () => {
  const Kreiranje = shallow(<App/>)
  const RadioButtons = Kreiranje.find('input[type="radio"]')
  expect(RadioButtons.length).toEqual(3) 
})

test('postoje polja za unos', () => {
  const Kreiranje = shallow(<App/>)
  const RadioButtons = Kreiranje.find('input[type="text"]')
  expect(RadioButtons.length).toEqual(2) 
})


