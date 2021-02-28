import React, { Component } from "react";
import { Alert } from "reactstrap";
import "./unosTermina.css";

class Raspored extends Component {
  constructor(props) {
    super(props);
    this.state = {
      godina: "RI3",
      semestar: "zimski",
      alertVisible: false,
      alertMessage: "",
      alertMessageStatus: "",
      alertColor: "success"
    };

    this.handleSelectGodina = this.handleSelectGodina.bind(this);
    this.handleSelectSemestar = this.handleSelectSemestar.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dajRaspored = this.dajRaspored.bind(this);
  }

  handleSelectGodina(event) {
    let x = event.target.value;
    this.setState({ godina: x });
  }

  handleSelectSemestar(event) {
    let x = event.target.value;
    this.setState({ semestar: x });
  }

  handleSubmit(event) {
    this.postRaspored();
    event.preventDefault();
  }
  dajRaspored(event) {
    fetch("https://si-echo-2019.herokuapp.com/si2019/echo/dajRaspored")
      .then(res => res.text())
      .then(res => {
        const element = document.createElement("a");
        const file = new Blob([res], {
          type: "text/plain"
        });
        element.href = URL.createObjectURL(file);
        element.download = "raspored.txt";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
      });
  }

  postRaspored(event) {
    fetch("https://si-echo-2019.herokuapp.com/si2019/echo/kreirajRaspored", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        semestar: this.state.semestar,
        godina: this.state.godina
      })
    }).then(
      this.setState({
        alertMessage:
          "Uspješno ste kreirali raspored. Potrebno je sačekati par minuta da sačuvate raspored kao .txt datoteku.",
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
            <h4 className="card-title m-2">Kreiraj raspored</h4>
            <h6 className="card-subtitle mb-2 text-muted">
              Odaberite semestar i godinu za kreiranje rasporeda nastave
            </h6>
            <label className="labelECHO">Semestar</label>
            <select
              className="custom-select m-2"
              id="odabirSemestra"
              onChange={this.handleSelectSemestar}
            >
              <option selected="" value="zimski">
                Zimski semestar
              </option>
              <option value="ljetni">Ljetni semestar</option>
            </select>
            <label className="labelECHO">Godina</label>
            <select
              className="custom-select m-2"
              id="listaGodina"
              onChange={this.handleSelectGodina}
            >
              <option selected="" value="RI3">
                Računarstvo i informatika - 3. godina
              </option>
            </select>
            <div id="buttonsDivECHO">
              <button
                id="dugmeECHO2"
                type="button"
                className="btn btn-primary m-2"
                onClick={this.handleSubmit}
              >
                Kreiraj
              </button>
              <button
                id="dugmeECHO2"
                type="button"
                className="btn btn-primary m-2"
                onClick={this.dajRaspored}
              >
                Sačuvaj kao .txt
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Raspored;
