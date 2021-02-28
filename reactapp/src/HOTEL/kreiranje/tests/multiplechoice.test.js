import React from 'react';
import ReactDOM from 'react-dom';
import MultipleChoice from '../MultipleChoice';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import { exportAllDeclaration } from '@babel/types';

test('renders without crashing', () => {
  shallow(<MultipleChoice azurirajPitanje={() => console.log("multiple")} />);
});

test('dodavanje odgovora', () => {
  const SC = shallow(<MultipleChoice azurirajPitanje={() => console.log("multiple")}/>)
  const buttons = SC.find('button')
  const textarea = SC.find('textarea')
  expect(textarea.length).toEqual(3) 
  expect(buttons.length).toEqual(4)
})





