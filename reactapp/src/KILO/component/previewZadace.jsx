import React, { Component } from "react";
import { FormGroup, Table } from "reactstrap";

class PreviewZadace extends Component {
  render() {
    var kolone = [];
    var zadaciCelije = [];
    var tipovi = [];
    for (var i = 0; i < this.props.podaci.brojZadataka; i++) {
      var tipoviZadatka = "";
      kolone.push("Zadatak " + (i + 1));
      for (var j = 0; j < this.props.podaci.listaTipova[i].length; j++) {
        if (this.props.podaci.listaTipova[i][j]) {
          if (j === 0) tipoviZadatka += " /.pdf";
          else if (j === 1) tipoviZadatka += " /.zip";
          else if (j === 2) tipoviZadatka += " /.m";
          else if (j === 3) tipoviZadatka += " /.doc";
          else if (j === 4) tipoviZadatka += " /.txt";
        }
      }
      tipovi.push(tipoviZadatka);
      zadaciCelije.push(this.props.podaci.listaBodova[i] + " " + tipovi[i]);
    }

    return (
      <div class="p-3">
        <FormGroup>
          <Table className="table table-bordered text-center bg-active border-solid">
            <thead>
              <tr className="bg-primary text-light">
                <th class="tabtip">INFO</th>
                {kolone.map((zadatak, indeks) => (
                  <th class="tabtip" key={zadatak + indeks}>
                    {zadatak}
                  </th>
                ))}
                <th class="tabtip">Datum i vrijeme</th>
                <th class="tabtip">Ukupan broj bodova</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th class="tabtip1">{this.props.podaci.naziv}</th>
                {zadaciCelije.map((text, indeks2) => (
                  <th class="tabtip1" key={text + indeks2}>
                    {text}
                  </th>
                ))}
                <th class="tabtip1">
                  {this.props.podaci.datum + " " + this.props.podaci.vrijeme}
                </th>
                <th class="tabtip1">{this.props.podaci.ukupnoBodova}</th>
              </tr>
            </tbody>
          </Table>
        </FormGroup>
      </div>
    );
  }
}

export default PreviewZadace;
