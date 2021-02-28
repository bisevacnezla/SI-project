import React from 'react';
import ReactDOM from 'react-dom';
import { configure } from 'enzyme';
import { mount, shallow, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import UploadFiles from './UploadFiles';

describe('UploadFiles', () => {
    it('Da li rendera uspjesno', () => {
        const div = document.createElement('div');
        ReactDOM.render(<UploadFiles  />, div);
        ReactDOM.unmountComponentAtNode(div);
      });

    it("Postoji li komponenta za upload fajlova", () => {
        const wrapper = shallow(<UploadFiles  />);
        expect(wrapper.find("#uploadkomponenta").exists()).toBe(true);
    });
});