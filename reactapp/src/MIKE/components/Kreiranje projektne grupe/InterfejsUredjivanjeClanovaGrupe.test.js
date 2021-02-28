import React from 'react';
import InterfejsUredjivanjeClanovaGrupe  from './InterfejsUredjivanjeClanovaGrupe';
import { configure, shallow, mount} from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() });
describe('Testiranje interfejsa za uredjivanje clanova grupe', function() {
  it('test prikaza prve liste', function() {
    const wrapper = shallow(<InterfejsUredjivanjeClanovaGrupe />); 
    const tekst = <option className="list-group-item">test1</option>;
    expect(wrapper.contains(tekst)).to.equal(true);
  });
  it('test prikaza druge liste', function() {
    const wrapper = shallow(<InterfejsUredjivanjeClanovaGrupe />); 
    const tekst = <option className="list-group-item">test3</option>;
    expect(wrapper.contains(tekst)).to.equal(true);
  });
  it('testiranje prebacivanja opcija u listi', function() {
    const wrapper = mount(<InterfejsUredjivanjeClanovaGrupe />);
    wrapper.find('select').first().simulate('change',{target: { value : 'test2'}});
    wrapper.find('button').at(0).simulate('click');
    expect(wrapper.find('select').at(1).length).to.equal(1);
  });
});
