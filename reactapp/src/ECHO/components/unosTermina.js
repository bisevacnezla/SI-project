import React, { Component } from "react";
import { Alert } from "reactstrap";
import "./unosTermina.css";

class UnosTermina extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dan: "Pon",
      prikazDana: "Ponedjeljak",
      vrijeme: "08:00",
      brCasova: 1,

      alertVisible: false,
      alertMessage: "",
      alertMessageStatus: "",
      alertColor: "success"
    };

    this.handleSelect = this.handleSelect.bind(this);
    this.handleVrijemeInput = this.handleVrijemeInput.bind(this);
    this.handleBrCasovaInput = this.handleBrCasovaInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSelect(event) {
    let x = event.target.value;
    x = x.substr(0, 3);
    this.setState({ dan: x });
  }

  handleVrijemeInput(event) {
    this.setState({ vrijeme: event.target.value });
  }

  handleBrCasovaInput(event) {
    this.setState({ brCasova: event.target.value });
  }

  handleSubmit(event) {
    if (this.validiraj()) {
      this.postTermin();
      event.preventDefault();
    }
  }

  validiraj() {
    let x = this.state.vrijeme.substr(0, 2);
    const t = Number(x);
    const br = this.state.brCasova;
    if (Number(br) + Number(t) > 20) {
      this.setState({
        alertMessage: "Nastava se održava do 20:00",
        alertMessageStatus: "Greška!",
        alertVisible: true,
        alertColor: "danger"
      });
      return false;
    }
    return true;
  }
  postTermin(event) {
    fetch("https://si-echo-2019.herokuapp.com/api/si2019/echo/unesiTermine", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        brCasova: this.state.brCasova,
        idPredavac: 1, //hardkodirano
        danUSedmici: this.state.dan,
        idKabinet: 3, //hardkodirano
        vrijeme: this.state.vrijeme
      })
    }).then(
      this.setState({
        alertMessage: "Uspješno ste unijeli termin",
        alertMessageStatus: "Ok!",
        alertVisible: true,
        alertColor: "success"
      })
    );
  }
  toggle(x) {
    this.setState({ alertVisible: !this.state.alertVisible });
  }
  render() {
    return (
      <div id="omotacECHO">
        <div className="card" id="terminCard">
          <Alert
            id="alertID"
            color={this.state.alertColor}
            toggle={this.toggle.bind(this)}
            isOpen={this.state.alertVisible}
          >
            <strong> {this.state.alertMessageStatus}</strong> <br />
            {this.state.alertMessage}
          </Alert>
          <div className="card-body" id="terminCardBody">
            <h4 className="card-title m-2" id="terminCardTitle">
              Unos termina
            </h4>
            <h6 className="card-subtitle mb-2 text-muted">
              Unesite željene termine za odvijanje nastave
            </h6>
            <label className="labelECHO">Dan</label>
            <select
              className="custom-select m-2"
              id="listaDana"
              onChange={this.handleSelect}
            >
              <option selected="" value="Pon">
                Ponedjeljak
              </option>
              <option value="Uto">Utorak</option>
              <option value="Sri">Srijeda</option>
              <option value="Cet">Cetvrtak</option>
              <option value="Pet">Petak</option>
            </select>
            <label className="labelECHO">Vrijeme</label>
            <input
              id="satnica"
              type="time"
              max="20:00"
              min="08:00"
              step="3600"
              className="form-control m-2"
              value={this.state.vrijeme}
              onChange={this.handleVrijemeInput}
            />
            <label className="labelECHO">Broj časova</label>
            <input
              id="brCasova"
              type="number"
              min="1"
              max="12"
              className="form-control m-2"
              value={this.state.brCasova}
              onChange={this.handleBrCasovaInput}
            />
            <button
              id="dugmeECHO1"
              type="button"
              className="btn btn-primary m-2"
              onClick={this.handleSubmit}
            >
              Unesi
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default UnosTermina;
