import React, { Component } from "react";
import "../bootstrap.css";
import { Icon } from "@opuscapita/react-icons";

class PrviPutSlanjeZadatka extends Component {


  render() {
    var listOfTypes = this.props.podaci.state.listaTipova;
    return (
      <div class="card m-3" id="prvoSlForma">
        <div className="card-title pl-3">
          <h4>
            <b class="mt-2">Zadaća {this.props.podaci.state.brojZadace}. </b>
            <Icon
              type="indicator"
              name="arrowLeft"
              className="mr-2 float-right"
              onClick={this.props.podaci.handleBack}
            />
          </h4>
          <h5>Zadatak broj {this.props.podaci.state.brojZadatka}</h5>
        </div>
        <label id="slLabdoz" class="mr-5" >Lista dozvoljenih tipova: </label>
        <select
          multiple=""
          className="custom-select w-50 ml-3"
        >
          {(!this.props.podaci.state.blokirajSelect) && listOfTypes.map(clan => (
            <option key={clan + 2000}>{clan}</option>
          ))}
        </select>
        <label class="mr-5" id="ucitDat">Učitavanje datoteke</label>
        <input
          id="uploadButton"
          name="uploadFajla"
          type="file"
          className="bbtn-outline-secondary w-50 ml-3 mt-1"
          onChange={this.props.podaci.handleClick}
        />
        <div class="row mt-3 pb-3 ml-5">
          <div class="col">
            <button
              name="ponisti"
              id="ponisti"
              type="button"
              className="btn btn-outline-danger w-50 text-danger"
              id="ponSl"
              onClick={this.props.podaci.handleClick}
              disabled={this.props.podaci.state.uploadZadatka[0] === null}
            >
              Poništi
        </button>
          </div>
          <div class="col">
            <button
              name="posaljiZadatak"
              id="posalji1"
              type="button"
              className="btn btn-primary  w-100"
              onClick={this.props.podaci.handleClick}
              disabled={this.props.podaci.state.uploadZadatka[0] === null}
            >
              Pošalji zadatak
        </button>
          </div>
        </div>
      </div>
    );
  }
}

export default PrviPutSlanjeZadatka;