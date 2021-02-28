import React, { Component } from "react";
import axios from "axios";
import TabelaSortiranaPoOcjeni from "./tabelaSortiranaPoOcjeni";
import TabelaSortiranaPoBrojuIspita from "./tabelaSortiranaPoBrojuIspita";

class Statistika extends Component {
  state = {
    prikaziSortiranePoOcjeni: false,
    prikaziSortiranePoBrojuIspita: false
  };

  promijeniPrikazPoOcjeni() {
    this.setState({ prikaziSortiranePoOcjeni: true, prikaziSortiranePoBrojuIspita: false });
  }

  promijeniPrikazPoBrojuIspita() {
    this.setState({ prikaziSortiranePoOcjeni: false, prikaziSortiranePoBrojuIspita: true });
  }

  render() {
    return (
      <div className="container-fluid" style={{ marginTop: "30px" }}>
        <h2 style={{ marginBottom: "30px" }}>Statistika</h2>
        <div className="row" style={{ marginTop: "0.8em" }}>
          <div style={{ marginLeft: "20px", marginTop: "0.8em" }}>
            <input
              type="button"
              className="btn btn-primary"
              value="Sortiraj predmete po ocjeni"
              onClick={() => this.promijeniPrikazPoOcjeni()}
            />
          </div>
          <div style={{ marginLeft: "20px", marginTop: "0.8em" }}>
            <input
              type="button"
              className="btn btn-primary"
              value="Sortiraj predmete po broju polaganih ispita"
              onClick={() => this.promijeniPrikazPoBrojuIspita()}
            />
          </div>
          <div className="row" style={{ marginTop: "0.8em" }}>
            {this.state.prikaziSortiranePoOcjeni ? (<TabelaSortiranaPoOcjeni />) : ("")}
            {this.state.prikaziSortiranePoBrojuIspita ? (<TabelaSortiranaPoBrojuIspita />) : ("")}
          </div>
        </div>
      </div>
    );
  }
}

export default Statistika;