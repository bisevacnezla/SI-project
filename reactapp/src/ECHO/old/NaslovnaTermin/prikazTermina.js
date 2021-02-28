import React, { Component } from "react";
import "./izgled.css";

class PrikazTermina extends Component {
  constructor(props) {
    super(props);
    this.state = {
      termini: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:31905/si2019/echo/getZeljeniTerminByKorisnikId")
      .then(res => res.json())
      .then(json => {
        this.setState({
          termini: json
        });
      });
  }

  render() {
    return (
      <div className="x">
        <div className="Dan" id="Ponedjeljak">
          <h5>Ponedjeljak</h5>
          <p>Odabrani termini:</p>
          {this.state.termini.map(item =>
            item.danUSedmici == "Pon" ? (
              <p>
                {item.vrijeme} -{" "}
                {parseInt(item.vrijeme.substring(0), 10) + item.brCasova}
                :00
              </p>
            ) : (
              <p />
            )
          )}
        </div>
        <div className="Dan" id="Utorak">
          <h5>Utorak</h5>
          <p>Odabrani termini:</p>
          {this.state.termini.map(item =>
            item.danUSedmici == "Uto" ? (
              <p>
                {item.vrijeme} -{" "}
                {parseInt(item.vrijeme.substring(0), 10) + item.brCasova}
                :00
              </p>
            ) : (
              <p />
            )
          )}
        </div>
        <div className="Dan" id="Srijeda">
          <h5>Srijeda</h5>
          <p>Odabrani termini:</p>
          {this.state.termini.map(item =>
            item.danUSedmici == "Sri" ? (
              <p>
                {item.vrijeme} -{" "}
                {parseInt(item.vrijeme.substring(0), 10) + item.brCasova}
                :00
              </p>
            ) : (
              <p />
            )
          )}
        </div>
        <div className="Dan" id="Cetvrtak">
          <h5>Četvrtak</h5>
          <p>Odabrani termini:</p>
          {this.state.termini.map(item =>
            item.danUSedmici == "Cet" ? (
              <p>
                {item.vrijeme} -{" "}
                {parseInt(item.vrijeme.substring(0), 10) + item.brCasova}
                :00
              </p>
            ) : (
              <p />
            )
          )}
        </div>
        <div className="Dan" id="Petak">
          <h5>Petak</h5>
          <p>Odabrani termini:</p>
          {this.state.termini.map(item =>
            item.danUSedmici == "Pet" ? (
              <p>
                {item.vrijeme} -{" "}
                {parseInt(item.vrijeme.substring(0), 10) + item.brCasova}
                :00
              </p>
            ) : (
              <p />
            )
          )}
        </div>
      </div>
    );
  }
}
export default PrikazTermina;
