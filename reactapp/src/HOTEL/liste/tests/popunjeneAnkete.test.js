import React from 'react';
import ReactDOM from 'react-dom';
import PopunjeneAnketeAdmin from '../popunjeneAnketeAdmin';
import PopunjeneAnketeProf from '../popunjeneAnketeProf';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import { exportAllDeclaration } from '@babel/types';


  test('PopunjeneAnketeAdmin renders without crashing', () => {
    shallow(<PopunjeneAnketeAdmin />);
  });
  test('PopunjeneAnketeProf renders without crashing', () => {
    shallow(<PopunjeneAnketeAdmin />);
  });
  test("Postoji li button za prikaz ankete - admin", () => {
    const wrapper = shallow(<PopunjeneAnketeAdmin />);
    expect(wrapper.find("#prikaziButton").exists()).toBe(true);
  });
  test("Postoji li button obrisi anketu - admin", () => {
    const wrapper = shallow(<PopunjeneAnketeAdmin />);
    expect(wrapper.find("#obrisiButton").exists()).toBe(true);
  });
  test("Postoji li button za vracanje na vrh stranice - admin", () => {
    const wrapper = shallow(<PopunjeneAnketeAdmin />);
    expect(wrapper.find("#nazadNaVrhButton").exists()).toBe(true);
  });
  test("Postoji li button za prikaz ankete - profesor", () => {
    const wrapper = shallow(<PopunjeneAnketeProf />);
    expect(wrapper.find("#prikaziButton").exists()).toBe(true);
  });
  test("Postoji li button obrisi anketu - profesor", () => {
    const wrapper = shallow(<PopunjeneAnketeProf />);
    expect(wrapper.find("#obrisiButton").exists()).toBe(true);
  });
  test("Postoji li button za vracanje na vrh stranice - profesor", () => {
    const wrapper = shallow(<PopunjeneAnketeProf />);
    expect(wrapper.find("#nazadNaVrhButton").exists()).toBe(true);
  });