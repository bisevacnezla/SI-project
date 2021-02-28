import React, { Component, Fragment } from 'react';
import { Form, FormGroup, Label, Input, Table, Button } from 'reactstrap';

//import 'bootstrap/dist/css/bootstrap.css';

import TabelaGrupa from '../BodovanjeProjekataStudenti/TabelaGrupa'
import { sviPredmetiAsistenta, sveGrupeProjekta } from '../../api/projekti_zadaci';
import { upisBodovaPojedinacno, upisBodovaGrupno, skaliranje } from '../../api/bodovanje';

class ListaPredmetaAsistenta extends Component { 
  constructor(props) {
    super(props);

    let predmeti = this.props.predmeti;
    if(predmeti.message) predmeti = [];

    this.state = { 
      idAsistent:this.props.idAsistent,
      predmeti:predmeti,
      selektani_predmet: null,
      grupe: [],
      refresh: 1,
      faktorSkaliranja: 1
    };

    this.renderGrupe = this.renderGrupe.bind(this);
    this.bodovanjePojedinacno = this.bodovanjePojedinacno.bind(this);
    this.bodovanjeGrupno = this.bodovanjeGrupno.bind(this);
    this.ucitajGrupe = this.ucitajGrupe.bind(this);
    this.renderDetalji = this.renderDetalji.bind(this);
    this.prikaziGrupe = this.prikaziGrupe.bind(this);
    this.skaliranje = this.skaliranje.bind(this);
  }

  componentDidMount() {
    sviPredmetiAsistenta(this.state.idAsistent).then(res => {
      if(!res.data.message) {
        let predmeti = res.data;
        let selektani_predmet = null;
        if(predmeti.length > 0) selektani_predmet = predmeti[0];
        if(selektani_predmet) {
          sveGrupeProjekta(selektani_predmet.idProjekat).then((res) => {
            if(!res.data.message) {
              this.setState({
                predmeti: predmeti,
                selektani_predmet: selektani_predmet,
                grupe: res.data
              });
            }
            else {
              this.setState({
                predmeti: predmeti,
                selektani_predmet: selektani_predmet,
                grupe: []
              });
            }
          });
        }
        else {
          this.setState({
            predmeti: predmeti,
            selektani_predmet: selektani_predmet,
            grupe: []
          });
        }
      }
      else {
        this.setState({
          predmeti: [],
          selektani_predmet: null,
          grupe: []
        });
      }
    });
  }

  ucitajGrupe() {
    if(this.state.selektani_predmet) {
      sveGrupeProjekta(this.state.selektani_predmet.idProjekat).then((res) => {
        if(!res.data.message) {
          this.setState({
            grupe: res.data,
            refresh: this.state.refresh + 1
          });
        }
        else {
          this.setState({
            grupe: [],
            refresh: this.state.refresh + 1
          });
        }
      });
    }
    else {
      this.setState({
        grupe: [],
        refresh: this.state.refresh + 1
      });
    }
  }

