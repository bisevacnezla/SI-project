import React from 'react';
import { configure } from 'enzyme';
import { mount, shallow, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import { sviProjektiTrenutnogUsera } from '../../api/projekti_zadaci';
import PregledListeProjekata from './PregledListeProjekata';

describe('Acceptance kriteriji testovi koji trebaju da odrede da li je odrađen user story', () => {
    it("Treba da postoji table na osnovu koje imamo pregled liste projekata ", () => {
        const wrapper = shallow(<PregledListeProjekata projekti={sviProjektiTrenutnogUsera().projekti}/>);
        expect(wrapper.find("Table").exists()).toBe(true);
    });
    it("Treba forma da postoji koja je renderovana", () => {
        const wrapper = shallow(<PregledListeProjekata projekti={sviProjektiTrenutnogUsera().projekti}/>);
        expect(wrapper.find("Form").exists()).toBe(true);
    });

});