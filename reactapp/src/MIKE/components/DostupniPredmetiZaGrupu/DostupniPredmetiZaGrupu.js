//prikaz liste predmeta na kojima je student, za koje postoji predmet za koji student nije ni u jednoj grupi,
//radi kreiranja projektne grupe
import React, { Component, Fragment } from 'react';
import { Form, FormGroup, Label, Input, Table, Button } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.css';

import { predmetiZaNovuProjektnuGrupu } from '../../api/projekti_zadaci';

class DostupniPredmetiZaGrupu extends Component { 
  constructor(props) {
    super(props);

    this.state = { 
        predmeti: [], 
        selektani_predmet: null
    };
    
    this.renderTabela = this.renderTabela.bind(this);
    this.generisanjeProjektneGrupeKlik = this.generisanjeProjektneGrupeKlik.bind(this);
  }

  componentDidMount() {
    predmetiZaNovuProjektnuGrupu().then(res => {
        let predmeti = res.data.predmeti;
        let selektani_predmet = null;
        if(predmeti.length > 0) selektani_predmet = predmeti[0];

        this.setState({
            predmeti: predmeti,
            selektani_predmet: selektani_predmet
        });
    });
  }

  generisanjeProjektneGrupeKlik(idProjekta) {
    // handleanje kreiranja projektne grupe...
  }

  renderTabela() {
    let i = 1;
    return (
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Naziv</th>
            <th>Opis</th>
            <th>Progress</th>
            <th>Moguci bodovi</th>
            <th>Rok</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
          this.state.selektani_predmet != null ?
            this.state.selektani_predmet.projekti.map((projekat) => {
                  return (
                    <tr key={projekat.idProjekat}>
                      <th scope="row">{i++}</th>
                      <td>{projekat.nazivProjekta}</td>
                      <td>{projekat.opisProjekta}</td>
                      <td>{projekat.progress}</td>
                      <td>{projekat.moguciBodovi}</td>
                      <td>{projekat.rokProjekta}</td>
                      <td><Button onClick={() => this.generisanjeProjektneGrupeKlik(projekat.idProjekat)}>Kreiraj projektnu grupu</Button></td>
                    </tr>)
                }) : null
          }
        </tbody>
      </Table>
    );
  }

  selektan(val) {
    for(let i=0; i<this.state.predmeti.length; i++)
    {
      if(this.state.predmeti[i].id === val)
      {
        this.setState({selektani_predmet: this.state.predmeti[i]});
        return;
      }
    }
  }

  render() {
    return (
      <Fragment>
        <Form>
        <FormGroup>
          <Label >Predmeti za koje postoje projekti na kojima možete kreirati projektnu grupu: </Label>
          <Input type="select" name="select" onChange={(e)=>{this.selektan(e.target.value)}}>
            {this.state.predmeti.map((predmet) => {
                return (<option key={predmet.id} value={predmet.id}>{`${predmet.naziv_predmeta}`}</option>);
              })}
          </Input>
        </FormGroup>
        </Form>

        <Label >Projekti:</Label>
        {this.renderTabela()}
      </Fragment>
    );
  }
}

export default DostupniPredmetiZaGrupu;