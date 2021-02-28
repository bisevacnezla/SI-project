import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { Alert } from "reactstrap";
import "./DodajNovuSalu.css";
class DodajNovuSalu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      naziv: "",
      kapacitet: 1,
      namjena: false,
      alertVisible: false,
      alertMessage: "",
      alertMessageStatus: "",
      alertColor: "success"
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNazivInput = this.handleNazivInput.bind(this);
    this.handleKapacitetInput = this.handleKapacitetInput.bind(this);
    this.handleBoolInput = this.handleBoolInput.bind(this);
  }

  handleNazivInput(event) {
    this.setState({ naziv: event.target.value });
  }
  handleKapacitetInput(event) {
    this.setState({ kapacitet: event.target.value });
  }
  handleBoolInput(event) {
    this.setState({ namjena: !this.state.namjena });
  }

  toggle(x) {
    this.setState({ alertVisible: !this.state.alertVisible });
  }

  validiraj() {
    if (!this.state.naziv) {
      this.setState({
        alertMessage: "Ispunite sva potrebna polja za unos sale! ",
        alertMessageStatus: "Greška!",
        alertVisible: true,
        alertColor: "danger"
      });
      return false;
    }
    return true;
  }

  handleSubmit(event) {
    if (this.validiraj()) {
      console.log(
        "Naziv" +
          this.state.naziv +
          "kapacitet " +
          this.state.kapacitet +
          "bool" +
          this.state.namjena
      );
      this.postSala();
    }
  }

  postSala(event) {
    fetch("https://si-echo-2019.herokuapp.com/si2019/echo/unesiSalu", { // localhost:31905
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        kapacitet: this.state.kapacitet,
        naziv: this.state.naziv,
        namjena: this.state.namjena
      })
    }).then(
      this.setState({
        alertMessage: "Uspješno ste unijeli novu salu! ",
        alertMessageStatus: "Ok!",
        alertVisible: true,
        alertColor: "success",
        naziv: "",
        kapacitet: 1
      })
    );
  }
  render() {
    return (
      <div id="omotacECHO">
        <div class="card" id="kartica">
          <Alert
            id="alertID"
            color={this.state.alertColor}
            toggle={this.toggle.bind(this)}
            isOpen={this.state.alertVisible}
          >
            <strong> {this.state.alertMessageStatus}</strong> <br />
            {this.state.alertMessage}
          </Alert>
          <div class="card-body" id="karticaBody">
            <h4 class="card-title">Unos sale</h4>
            <form>
              <Form.Row>
                <Col style={{ textAlign: "left" }}>
                  <Form.Label> Naziv sale: </Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    required
                    value={this.state.naziv}
                    onChange={this.handleNazivInput}
                  />
                </Col>
              </Form.Row>
              <Form.Row>
                <Col style={{ textAlign: "left" }}>
                  <Form.Label> Kapacitet: </Form.Label>
                  <Form.Control
                    min="1"
                    max="200"
                    type="number"
                    value={this.state.kapacitet}
                    onChange={this.handleKapacitetInput}
                  />
                </Col>
              </Form.Row>
              <div className="form-group" id="check">
                <div class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="customCheck1"
                    onChange={this.handleBoolInput}
                  />
                  <label class="custom-control-label" for="customCheck1">
                    Sala posjeduje računare
                  </label>
                </div>
              </div>
              <div className="form-group">
                <button
                  id="dugme1"
                  type="button"
                  className="btn btn-primary"
                  onClick={this.handleSubmit}
                >
                  Unesi salu
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default DodajNovuSalu;
