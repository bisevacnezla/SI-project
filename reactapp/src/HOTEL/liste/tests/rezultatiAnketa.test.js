import React from 'react';
import ReactDOM from 'react-dom';
import RezultatiAnketaKorisnik from '../rezultatiAnketaKorisnik';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import { exportAllDeclaration } from '@babel/types';


  test('RezultatiAnketaKorisnik renders without crashing', () => {
    shallow(<RezultatiAnketaKorisnik />);
  });
  test("Postoji li button za prikaz rezultata ankete", () => {
    const wrapper = shallow(<RezultatiAnketaKorisnik />);
    expect(wrapper.find("#prikaziButton").exists()).toBe(true);
  });
  test("Postoji li button za vracanje na vrh stranice", () => {
    const wrapper = shallow(<RezultatiAnketaKorisnik />);
    expect(wrapper.find("#nazadNaVrhButton").exists()).toBe(true);
  });
