import React from 'react';
import OdabirDana from './OdabirDana';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { shallow } from 'enzyme';
 
Enzyme.configure({ adapter: new Adapter() });


it("prikazuje formu za odabir dana", () => {
    const component = shallow(<OdabirDana />);
    expect(component).toMatchSnapshot();
  });
it("postoji li button za poništavanje dana", () => {
    const wrapper = shallow(<OdabirDana />);
    expect(wrapper.find("#b6").exists());
  });
it("postoji li button za odabir termina", () => {
    const wrapper = shallow(<OdabirDana />);
    expect(wrapper.find("#b1").exists());
  });
it("postoji li button za generisanje rasporeda", () => {
    const wrapper = shallow(<OdabirDana />);
    expect(wrapper.find("#generisi").exists()).toBe(true);
  });