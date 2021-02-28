import React, { Component } from "react";
import "../bootstrap.css";
import { Icon } from "@opuscapita/react-icons";

class ZadatakVecPoslan extends Component {
  render() {
    var listOfTypes = this.props.podaci.state.listaTipova;

    return (
      <div class=" card mt-3 ml-4" id="formaZadPos">
        <div className="card-title pl-3">
          <h4>
            <b>Zadaća {this.props.podaci.state.brojZadace}. </b>
            <div name="idiNazad" onClick={this.props.podaci.handleClick}>
              <Icon
                type="indicator"
                name="arrowLeft"
                className=" mr-2 float-right"
                onClick={this.props.podaci.handleBack}
              />
            </div>
          </h4>
          <h5 id="brojZad">
            Zadatak broj {this.props.podaci.state.brojZadatka}
          </h5>
        </div>
        <br />
        <div class="row">
          <div class="col">
            <div className="card ml-4 mb-4" id="formaPodaci">
              <div className="card-title px-4 py-2">
                <b>Podaci o poslanom zadatku</b>
              </div>

              <div>
                <label className="control-label" id="stLabdat">
                  Datum slanja zadatka:
                </label>
                <input
                  className="form-control w-75 ml-4"
                  type="text"
                  placeholder={this.props.podaci.state.datumSlanja}
                  readOnly=""
                />
              </div>
              <div>
                <fieldset>
                  <label className="control-label" id="stLabvr">
                    Vrijeme slanja zadatka:
                  </label>
                  <input
                    className="form-control w-75 ml-4"
                    type="text"
                    placeholder={this.props.podaci.state.vrijemeSlanja}
                    readOnly=""
                  />
                </fieldset>
              </div>

              <div>
                <fieldset>
                  <label className="control-label " id="stLabnaz">
                    Naziv datoteke:
                  </label>
                  <input
                    className="form-control w-75 ml-4"
                    type="text"
                    placeholder={this.props.podaci.state.nazivFajla}
                    readOnly=""
                  />
                </fieldset>
                <fieldset>
                  <label className="control-label" id="stLabvel">
                    Velièina datoteke:
                  </label>
                  <input
                    className="form-control w-75 ml-4"
                    type="text"
                    placeholder={this.props.podaci.state.velicinaFajla}
                    readOnly=""
                  />
                </fieldset>{" "}
              </div>

              <label className="control-label" id="stLabkom">
                Komentar:
              </label>
              <div className="card border-secondary w-75 ml-4" id="kom">
                <div className="card-body w-25 ml-4">
                  <p className="card-text w-25 ml-4">
                    {this.props.podaci.state.komentar}
                  </p>
                </div>
              </div>
              <br />
              <div class="row pb-3 mt-2">
                <div class="col ml-4">
                  <button
                    name="preuzmi"
                    type="button"
                    className="btn btn-primary"
                    id="preuzmiB"
                    onClick={this.props.podaci.handleClick}
                  >
                    <Icon type="indicator" name="sortDesc" className="mr-2" />
                    Preuzmi datoteku
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="col">
            <div className="card" id="ponovoForma">
              <div className="card-title px-4 py-2 ml-4">
                <b>Ponovno učitavanje datoteke</b>
              </div>

              <label id="stLabdoz" class="mr-5">
                Lista dozvoljenih tipova:{" "}
              </label>
              <select multiple="" className="custom-select w-50 ml-5">
                {!this.props.podaci.state.blokirajSelect2 &&
                  listOfTypes.map(clan => <option key={clan}>{clan}</option>)}
              </select>
              <input
                id="uploadButton2"
                name="uploadFajla"
                type="file"
                className="btn-outline-secondary w-50 ml-5 mt-2"
                onChange={this.props.podaci.handleClick}
              />
              <div class="row mt-3 ml-5 pb-3">
                <div class="col">
                  <button
                    id="ponisti"
                    name="ponisti"
                    type="button"
                    class="btn btn-outline-danger w-75 text-danger"
                    id="ponistiBt"
                    onClick={this.props.podaci.handleClick}
                    disabled={this.props.podaci.state.uploadZadatka[0] === null}
                  >
                    Poništi
                  </button>
                </div>
                <div class="col">
                  <button
                    name="posaljiZadatak"
                    id="posalji2"
                    type="button"
                    className="btn btn-primary mr-5 w-75"
                    onClick={this.props.podaci.handleClick}
                    disabled={this.props.podaci.state.uploadZadatka[0] === null}
                  >
                    Pošalji zadatak
                  </button>
                </div>
                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ZadatakVecPoslan;
