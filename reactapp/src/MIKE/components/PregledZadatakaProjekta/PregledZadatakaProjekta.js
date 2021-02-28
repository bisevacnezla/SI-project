import React, { Component, Fragment } from 'react';
import { Form, FormGroup, Label, Input, Table } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.css';
import './komponenta.css';

import { sviProjektiTrenutnogUsera } from '../../api/projekti_zadaci';

class PregledZadatakaProjekta extends Component { 
  constructor(props) {
    super(props);

    this.state = { 
      projekti: [], 
      selektani_projekat: null,
      selektovanElement : {},
      selektovanRed : false,
      renderovanaTabela : false
    };
    
    this.renderTabela = this.renderTabela.bind(this);
    this.clickDetalji = this.clickDetalji.bind(this);
  }

  componentDidMount() {
    sviProjektiTrenutnogUsera().then(res => {
      let projekti = res.data.projekti;
      let selektani_projekat = null;
      if(projekti.length > 0) selektani_projekat = projekti[0];

      this.setState({
        projekti: projekti,
        selektani_projekat: selektani_projekat,
        selektovanElement : {},
        selektovanRed : false,
        renderovanaTabela : false
      });
    });
  }

  clickDetalji(idReda) {
    this.setState({
      selektovanElement: this.state.selektani_projekat.zadaci[idReda],
      selektovanRed: true,
      renderovanaTabela : true
    });
  }

  renderTabela() {
    let i = 1;
    return (
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Opis</th>
            <th>Od kada</th>
            <th>Do kada</th>
            <th>Zavrsen</th>
            <th>Komentar</th>
          </tr>
        </thead>
        <tbody>
          { 
          this.state.selektani_projekat != null ?
            this.state.selektani_projekat.zadaci.map((zadatak) => {
                  return (
                    <tr key={zadatak.idProjektnogZadatka} onClick={this.clickDetalji.bind(null, i-1)}>
                      <th scope="row">{i++}</th>
                      <td>{zadatak.opis}</td>
                      <td>{zadatak.otkad}</td>
                      <td>{zadatak.dokad}</td>
                      <td>{zadatak.zavrsen}</td>
                      <td>{zadatak.komentarAsistenta}</td>
                    </tr>)
                }) : null
          }
        </tbody>
      </Table>
    );
  }

  selektan(val) {
    for(let i=0; i<this.state.projekti.length; i++)
    {
      if(this.state.projekti[i].id == val)
      {
        this.setState({selektani_projekat: this.state.projekti[i], renderovanaTabela : true, selektovanRed : false});
        return;
      }
    }    
  }

  render() {
    let detalji = <div id="detalji"></div>
    if(this.state.selektovanRed && this.state.selektovanElement && this.state.renderovanaTabela){
      detalji = (<div className="mini-card" id="detalji">
        <h1>#Detalji:</h1>
          <Label className="white"> {this.state.selektovanElement.opis} </Label><br></br>
          <Label>Trajanje projekta: {this.state.selektovanElement.otkad} - {this.state.selektovanElement.dokad}</Label><br></br>
          <Label>Završen projekat: {this.state.selektovanElement.zavrsen}</Label><br></br>
          <Label>Komentar projektnog zadatka: {this.state.selektovanElement.komentarAsistenta}</Label><br></br>
      </div>);
    }

    return (
      <Fragment>
        <Form>
        <FormGroup>
          <Label >Vaši projekti: </Label>
          <Input type="select" name="select" onChange={(e)=>{this.selektan(e.target.value)}}>
            {this.state.projekti.map((projekat) => {
                return (<option key={projekat.id} value={projekat.id}>{`${projekat.naziv_projekta} (${projekat.naziv_predmeta})`}</option>);
              })}
          </Input>
        </FormGroup>
        </Form>

        <Label >Zadaci za odabrani projekat:</Label>
        {this.renderTabela()}
        {detalji}
      </Fragment>
    );
  }
}

export default PregledZadatakaProjekta;
