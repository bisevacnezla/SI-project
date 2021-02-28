import React from 'react';
import ProfessorsAvailability from './ProfessorsAvailability';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { shallow } from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });


it("renders table", () => {
  const component = shallow(<ProfessorsAvailability />);
  expect(component).toMatchSnapshot();
});
it("renders search bar", () => {
  const wrapper = shallow(<ProfessorsAvailability />);
  expect(wrapper.find("#searchTeachingStaff").exists());
});
it("renders teaching staff table", () => {
  const wrapper = shallow(<ProfessorsAvailability />);
  expect(wrapper.find("#teachingStaffTable").exists());
});
it("renders pagination ", () => {
  const wrapper = shallow(<ProfessorsAvailability />);
  expect(wrapper.find("#pagination").exists()).toBe(true);
});