  validacijaBodova(bodovi) {
    let maxBodova = this.state.selektani_predmet.moguciBodovi;
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

    upisBodovaPojedinacno(studenti, this.state.selektani_predmet.idProjekat).then((response) => {
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

  selektanPredmet(val) {
    for(let i=0; i<this.state.predmeti.length; i++)
    {
      if(this.state.predmeti[i].idPredmet == val)
      {
        sveGrupeProjekta(this.state.predmeti[i].idProjekat).then((res) => {
          if(!res.data.message) {
            this.setState({
              selektani_predmet: this.state.predmeti[i],
              grupe: res.data,
              refresh: this.state.refresh + 1
            });
          }
          else {
            this.setState({
              selektani_predmet: this.state.predmeti[i],
              grupe: [],
              refresh: this.state.refresh + 1
            });
          }
        });

        return;
      }
    }    
  }

  prikaziGrupe() {
    return (
      <Fragment>
        {this.state.grupe && this.state.grupe.length > 0 ? 
          <Fragment> 
            <label className="col-form-label col-form-label-lg">Projektne grupe</label>
            <br></br>
            {this.renderGrupe()}
          </Fragment>
          : <label className="control-label">Nema kreiranih projektnih grupa za ovaj predmet.</label>}
      </Fragment>
    )
  }

  renderGrupe() {
    let i = 1;
    return (
      <div className ="card m1-3 h-100">
      {this.state.grupe.map((grupa) => {
        return (
          <TabelaGrupa key={grupa.id} grupa={grupa} brojGrupe={i++} callbackPojedinacno={this.bodovanjePojedinacno} callbackGrupno={this.bodovanjeGrupno} refresh={this.state.refresh} ></TabelaGrupa>
        );
      })}
      </div>
    );
  }

  updateInputValueSkaliranje(val) {
    this.setState({
        faktorSkaliranja: val.target.value
    });
  }

  skaliranje(faktor) {
    if(this.state.selektani_predmet && faktor && !isNaN(faktor) && faktor > 0) {
      skaliranje(this.state.selektani_predmet.idProjekat, faktor).then((res) => {
        this.ucitajGrupe();
      })
    }
  }

  renderDetalji() {
    return (
      <div style={{textAlign:"left"}}>
        {this.state.selektani_predmet ? 
          <Fragment>
            <label className="col-form-label col-form-label-lg">Naziv projekta:</label>
            <br/>
            <label className="control-label">{this.state.selektani_predmet.nazivProjekta}</label>

            <hr/>

            <label className="col-form-label col-form-label-lg">Opis projekta:</label>
            <br/>
            <label className="control-label">{this.state.selektani_predmet.opis}</label>

            <hr/>

            <label className="col-form-label col-form-label-lg">Broj mogućih bodova:</label>
            <br/>
            <label className="control-label">{this.state.selektani_predmet.moguciBodovi}</label>
            <hr/>

            <label className="col-form-label col-form-label-lg">Skaliraj sve bodove:</label>
            
            <Input type="number" min="0" placeholder="Faktor skaliranja" onChange={val => this.updateInputValueSkaliranje(val)}></Input>

            <br/>

            <Button onClick={() => {this.skaliranje(this.state.faktorSkaliranja)}}>
                Skaliraj bodove za sve studente na projektu
            </Button>

            <hr/>

          </Fragment>
        : null}
      </div>
    )
  }

  render() {
    return (
      <div className="card" style={{float: "left", width:"100%"}}>
        <div className="card-body">
          <Form>
          <FormGroup>

            <h4 className="card-title" style={{textAlign:"left"}}>Pregled projekata</h4>

            <Input type="select" name="predmet" onChange={(e)=>{this.selektanPredmet(e.target.value)}}>
              {this.state.predmeti? this.state.predmeti.map((predmet) => {
                  return (<option key={predmet.idPredmet} value={predmet.idPredmet}>{`${predmet.naziv}`}</option>);
                }) : null}
            </Input>

            <hr/>

            {this.renderDetalji()}
              
            {this.prikaziGrupe()}
              
          </FormGroup>
          </Form>
        </div>
      </div>
    );
  }
}

export default ListaPredmetaAsistenta;

// useless

/*import React, { Component } from 'react';
import PregledDetaljaPredmeta from './PregledDetaljaPredmeta';
import ListaGrupa from './PrikazListeProjektnihGrupa';
import ListaPredmetaAsistenta from '../ListaPredmetaAsistenta/ListaPredmetaAsistenta';

class ListaPredmetaAsistenta extends Component {
  constructor(props){
    super(props);
    this.state = {
      idAsistent:this.props.idAsistent,
      predmeti:this.props.predmeti,
      detalji:false,
      detaljiIndex:0
    };
    this.azuriraj=this.azuriraj.bind(this);
  }
  
   render(){
    if(this.state.detalji) return (
      <div className="card" style={{float: "left", width:"100%"}}>
        <div className="card-body">
          <h4 className="card-title" style={{textAlign:"left"}}>Pregled projekata</h4>
				  
              <select id="selectListe" className="custom-select" onChange={()=>(
                this.azuriraj(document.getElementById("selectListe").selectedIndex)
              )}>
                <option className="list-group-item">Odaberite predmet</option>
                {
                  this.state.predmeti.map(predmet=>{
                    return <option className="list-group-item">{predmet.naziv}</option>
                  })
                }
              </select>
              <PregledDetaljaPredmeta naziv={this.state.predmeti[this.state.detaljiIndex].nazivProjekta} 
              opis={this.state.predmeti[this.state.detaljiIndex].opis} 
              bodovi={this.state.predmeti[this.state.detaljiIndex].moguciBodovi} 
              />
              <ListaPredmetaAsistenta selektani_projekat={this.state.predmeti[this.state.detaljiIndex].idProjekat} moguciBodovi={this.state.predmeti[this.state.detaljiIndex].moguciBodovi} />
            
        </div>
      </div>
    )
    else return(
      <div className="card" style={{float: "left", width:"100%"}}>
        <div className="card-body">
          <h4 className="card-title" style={{float:"left"}}>Pregled projekata</h4>
				  
              <select id="selectListe" className="custom-select" onChange={()=>(
                this.azuriraj(document.getElementById("selectListe").selectedIndex)
              )}>
                <option className="list-group-item">Odaberite predmet</option>
                {
                  this.state.predmeti.map(predmet=>{
                    return <option className="list-group-item">{predmet.naziv}</option>
                  })
                }
              </select>
           
        </div>
      </div>
    )
  }
  azuriraj(indeks){
    
    this.setState({
      detaljiIndex:indeks-1,
      detalji:true
    })
  }
}

  export default ListaPredmetaAsistenta;*/