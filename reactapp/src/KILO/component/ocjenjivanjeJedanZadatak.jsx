import React, { Component } from "react";
import { Icon } from "@opuscapita/react-icons";

class OcjenjivanjeJedanZadatak extends Component {
  render() {
    return (
      <div class="card w-50 ml-4">
        <div className="card-title ml-3 mt-3">
          <h4>
            <b>{this.props.podaci.state.zadaca}. </b>
            <Icon
              type="indicator"
              name="arrowLeft"
              className="mr-2 float-right"
              onClick={() =>
                this.props.podaci.handleBackNaJednaZadaca(
                  this.props.podaci.state.student,
                  this.props.podaci.state.idStudenta
                )
              }
            />{" "}
          </h4>
          <h5 id="zNo">Zadatak broj {this.props.podaci.state.brojZadatka}</h5>
        </div>
        <br />
        <div class="row">
          <div class="col">
            <button
              name="preuzmi"
              id="preuzmiB1"
              type="button"
              className="btn btn-primary"
              onClick={this.props.podaci.handleClick}
            >
              <Icon type="indicator" name="sortDesc" className="mr-2" />
              Preuzmi datoteku
            </button>
          </div>
        </div>
        <br />

        <h6 id="osB" className="control-label">
          Osvojeni bodovi:
        </h6>
        <div id="osBi">
          <input
            className="form-control  text-body text-center"
            type="number"
            id="osvojeniBodovi"
            name="osvojeniBodovi"
            value={this.props.podaci.state.osvojeniBodovi}
            min={0}
            max={this.props.podaci.state.maxBrojBodovaZadatka}
            step={0.1}
            onChange={this.props.podaci.handleClick}
          />
        </div>
        <br />
        <div className="form-group mr-4">
          <h6 id="komentarr">Komentar:</h6>
          <textarea
            className="form-control  ml-3 mr-3"
            placeholder="Ovdje napišite Vaš komentar."
            id="komentar"
            rows="4"
          />
          <small id="emailHelp" className="form-text text-muted">
            Ova moguænost je opcionalna.
          </small>
        </div>
        <div>
          <hr className="bg-danger ml-3 mr-3" />
          <div id="prepisan" class="custom-control custom-switch">
            <input
              type="checkbox"
              class="custom-control-input"
              id="prepisanZadatak"
            />
            <label
              className="custom-control-label ml-3"
              htmlFor="prepisanZadatak"
            >
              <h6>
                Zadatak je <b className="text-danger">prepisan.</b>
              </h6>
            </label>
          </div>{" "}
          <hr className="bg-danger ml-3 mr-3" />
        </div>
        <div class="row pb-2">
          <div class="col">
            <button
              type="button"
              name="otkazi"
              id="otkazuj"
              onClick={this.props.podaci.handleClick}
              class="btn btn-outline-danger text-danger "
            >
              Otkaži
            </button>
          </div>
          <div class="col">
            <button
              type="button"
              id="oky"
              name="ok"
              onClick={this.props.podaci.handleClick}
              class="btn btn-primary"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default OcjenjivanjeJedanZadatak;
