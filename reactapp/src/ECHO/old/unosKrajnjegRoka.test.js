import React from 'react';
import { shallow } from 'enzyme';
import UnosKrajnjegRoka from "./unosKrajnjegRoka.js";
import "../setupTests.js";


it('Provjerava da li postoji naslov.', () => {
    const wrapper = shallow(<UnosKrajnjegRoka />);
    const tekst = <label>Unesite datum i vrijeme za krajnji rok unosa i promjene slobodnih termina za nastavno osoblje:</label>;
    // expect(wrapper.contains(welcome)).toBe(true);
    expect(wrapper.contains(tekst)).toEqual(true);
  });

 
  it("Da li se prikazuju sve komponente", () => {
    const component = shallow(<UnosKrajnjegRoka />);
    expect(component).toMatchSnapshot();
  });

  it("Da li ima postoji kalendar za unos roka?", () => {
    const wrapper = shallow(<UnosKrajnjegRoka />);
    expect(wrapper.find("#KalendarZaUnos").exists()).toBe(true);
  });