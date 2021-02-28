import React, { Component } from 'react';
import UnosTermina from "./unosTermina.js";
import './unosTerminaAdmin.css';
class UnosTerminaAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = { text: "" };
  }
  render() {
    return (
      <div className="formaUnosTerminAdmin">
        <h3> Izabrani profesor: {this.state.text || this.props.text} </h3>
        <UnosTermina />
      </div>
    );
  }
}

export default UnosTerminaAdmin;