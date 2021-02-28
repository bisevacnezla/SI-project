import React, { Component } from 'react';

class KomponentaBrojBodova extends Component {
  constructor(props){
    super(props);
    this.promjena=this.promjena.bind(this);
  }
  render() {
    return (
        <input id="broj" type="number" min="1" max="100" placeholder="10" value={this.props.bodovi} onChange={this.promjena}></input>
    );
  }
  promjena(param){
        this.props.funkcija(param.target.value);
  };
}

export default KomponentaBrojBodova;