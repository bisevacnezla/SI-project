import React from 'react';
import PrikazListeProjekata from '.PrikazListeProjekata';
import Enzyme, {configure,shallow,mount,render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure ({adapter: new Adapter()});

if ("Da li se prikazuje komponenta",()=>{
    const component=shallow(<PrikazListeProjekata />);
    expect(component).toMatchSnapshot();
});

if ("Da li se prikazuje tabela",()=>{
    const wrapper=shallow(<PrikazListeProjekata />);
    expect(wrapper.find("#tabelaProjekata")).toBeDefined();
});
