import React from 'react';
import ReactDOM from 'react-dom';
import { configure } from 'enzyme';
import { mount, shallow, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import BodovanjeProjekataStudenti from './BodovanjeProjekataStudenti';

describe('BodovanjeProjekataStudenti', () => {

    it('Da li rendera uspjesno', () => {
        const div = document.createElement('div');
        ReactDOM.render(<BodovanjeProjekataStudenti/>, div);
        ReactDOM.unmountComponentAtNode(div);
      });

    it("Postoji li select za odabir predmeta", () => {
        const wrapper = shallow(<BodovanjeProjekataStudenti />);
        expect(wrapper.find("Input").exists()).toBe(true);
    });

    it("Postoji li forma", () => {
        const wrapper = shallow(<BodovanjeProjekataStudenti/>);
        expect(wrapper.find("Form").exists()).toBe(true);
    });

    it("Postoji li bar jedan option unutar selecta", () => {
        const wrapper = shallow(<BodovanjeProjekataStudenti/>);
        expect(wrapper.find("option").exists()).toBe(true);
    });

    it("Postoji li tabela za prikaz studenata grupe", () => {
        const wrapper = shallow(<BodovanjeProjekataStudenti/>);
        expect(wrapper.find("Table").exists()).toBe(true);
    });
});
