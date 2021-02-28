import React, { Component } from 'react';
import './bootstrapflatly.css'

class PrikazPredmeta extends Component {
  render() {
    return (
      <div className="PrikazPredmeta">
        <p> </p>
        <h6 style={{textAlign:"left"}}>Opis projekta: {this.props.opisProjekta}</h6>
        <h6 style={{textAlign:"left"}}>Broj mogućih bodova: {this.props.brojMogucihBodova}</h6>
      </div>
    );
  }
}

export default PrikazPredmeta;
