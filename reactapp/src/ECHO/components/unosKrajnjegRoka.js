// Let's use moment static reference in the Datetime component.
import React, { Component } from "react";
import Datetime from "react-datetime";
import { Alert } from "reactstrap";
import "./unosKrajnjegRoka.css";

class UnosKrajnjegRoka extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertVisible: false,
      alertMessage: "",
      alertMessageStatus: "",
      alertColor: "success"
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    if (this.validiraj()) {
    }
  }
  toggle(x) {
    this.setState({ alertVisible: !this.state.alertVisible });
  }
  validiraj() {
    this.setState({
      alertMessage: "Uspješno ste unijeli novo vrijeme ",
      alertMessageStatus: "Ok!",
      alertVisible: true,
      alertColor: "success"
    });
    return true;
  }
  render() {
    return (
      <div className="divFormaKrajnjegRoka">
        <div class="card" id="cardCalendar">
          <Alert
            id="alertID"
            color={this.state.alertColor}
            toggle={this.toggle.bind(this)}
            isOpen={this.state.alertVisible}
          >
            <strong> {this.state.alertMessageStatus}</strong> <br />
            {this.state.alertMessage}
          </Alert>
          <div class="card-body">
            <h4 class="card-title">Unos krajnjeg roka</h4>
            <h6 className="card-subtitle mb-2 text-muted">
              Unesite krajnji rok za unos i promjenu slobodnih termina nastavnog
              osoblja
            </h6>
            <br />
            <Datetime input={false} isValidDate={valid} />
            <div id="dugmeKalendar">
              <button
                type="button"
                id="Potvrda"
                class="btn btn-primary"
                onClick={this.handleSubmit}
              >
                Unesi
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

var yesterday = Datetime.moment().subtract(1, "day");
var valid = function(current) {
  return current.isAfter(yesterday);
};

export default UnosKrajnjegRoka;
