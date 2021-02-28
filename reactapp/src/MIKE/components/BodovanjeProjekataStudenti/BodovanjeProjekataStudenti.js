import React, { Component, Fragment } from 'react';
import { Form, FormGroup, Label, Input, Table, Button } from 'reactstrap';

//import 'bootstrap/dist/css/bootstrap.css';

import TabelaGrupa from './TabelaGrupa.js'
import { sveGrupeProjekta } from '../../api/projekti_zadaci';
import { upisBodovaPojedinacno, upisBodovaGrupno } from '../../api/bodovanje';

class BodovanjeProjekataStudenti extends Component { 
  constructor(props) {
    super(props);

    this.state = {
      selektani_projekat: this.props.selektani_projekat,
      grupe: [],
      moguciBodovi: this.props.moguciBodovi
    };

    this.renderGrupe = this.renderGrupe.bind(this);
    this.bodovanjePojedinacno = this.bodovanjePojedinacno.bind(this);
    this.bodovanjeGrupno = this.bodovanjeGrupno.bind(this);
    this.ucitajGrupe = this.ucitajGrupe.bind(this);
  }

  componentDidMount() {
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    console.log(`USERNAME: ${window.localStorage.getItem("username")}`)
    console.log(`ID: ${window.localStorage.getItem("id")}`)
    console.log(`TOKEN: ${window.localStorage.getItem("token")}`)
    this.ucitajGrupe();
  }

  ucitajGrupe() {
    if(this.state.selektani_projekat) {
      sveGrupeProjekta(this.state.selektani_projekat).then((res) => {
        this.setState({
          grupe: res.data
        });
        console.log("UCITANE GRUPE:")
        console.log(JSON.stringify(this.state.grupe))
      });
    }
    else {
      this.setState({
        grupe: []
      });
    }
  }

  validacijaBodova(bodovi) {
    let maxBodova = this.state.moguciBodovi;
    if(isNaN(bodovi)) {
      // prikaz errora - neispravan unos
      console.log("Broj bodova mora biti cijeli broj");
      return false;
    }
    else if(bodovi > maxBodova || bodovi < 0) {
      // prikaz errora - bodovi moraju biti u range [0, max]
      console.log("Bodovi nisu u range [0, max]");
      return false;
    }
    return true;
  }

  bodovanjePojedinacno(studenti) {
    // validacija
    for(let i = 0; i < studenti.length; i++) {
      let trenutniBodovi = studenti[i].ostvareniBodovi;
      if(!this.validacijaBodova(trenutniBodovi)) {
        return;
      }
    }

    upisBodovaPojedinacno(studenti, this.state.selektani_projekat).then((response) => {
      if(response.data.message == "Uspjesno bodovan svaki clan grupe za definisani projekat.") {
        this.ucitajGrupe();
      }
      else {
        // prikaz errora - doslo je do greske
        console.log(response.data.message);
      }
    })
    .catch((err) => {
      console.log(err);
      // doslo je do greske - nema konekcije ?
    });
  }

  bodovanjeGrupno(idGrupaProjekta, bodovi) {
    // validacija
    if(!this.validacijaBodova(bodovi)) {
      return;
    }

    upisBodovaGrupno(idGrupaProjekta, bodovi).then((response) => {
      if(response.data.message == "Uspjesno bodovan projekat.") {
        this.ucitajGrupe();
      }
      else {
        // prikaz errora - doslo je do greske
        console.log(response.data.message);
      }
    })
    .catch((err) => {
      console.log(err);
      // doslo je do greske - nema konekcije ?
    });
  }

  renderGrupe() {
    let i = 1;
    return (
      <Fragment>
      {this.state.grupe.map((grupa) => {
        return (
          <TabelaGrupa key={grupa.id} grupa={grupa} brojGrupe={i++} callbackPojedinacno={this.bodovanjePojedinacno} callbackGrupno={this.bodovanjeGrupno}></TabelaGrupa>
        );
      })}
      </Fragment>
    );
  }

  render() {
    return (
      <Fragment>
        <Form>
        <FormGroup>

          <hr/>

          <Label>Projektne grupe:</Label>

          <br></br>

          {this.renderGrupe()}
          
        </FormGroup>
        </Form>
      </Fragment>
    );
  }
}

export default BodovanjeProjekataStudenti;