import React from 'react';
import ReactDOM from 'react-dom';
import ListaAnketa from '../listaAnketa'
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import { exportAllDeclaration } from '@babel/types';


  test('ListaAnketa renders without crashing', () => {
    shallow(<ListaAnketa />);
  });