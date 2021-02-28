import React, { Component } from "react";
import UnosTermina from "./unosTermina";
import PrikazTermina from "./prikazTermina";
import "./naslovnaTermin.css";
import "bootstrap/dist/css/bootstrap.min.css";

class NaslovnaTermin extends Component {
  constructor(props) {
    super(props);
    this.state = { refresh: false };
    this.handleTerminUpdate = this.handleTerminUpdate.bind(this);
  }

  handleTerminUpdate() {
    this.setState({ refresh: true });
  }

  handlePrikazTermina() {
    if (this.state.refresh) {
      //get method
      //preko propsa ces poslati svojoj komponenti
    }
  }
  render() {
    return (
      <main>
        <div id="prva">
          <UnosTermina terminUpdate={this.handleTerminUpdate} />
        </div>
        <div id="druga">
          <PrikazTermina onPrikazTermina={this.handlePrikazTermina} />
        </div>
      </main>
    );
  }
}

export default NaslovnaTermin;
