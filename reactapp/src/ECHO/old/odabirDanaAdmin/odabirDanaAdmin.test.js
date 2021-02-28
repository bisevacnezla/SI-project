import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import odabirDanaAdmin from './odabirDanaAdmin';

import { shallow } from 'enzyme';
 
Enzyme.configure({ adapter: new Adapter() });

it("prikazuje formu za odabir dana od strane admina", () => {
    const component = shallow(<odabirDanaAdmin />);
    expect(component).toMatchSnapshot();
  });
it("postoji li button za pretragu radnih dana profesora", ()=>{
    const wrapper = shallow(<odabirDanaAdmin />);
    expect(wrapper.find("#dugme").exists());
});
it("postoji li selekt za odabir profesora", ()=>{
    const wrapper = shallow(<odabirDanaAdmin />);
    expect(wrapper.find("#selektt").exists());
});
it("postoji li button za poništavanje dana", () => {
    const wrapper = shallow(<odabirDanaAdmin />);
    expect(wrapper.find("#b6").exists());
  });
it("postoji li button za odabir termina", () => {
    const wrapper = shallow(<odabirDanaAdmin />);
    expect(wrapper.find("#b1").exists());
  });
it("postoji li button za generisanje rasporeda", () => {
    const wrapper = shallow(<odabirDanaAdmin />);
    expect(wrapper.find("#generisi").exists());
  });