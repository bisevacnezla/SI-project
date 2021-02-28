import React, { Component } from 'react';
import KomponentaBrojBodova from './KomponentaBrojBodova';

class MockKreiranjeProjektaAsistent extends Component {
  constructor(props){
    super(props);
    this.state={
      brojBodova:0
    }
    this.funkcija=this.funkcija.bind(this);
  }
  render() {
    return (
      <div className="MockKreiranjeProjektaAsistent">
        <p>Mock kreiranja projekta za asistenta</p>
        <KomponentaBrojBodova funkcija={this.funkcija} bodovi={this.state.brojBodova}/>
      </div>
    );
  }
  funkcija(broj){
    this.setState({
      brojBodova:broj
    })
  }
}

export default MockKreiranjeProjektaAsistent;