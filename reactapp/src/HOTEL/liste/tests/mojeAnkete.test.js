import React from 'react';
import ReactDOM from 'react-dom';
import MojeAnkete from '../mojeAnkete'
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import { exportAllDeclaration } from '@babel/types';


  test('MojeAnkete renders without crashing', () => {
    shallow(<MojeAnkete />);
  });
  test("Postoji li button za prikaz ankete", () => {
    const wrapper = shallow(<MojeAnkete />);
    expect(wrapper.find("#prikaziButton").exists()).toBe(true);
  });
  test("Postoji li button uredi anketu", () => {
    const wrapper = shallow(<MojeAnkete />);
    expect(wrapper.find("#urediButton").exists()).toBe(true);
  });
  test("Postoji li button obrisi anketu", () => {
    const wrapper = shallow(<MojeAnkete />);
    expect(wrapper.find("#obrisiButton").exists()).toBe(true);
  });
  test("Postoji li button za vracanje na vrh stranice", () => {
    const wrapper = shallow(<MojeAnkete />);
    expect(wrapper.find("#nazadNaVrhButton").exists()).toBe(true);
  });