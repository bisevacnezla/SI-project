import React, { Component, Fragment } from "react";
import { Collapse, Spinner } from "reactstrap";
import { toast } from "react-toastify";

import { dataPredmetPoGodini } from "../../../../Student/Izvjestaji/api.js";
import "jspdf-autotable";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const jsPDF = require("jspdf");

class TabelarniPrikaz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nizStavki: null,
      data: null
    };
  }
  componentDidMount() {
    let { predmetId, godinaId } = this.props.match.params;
    let profesorId = window.localStorage.getItem("id");
    dataPredmetPoGodini
      .getDataZaProfesora(profesorId, predmetId, godinaId)
      .then(data => {
        let { nazivGodine, nazivPredmeta } = data;
        let nizStudenata = data.data;
        let sveStavke = {};
        nizStudenata.map(student => {
          student.stavkeOcjenjivanja.map(stavka => {
            if (!(stavka.naziv in sveStavke)) sveStavke[stavka.naziv] = true;
          });
        });
        let nizStavki = [];
        for (var key in sveStavke) {
          nizStavki.push(key);
        }
        this.setState({
          nizStavki: nizStavki,
          nazivGodine: nazivGodine,
          nazivPredmeta: nazivPredmeta,
          nizStudenata: data,
          postoji: true
        });
      })
      .catch(res => {
        toast.error(res.message);
        this.setState({
          postoji: false
        });
      });
  }
  renderLinijeStudenata() {
    let nizLinija = [];
    let nizStudenata = this.state.nizStudenata.data;
    nizStudenata.map(student => {
      nizLinija.push(
        <tr>
          <td>{`${student.imeStudenta} ${student.prezimeStudenta}`}</td>
          <td>{student.indeks}</td>
          {this.state.nizStavki.map(stavka => {
            for (let i = 0; i < student.stavkeOcjenjivanja.length; i++) {
              let stavkaPostojeca = student.stavkeOcjenjivanja[i];
              if (stavkaPostojeca.naziv == stavka) {
                return <td>{stavkaPostojeca.brojBodova}</td>;
              }
            }
            return <td>/</td>;
          })}
        </tr>
      );
    });
    return nizLinija;
  }
  renderTabela() {
    return (
      <table id="table" className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th key="imeiprezime">Ime i prezime</th>
            <th key="indeks">Indeks</th>
            {this.state.nizStavki.map(stavka => {
              return (
                <th scope="col" key={stavka}>
                  {stavka}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>{this.renderLinijeStudenata()}</tbody>
      </table>
    );
  }
  Export() {
    var doc = new jsPDF();
    doc.autoTable({ html: "#table" });
    doc.save("izvjestaj.pdf");
  }

  render() {
    return this.state.nizStavki == null ? (
      <div className="d-flex w-100 justify-content-center">
        <Spinner />
      </div>
    ) : !this.state.postoji ? (
      <div className="d-flex w-100 justify-content-center">
        Izvjestaj ne postoji!
      </div>
    ) : (
      <div className="p-2">
        <h3>{this.state.nazivPredmeta}</h3>
        <h4>
          Akademska {this.state.nazivGodine} godina - Izvještaj o predmetu
        </h4>
        {this.renderTabela()}
        <button onClick={this.Export}>Eksportuj u PDF</button>
        <ReactHTMLTableToExcel
          id="test-table-xls-button"
          //className="download-table-xls-button"
          table="table"
          filename="izvjestaj"
          sheet="izvjestaj"
          buttonText="Eksporuj u XLS"
        />
      </div>
    );
  }
}

export default TabelarniPrikaz;