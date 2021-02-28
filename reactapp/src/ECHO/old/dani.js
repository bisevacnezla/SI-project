import React, { Component } from "react";
import "./izgled.css";

class Dani extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nizPon: [],
      nizUto: [],
      nizSri: [],
      nizCet: [],
      nizPet: []
    };
  }

  componentDidMount() {
    fetch("#");
    //.then(res=>res.json())
    //.then(json=> {
    var komponenta = this;
    var nova = "12.00-15:00";
    komponenta.setState(thisState => ({
      nizPon: thisState.nizPon.concat([nova]),
      nizUto: thisState.nizUto.concat([nova]),
      nizSri: thisState.nizSri.concat([nova]),
      nizCet: thisState.nizCet.concat([nova]),
      nizPet: thisState.nizPet.concat([nova])
    }));
    //})
  }

  render() {
    return (
      <div>
        <div className="Pon">
          <h5>Ponedjeljak</h5>
          <p>Odabrani termini:</p>
          <p>{this.state.nizPon}</p>
        </div>
        <div className="Uto">
          <h5>Utorak</h5>
          <p>Odabrani termini:</p>
          <p>{this.state.nizUto}</p>
        </div>
        <div className="Sri">
          <h5>Srijeda</h5>
          <p>Odabrani termini:</p>
          <p>{this.state.nizSri}</p>
        </div>
        <div className="Cet">
          <h5>Četvrtak</h5>
          <p>Odabrani termini:</p>
          <p>{this.state.nizCet}</p>
        </div>
        <div className="Pet">
          <h5>Petak</h5>
          <p>Odabrani termini:</p>
          <p>{this.state.nizPet}</p>
        </div>
      </div>
    );
  }
}
export default Dani;
