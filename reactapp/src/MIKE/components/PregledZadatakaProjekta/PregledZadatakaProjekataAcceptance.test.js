import React from 'react';
import { configure } from 'enzyme';
import { mount, shallow, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import PregledZadatakaProjekta from './PregledZadatakaProjekta';

describe('Acceptance kriteriji testovi koji trebaju da odrede da li je odrađen user story', () => {
    it("Treba da postoji select pomoću kojeg biramo ", () => {
        const wrapper = shallow(<PregledZadatakaProjekta   />);
        expect(wrapper.find("Input").exists()).toBe(true);
    });

    it("Treba forma da postoji koja je renderovana", () => {
        const wrapper = shallow(<PregledZadatakaProjekta   />);
        expect(wrapper.find("Form").exists()).toBe(true);
    });

    it("Treba da postoji tabela za prikaz zadataka", () => {
        const wrapper = shallow(<PregledZadatakaProjekta   />);
        expect(wrapper.find("Table").exists()).toBe(true);
    });

    it("Tabela treba imati 2 reda (api/projektni_zadaci)", () => {
        const wrapper = shallow(<PregledZadatakaProjekta   />);
        expect(wrapper.find("tbody").children().length).toBe(2);
    });

    // ne koriste se vise props za komponente.
    /*
    it("Tabela treba da ima 5 redova i 5 opcija u selectu", () => {

        let novaTabela = [
            {id: "1", 
            naziv_predmeta: "Predmet 1",
            opis_projekta: "opis projekta 1",
            zadaci:  [
              {id: "1", opis: "opis projektnog zadatka 1", prioritet: "1", od_kad: "11.4.2019", do_kad: "23.4.2019", zavrsen: "NE", komentar: "" }, 
              {id: "2", opis: "opis projektnog zadatka 2", prioritet: "3", od_kad: "12.4.2019", do_kad: "17.4.2019", zavrsen: "DA", komentar: "" },
              {id: "3", opis: "opis projektnog zadatka 3", prioritet: "3", od_kad: "12.4.2019", do_kad: "17.4.2019", zavrsen: "DA", komentar: "" },
              {id: "4", opis: "opis projektnog zadatka 4", prioritet: "3", od_kad: "12.4.2019", do_kad: "17.4.2019", zavrsen: "DA", komentar: "" },
              {id: "5", opis: "opis projektnog zadatka 5", prioritet: "3", od_kad: "12.4.2019", do_kad: "17.4.2019", zavrsen: "DA", komentar: "" }
            ]},
            {id: "2", 
            naziv_predmeta: "Predmet 1",
            opis_projekta: "opis projekta 2",
            zadaci:  [
              {id: "1", opis: "opis projektnog zadatka 1", prioritet: "1", od_kad: "11.4.2019", do_kad: "23.4.2019", zavrsen: "NE", komentar: "" }, 
              {id: "2", opis: "opis projektnog zadatka 2", prioritet: "3", od_kad: "12.4.2019", do_kad: "17.4.2019", zavrsen: "DA", komentar: "" }
            ]},
            {id: "3", 
            naziv_predmeta: "Predmet 1",
            opis_projekta: "opis projekta 1",
            zadaci:  [
              {id: "1", opis: "opis projektnog zadatka 1", prioritet: "1", od_kad: "11.4.2019", do_kad: "23.4.2019", zavrsen: "NE", komentar: "" }, 
              {id: "2", opis: "opis projektnog zadatka 2", prioritet: "3", od_kad: "12.4.2019", do_kad: "17.4.2019", zavrsen: "DA", komentar: "" }
            ]},
            {id: "4", 
            naziv_predmeta: "Predmet 1",
            opis_projekta: "opis projekta 1",
            zadaci:  [
              {id: "1", opis: "opis projektnog zadatka 1", prioritet: "1", od_kad: "11.4.2019", do_kad: "23.4.2019", zavrsen: "NE", komentar: "" }, 
              {id: "2", opis: "opis projektnog zadatka 2", prioritet: "3", od_kad: "12.4.2019", do_kad: "17.4.2019", zavrsen: "DA", komentar: "" }
            ]},
            {id: "5",
            naziv_predmeta: "Predmet 2", 
            opis_projekta: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
            zadaci:  []}
          ];

            const wrapper = shallow(<PregledZadatakaProjekta projekti={novaTabela}/>);
            expect(wrapper.find("Input").children().length).toBe(5);
            expect(wrapper.find("tbody").children().length).toBe(5);
        
    });*/
});
