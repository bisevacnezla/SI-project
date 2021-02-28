import React from 'react';
import ReactDOM from 'react-dom';
import AnketePoPredmetimaProf from '../anketePoPredmetimaProf';
import AnketePoPredmetimaStudent from '../anketePoPredmetimaStudent';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import { exportAllDeclaration } from '@babel/types';


  test('AnketePoPredmetimaProf renders without crashing', () => {
    shallow(<AnketePoPredmetimaProf />);
  });
  test('AnketePoPredmetimaStudent renders without crashing', () => {
    shallow(<AnketePoPredmetimaStudent />);
  });
  test("Postoji li button za prikaz ankete - profesori", () => {
    const wrapper = shallow(<AnketePoPredmetimaProf />);
    expect(wrapper.find("#prikaziButton").exists()).toBe(true);
  });
  test("Postoji li button uredi anketu - profesori", () => {
    const wrapper = shallow(<AnketePoPredmetimaProf />);
    expect(wrapper.find("#urediButton").exists()).toBe(true);
  });
  test("Postoji li button obrisi anketu - profesori", () => {
    const wrapper = shallow(<AnketePoPredmetimaProf />);
    expect(wrapper.find("#obrisiButton").exists()).toBe(true);
  });
  test("Postoji li button za vracanje na vrh stranice - profesori", () => {
    const wrapper = shallow(<AnketePoPredmetimaProf />);
    expect(wrapper.find("#nazadNaVrhButton").exists()).toBe(true);
  });
  test("Postoji li button za prikaz ankete - studenti", () => {
    const wrapper = shallow(<AnketePoPredmetimaStudent />);
    expect(wrapper.find("#prikaziButton").exists()).toBe(true);
  });
  test("Postoji li button za vracanje na vrh stranice - studenti", () => {
    const wrapper = shallow(<AnketePoPredmetimaStudent />);
    expect(wrapper.find("#nazadNaVrhButton").exists()).toBe(true);
  });
