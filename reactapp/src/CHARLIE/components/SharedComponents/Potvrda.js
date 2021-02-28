import React from "react";
import PopUp from "./PopUp";
import axios from "axios";

class Potvrda extends React.Component {
  constructor() {
    super();
    this.state = {
      idLogovanogStudenta: 1, //placeholder - treba API od autentifikacije
      isActive: false,
      prikazi: true
    };
    this.handleVisible = this.handleVisible.bind(this);
  }

  handleVisible() {
    this.setState(prevstate => {
      if (!prevstate.isActive) {
        return {
          isActive: true,
          prikazi: false
        };
      }
    });
  }
  render() {
    const successful = this.props.successful;
    const msg = this.props.msg;
    let obj = {};
    if (successful == "true") {
      obj = (

        <div >
          <PopUp
            class="alert alert-dismissible alert-success"
            style={{
              width: "100%"

            }}
            boldiraniTekst="Ok!"
            ostaliTekst={msg}
            show={this.state.prikazi}
          />
        </div>
      );
    } else {
      obj = (
        <div>
          <PopUp
            class="alert alert-dismissible alert-danger"
            style={{
                width: "100%"

            }}
            boldiraniTekst="Greška!"
            ostaliTekst={msg}
            show={this.state.prikazi}

          />
        </div>
      );
    }
    return obj;
  }
}

export default Potvrda;
