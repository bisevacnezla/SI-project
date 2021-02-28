import React, { Component } from "react";
import { FormGroup, Table } from "reactstrap";
import { Icon } from '@opuscapita/react-icons';

class TabelaPregledaZadaca extends Component {

  render() {
    var mogucaStanjaZadace = ["nije poslano", "nije pregledano", "pregledano", "prepisano", "komentar"];

    return (
      <div>
        <FormGroup className="px-4 py-4">
          <Table className="table table-bordered text-center bg-active border-solid">
            <thead>
              <tr className="bg-primary text-light">
                <th class="tabtip">INFO</th>
                {this.props.podaci.state.zadacaState.listaZadataka.map((zadatak, indeks) => (
                  <th class="tabtip" key={zadatak + indeks}>{zadatak}</th>
                ))}
                <th class="tabtip">Ukupan broj bodova</th>
                <th class="tabtip">Mogući bodovi</th>
                <th class="tabtip">Postavka zadaće</th>
                <th class="tabtip">Rok za predaju zadaće</th>
              </tr>
            </thead>
            <tbody>
              {this.props.podaci.state.zadacaState.listaZadaca.map((zadatak, indeks) => (
                <tr>
                  <th class="tabtip1">{zadatak}</th>
                  {this.props.podaci.state.potrebno[indeks].map((ostvareniBodovi, indeks2) => (
                    <th class="tabtip1">{ostvareniBodovi}
                      {this.props.podaci.state.zadacaState.stanjeZadacaPoZadacima[indeks][indeks2] === 0 && <Icon type="indicator" name="attachment" className=" ml-3" onClick={() => this.props.podaci.klikNaPoslati(indeks, indeks2)} />}
                      {this.props.podaci.state.zadacaState.stanjeZadacaPoZadacima[indeks][indeks2] === 1 && <Icon type="indicator" name="search" className=" ml-3" onClick={() => this.props.podaci.klikNaVecPoslano(indeks, indeks2)} />}
                      {this.props.podaci.state.zadacaState.stanjeZadacaPoZadacima[indeks][indeks2] === 2 && <Icon type="indicator" name="ok" className=" ml-3" onClick={() => this.props.podaci.klikNaVecPoslano(indeks, indeks2)} />}
                      {this.props.podaci.state.zadacaState.stanjeZadacaPoZadacima[indeks][indeks2] === 3 && <Icon type="indicator" name="error" className=" ml-3" onClick={() => this.props.podaci.klikNaVecPoslano(indeks, indeks2)} />}
                      {this.props.podaci.state.zadacaState.stanjeZadacaPoZadacima[indeks][indeks2] === 4 && <Icon type="indicator" name="commented" className=" ml-3" onClick={() => this.props.podaci.klikNaVecPoslano(indeks, indeks2)} />}
                    </th>
                  ))}
                  <th class="tabtip1">{this.props.podaci.state.ukupnoBodova[indeks]}</th>
                  <th class="tabtip1">{this.props.podaci.state.moguceBodova[indeks]}</th>
                  <th class="tabtip1">{this.props.podaci.state.zadacaState.postavka[indeks]}{<Icon type="indicator" name="save" className=" ml-3" onClick={() => this.props.podaci.downloadPostavka(indeks)} />}</th>
                  <th class="tabtip1">{this.props.podaci.state.zadacaState.rokZaPredaju[indeks]}</th>
                </tr>
              ))}
            </tbody>
          </Table>
        </FormGroup>
      </div>
    );
  }
}

export default TabelaPregledaZadaca;
