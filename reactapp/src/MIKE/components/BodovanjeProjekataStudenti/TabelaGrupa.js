import React, { Component, Fragment } from 'react';
import { Form, FormGroup, Label, Input, Table, Button } from 'reactstrap';

//import 'bootstrap/dist/css/bootstrap.css';

import RedTabele from './RedTabele.js'

class TabelaGrupa extends Component { 
  constructor(props) {
    super(props);

    this.state = { 
      brojGrupe: props.brojGrupe,
      grupa: props.grupa,
      callbackPojedinacno: props.callbackPojedinacno,
      callbackGrupno: props.callbackGrupno
    };

    this.bodovanjePojedinacno = this.bodovanjePojedinacno.bind(this);
    this.bodovanjeGrupno = this.bodovanjeGrupno.bind(this);
  }

  bodovanjePojedinacno(idStudenta, noviBodovi) {
    let studenti = [
        {
            idStudent: idStudenta,
            idGrupaProjekta: this.state.grupa.id,
            ostvareniBodovi: noviBodovi
        }
    ];

    this.state.callbackPojedinacno(studenti);
  }

  bodovanjeGrupno(noviBodovi) {
    this.state.callbackGrupno(this.state.grupa.id, noviBodovi);
  }

  updateInputValue(val) {
    this.setState({
        bodoviGrupa: val.target.value
    });
  }

  render() {
    let i = 1;
    return (
      <Fragment key={this.state.grupa.id}>
        
        <label className="col-form-label col-form-label-lg">Naziv grupe: {this.state.grupa.nazivGrupe}</label>

        <Input type="number" min="0" placeholder="Bodovi za svakog člana..." onChange={val => this.updateInputValue(val)}></Input>

        <br/>

        <Button onClick={() => {this.bodovanjeGrupno(this.state.bodoviGrupa)}}>
              Unesi iste bodove za sve članove projektne grupe
        </Button>

         <br/>

        <Table className="table table-dark table-bordered text-center border-solid">
          <thead>
            <tr className="bg-primary text-dark">
              <th className="tabtip">#</th>
              <th className="tabtip">Ime</th>
              <th className="tabtip">Prezime</th>
              <th className="tabtip">Indeks</th>
              <th className="tabtip">Broj bodova</th>
              <th className="tabtip">Novi bodovi</th>
              <th className="tabtip"></th>
            </tr>
          </thead>
          <tbody>
            { 
              this.props.grupa.studenti.map((student) => {
                    return (
                      <RedTabele key={student.id} refresh={this.props.refresh} redniBroj={i++} student={student} bodovi={student.brojBodova} callback={this.bodovanjePojedinacno}></RedTabele>
                    )
                  })
            }
          </tbody>
        </Table>
        <br/>
      </Fragment>
    );
  }
    
}

export default TabelaGrupa;
