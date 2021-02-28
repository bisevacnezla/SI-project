import React, { Component } from "react";
import { CustomInput, Form, FormGroup, Label, Input, Table } from "reactstrap";
import "../bootstrap.css";

const FILE_TYPES = [
  {
    ekstenzija: ".pdf",
    nazivEkstenzije: "pdf"
  },
  {
    ekstenzija: ".zip",
    nazivEkstenzije: "zip"
  },
  {
    ekstenzija: ".m",
    nazivEkstenzije: "m"
  },
  {
    ekstenzija: ".doc",
    nazivEkstenzije: "doc"
  },
  {
    ekstenzija: ".txt",
    nazivEkstenzije: "txt"
  }
];

class DodavanjeTipovaFileova extends Component {
  render() {
    var kk = this.props.podaci.state.naziv;
    var kolone = [];
    for (var i = 1; i <= this.props.podaci.state.brojZadataka; i++) {
      kolone.push("Zadatak " + i);
    }

    return (
      <div /*class="card ml-3 h-100"*/ style={{ width: "25rem", height: "50%" }}>
        <Form>
          <div id="tipoviT" className="card-title p-2">
            <h4>
              <b>Tipovi fileova za svaki zadatak</b>

            </h4>
          </div>
        
          <FormGroup row>
            <div id="labTip" sm={10}>
              <label>Da li svi zadaci imaju iste tipove fileova:</label>
            </div>
            <div class="col" sm={2} id="ss">
              <CustomInput
                checked={this.props.podaci.state.sviTipoviIsti}
                type="switch"
                id="switchTip"
                name="sviTipoviIsti"
                label="DA"
                onChange={this.props.onChange}
              />
            </div>
          </FormGroup>

          <FormGroup >
            <div id="tabelaTipovi" className="p-2">
              <br></br><br></br><br></br><br></br><br></br><br></br><br></br>
              <Table bordered className="table table-bordered text-center">
                <thead>
                  <tr className="text-dark">
                    <th class="tabtip">Naziv zadaće</th>

                    {kolone.map(jedno => (
                      <th class="tabtip" scope="col" key={jedno}>
                        {jedno}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th class="tabtip1" scope="row">{kk}</th>
                    {kolone.map((jedno, index) => (
                      <th class="tabtip1" scope="col">
                        <td>
                          {FILE_TYPES.map((item, jIndex) => (
                            <FormGroup key={item.ekstenzija} check>
                              <Input
                                type="checkbox"
                                id={jedno + item.nazivEkstenzije}
                                disabled={
                                  this.props.podaci.state.radnja == "Azuriranje"
                                  ||
                                  (this.props.podaci.state.sviTipoviIsti &&
                                    index > 0)
                                }
                                checked={
                                  this.props.podaci.state.listaTipova[index][
                                  jIndex
                                  ]
                                }
                                onChange={e => {
                                  this.props.podaci.state.trenutnaEkstenzija =
                                    item.nazivEkstenzije;
                                  this.props.podaci.onChangeListaTipova(
                                    index,
                                    jIndex
                                  );
                                }}
                              />{" "}
                              <Label check>{item.ekstenzija}</Label>
                            </FormGroup>
                          ))}
                        </td>
                      </th>
                    ))}
                  </tr>
                </tbody>
              </Table>
              <div style={{ visibility: !(this.props.podaci.state.porukeGreske[4] == "" || this.props.podaci.state.porukeGreske[4] == undefined) ? "visible" : "hidden" }}><p class="text-danger">{this.props.podaci.state.porukeGreske[4]}</p></div>
            </div>
          </FormGroup>

        </Form>
      </div>
    );
  }
}

export default DodavanjeTipovaFileova;
