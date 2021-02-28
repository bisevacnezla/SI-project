import React, { Component } from "react";
import { Alert } from "reactstrap";
import Select from "react-select";

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
      alertColor: "success"
    };

    this.handleSelect = this.handleSelect.bind(this);
    this.handleVrijemeInput = this.handleVrijemeInput.bind(this);
    this.handleBrCasovaInput = this.handleBrCasovaInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSelect(element) {
    this.setState({ dan: element.value });
    this.setState({ prikazDana: element });
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
      this.props.terminUpdate();
      event.preventDefault();
    }
  }

  validiraj() {
    let x = this.state.vrijeme.substr(0, 2);
    const t = Number(x);
    const br = this.state.brCasova;
    if (Number(br) + Number(t) > 20) {
      this.setState({
        alertMessage: "Pogrešan unos. Nastava se održava do 20:00",
        alertVisible: true,
        alertColor: "danger"
      });
      return false;
    }
    return true;
  }
  postTermin(event) {
    fetch("http://localhost:31905/si2019/echo/unesiTermine", {
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
      <div>
        <Alert
          id="alertID"
          color={this.state.alertColor}
          toggle={this.toggle.bind(this)}
          isOpen={this.state.alertVisible}
        >
          {this.state.alertMessage}
        </Alert>
        <form>
          <div className="form-group">
            <h4 className="col">Dodaj termin</h4>
            <div className="col">
              <label>Dan u sedmici</label>
              <Select
                className="form-group m-2"
                id="listaDana"
                value={this.state.prikazDana}
                onChange={this.handleSelect}
                options={[
                  { value: "Pon", label: "Ponedjeljak" },
                  { value: "Uto", label: "Utorak" },
                  { value: "Sri", label: "Srijeda" },
                  { value: "Cet", label: "Cetvrtak" },
                  { value: "Pet", label: "Petak" }
                ]}
              />
            </div>
            <div className="col">
              <label>Vrijeme</label>
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
            </div>
            <div className="col">
              <label>Broj časova</label>
              <input
                id="brCasova"
                type="number"
                min="1"
                max="12"
                className="form-control m-2"
                value={this.state.brCasova}
                onChange={this.handleBrCasovaInput}
              />
            </div>
            <div className="col">
              <button
                id="dugme"
                type="button"
                className="btn btn-dark m-2"
                onClick={this.handleSubmit}
              >
                Unesi
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default UnosTermina;
