import React from 'react';
import ReactDOM from 'react-dom';
import StarRating from '../StarRating';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import { exportAllDeclaration } from '@babel/types';

test('renders without crashing', () => {
  shallow(<StarRating azurirajPitanje={() => console.log(123)} />);
});

test('postoji tekst pitanja', () => {
  const SC = shallow(<StarRating azurirajPitanje={() => console.log(123)}/>)
  const buttons = SC.find('button')
  const textarea = SC.find('textarea')
  expect(textarea.length).toEqual(1) 
})

