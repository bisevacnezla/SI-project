import React, { Component } from 'react';
import PrikazPredmeta from './PrikazPredmeta'
import './bootstrapflatly.css'
import UnosInformacija from './UnosInformacija';
import InterfejsUredjivanjeClanovaGrupe from './InterfejsUredjivanjeClanovaGrupe';

  class Lista extends Component {
    constructor(props){
      super(props);
      this.state = {
        tech: 'Lista predmeta: ',
        predmeti:props.predmeti,
        trenutniPredmet:0,
        forma:"null",
        korisnik:props.korisnik
      };
      this.informacije=this.informacije.bind(this);
    }
    handleChange(e){
      var selekt=document.getElementById("selectListe").selectedIndex;
      this.setState({
        tech: e.target.value,
        trenutniPredmet:selekt-1
      })
    }
    render(){
      if(this.state.forma=="null" && this.state.predmeti.length>0) return (
        <div className="card" style={{float: "left", width:"100%"}}>
          <div class="card-body"> 
         <h4 class="card-title" style={{textAlign:"left"}}>{this.state.tech}</h4>
         <h6 class="card-subtitle mb-2 text-muted" style={{textAlign:"left"}}>Odaberite predmet za koji zelite kreirati projektnu grupu</h6>
          <br/>
          <select  className="form-control" id="selectListe" onChange={this.handleChange.bind(this)} value={this.state.tech}>
            <option className="list-group-item" value="Lista predmeta">Odaberite predmet</option>
            {
              this.state.predmeti.map(predmet=>{
                return <option className="list-group-item" value={predmet.naziv_predmeta}>{predmet.naziv_predmeta}</option>
              })
            }
          </select>
          {/*opis radi ako postoje predmeti, inace ne*/}
        <PrikazPredmeta opisProjekta={this.state.predmeti[this.state.trenutniPredmet].projekti[0].opisProjekta} brojMogucihBodova={this.state.predmeti[this.state.trenutniPredmet].projekti[0].moguciBodovi}/>
        <button className="btn btn-primary" style={{float:"right", margin:"10px"}} onClick={this.informacije}>Dalje</button>
        </div>
        </div>
      );
      else if(this.state.predmeti.length==0){
        return(
          <div className="alert alert-dismissible alert-danger" style={{width:"100%"}}>
        <strong>Nema dostupnih predmeta za kreiranje projektne grupe</strong> <br />
      </div>
        )
      }
      else if(this.state.forma=="informacije") return(
        <UnosInformacija korisnik={this.state.korisnik} predmet={this.state.predmeti[this.state.trenutniPredmet]}/>
      );
    }
    informacije(){
      this.setState({
        forma:"informacije"
      })
    }
  }

  export default Lista;
