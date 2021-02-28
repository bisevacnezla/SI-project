import React from 'react';
import ReactDOM from 'react-dom';
import SveAnketeSviPredmetiAdmin from '../sveAnketeSviPredmetiAdmin'
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import { exportAllDeclaration } from '@babel/types';


  test('SveAnketeSviPredmetiAdmin renders without crashing', () => {
    shallow(<SveAnketeSviPredmetiAdmin />);
  });
  test("Postoji li button za prikaz ankete", () => {
    const wrapper = shallow(<SveAnketeSviPredmetiAdmin />);
    expect(wrapper.find("#prikaziButton").exists()).toBe(true);
  });
  test("Postoji li button uredi anketu", () => {
    const wrapper = shallow(<SveAnketeSviPredmetiAdmin />);
    expect(wrapper.find("#urediButton").exists()).toBe(true);
  });
  test("Postoji li button obrisi anketu", () => {
    const wrapper = shallow(<SveAnketeSviPredmetiAdmin />);
    expect(wrapper.find("#obrisiButton").exists()).toBe(true);
  });
  test("Postoji li button za vracanje na vrh stranice", () => {
    const wrapper = shallow(<SveAnketeSviPredmetiAdmin />);
    expect(wrapper.find("#nazadNaVrhButton").exists()).toBe(true);
  });