import React from 'react';
import ReactDOM from 'react-dom';
import SingleChoice from '../SingleChoice';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import { exportAllDeclaration } from '@babel/types';

test('renders without crashing', () => {
  shallow(<SingleChoice azurirajPitanje={() => console.log(123)} />);
});

test('dodavanje odgovora', () => {
  const SC = shallow(<SingleChoice azurirajPitanje={() => console.log(123)}/>)
  const buttons = SC.find('button')
  const textarea = SC.find('textarea')
  expect(textarea.length).toEqual(3) 
})





