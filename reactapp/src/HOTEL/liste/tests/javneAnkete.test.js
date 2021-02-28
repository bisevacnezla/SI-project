import React from 'react';
import ReactDOM from 'react-dom';
import JavneAnkete from '../javneAnkete'
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import { exportAllDeclaration } from '@babel/types';


  test('JavneAnkete renders without crashing', () => {
    shallow(<JavneAnkete />);
  });
  test("Postoji li button za prikaz ankete", () => {
    const wrapper = shallow(<JavneAnkete />);
    expect(wrapper.find("#prikaziButton").exists()).toBe(true);
  });
  test("Postoji li button za vracanje na vrh stranice", () => {
    const wrapper = shallow(<JavneAnkete />);
    expect(wrapper.find("#nazadNaVrhButton").exists()).toBe(true);
  });