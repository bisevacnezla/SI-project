import React, { Component } from "react";
import { Icon } from "@opuscapita/react-icons";
import { FormGroup, Table } from "@material-ui/core";

class OcjenjivanjeJednaZadaca extends Component {

  render() {
    return (
      <div class="card w-75 ml-5 mt-4">
        <div className="card-title ml-4 mt-2">
          <h4>
            <b>{this.props.podaci.state.zadaca}</b>
            <Icon
              type="indicator"
              name="arrowLeft"
              className="mr-2 float-right"
              onClick={this.props.podaci.handleBackNaJednaIzborZadace}
            /><br />
            <b id="bSt">Student: {this.props.podaci.state.student}</b>
          </h4>
        </div>
        <br />
        <FormGroup className="px-4">
          <Table className="table table-bordered text-center bg-active border-solid">
            <thead>
              <tr className="bg-primary text-light">
                <th class="tabtip">INFO</th>
                {this.props.podaci.state.zadacaState.zadaciZadace.map((zadatak, indeks) => (
                  <th class="tabtip" key={zadatak + indeks}>{zadatak}</th>
                ))}
                <th class="tabtip">Ukupan broj bodova</th>
                <th class="tabtip">Mogući bodovi</th>
                <th class="tabtip">Postavka zadaće</th>
                <th class="tabtip">Rok za predaju zadaće</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th class="tabtip1">{this.props.podaci.state.zadaca}</th>

                {this.props.podaci.state.ostvareniMoguci.map((ostvareniBodovi, indeks2) => (
                  <th class="tabtip1">{ostvareniBodovi}
                    {this.props.podaci.state.zadacaState.stanjeZadatakaZadace[indeks2] === 0 && <Icon type="indicator" name="attachment" className=" ml-3"/>}
                    {this.props.podaci.state.zadacaState.stanjeZadatakaZadace[indeks2] === 1 && <Icon type="indicator" name="search" className=" ml-3" onClick={() => this.props.podaci.handleNaOcjenjivanjeJedanZadatak(indeks2)} />}
                    {this.props.podaci.state.zadacaState.stanjeZadatakaZadace[indeks2] === 2 && <Icon type="indicator" name="ok" className=" ml-3" onClick={() => this.props.podaci.handleNaOcjenjivanjeJedanZadatak(indeks2)} />}
                    {this.props.podaci.state.zadacaState.stanjeZadatakaZadace[indeks2] === 3 && <Icon type="indicator" name="error" className=" ml-3" onClick={() => this.props.podaci.handleNaOcjenjivanjeJedanZadatak(indeks2)} />}
                    {this.props.podaci.state.zadacaState.stanjeZadatakaZadace[indeks2] === 4 && <Icon type="indicator" name="commented" className=" ml-3" onClick={() => this.props.podaci.handleNaOcjenjivanjeJedanZadatak(indeks2)} />}
                  </th>

                ))
                }






                {/* 

                           {this.props.podaci.state.ostvareniMoguci.map((ostvareniBodovi, indeks2) => ( 
                            <th key={ostvareniBodovi + indeks2}>{ostvareniBodovi}
                            {this.props.podaci.state.zadacaState.pregledanZadatak[indeks2] == false && <Icon type="indicator" name="attachment" className=" ml-3" onClick = {() => this.props.podaci.handleNaOcjenjivanjeJedanZadatak(indeks2)}/>}
                            {this.props.podaci.state.zadacaState.pregledanZadatak[indeks2] == true && <Icon type="indicator" name="ok" className=" ml-3" onClick = {() => this.props.podaci.handleNaOcjenjivanjeJedanZadatak(indeks2)}/>}
                            </th>
                           ))}
                          */}
                <th class="tabtip1">{Math.round(this.props.podaci.state.sumaOsvojeni*100)/100}</th>
                <th class="tabtip1">{Math.round(this.props.podaci.state.sumaMoguci*100)/100}</th>
                <th class="tabtip1">{this.props.podaci.state.zadacaState.postavkaZadace}{<Icon type="indicator" name="save" className=" ml-3" />}</th>
                <th class="tabtip1">{this.props.podaci.state.zadacaState.rokZaPredaju}</th>
              </tr>
            </tbody>

          </Table>
        </FormGroup>


      </div>
    );
  }
}

export default OcjenjivanjeJednaZadaca;
