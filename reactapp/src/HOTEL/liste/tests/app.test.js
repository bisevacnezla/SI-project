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
