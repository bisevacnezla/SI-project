import React from 'react';
import AdminPromjenaTermina from './AdminPromjenaTermina';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
Enzyme.configure({ adapter: new Adapter() });
it("prikazuje formu za promjenu termina", () => {
    const component = shallow(<AdminPromjenaTermina />);
    expect(component).toMatchSnapshot();
  });
it("postoji li button za brisanje termina", () => {
    const wrapper = shallow(<AdminPromjenaTermina />);
    expect(wrapper.find("#b1").exists());
  });
it("postoji li select za odabir osoblja", () => {
    const wrapper = shallow(<AdminPromjenaTermina />);
    expect(wrapper.find("#sviprofesori").exists());
  });
it("postoji li button za nazad", () => {
    const wrapper = shallow(<AdminPromjenaTermina />);
    expect(wrapper.find("#nazad").exists()).toBe(true);
  });