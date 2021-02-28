import React, { Component, Fragment } from 'react';
import { Form, Label } from 'reactstrap';
import './bootstrapflatly.css';
import IzborVodje from './FormaZaIzborVodje';
import InterfejsUredjivanjeClanovaGrupe from './InterfejsUredjivanjeClanovaGrupe';

class BrisanjeClanova extends Component {
    constructor(props){
        super(props);
        this.state={
          forma:"null"
        }
        this.izbrisiClana=this.izbrisiClana.bind(this);
        this.izborVodje=this.izborVodje.bind(this);
        this.uredjivanjeClanova=this.uredjivanjeClanova.bind(this);
    }

        render() {
            if(this.state.forma=="null") {
            return (
                <div className="card" style={{float: "left", width:"100%"}}>
                    <div class="card-body">  
                <h4 class="card-title" style={{textAlign:"left"}}>Brisanje clanova grupe</h4>
                <h6 class="card-subtitle mb-2 text-muted" style={{textAlign:"left"}}>Odaberite clana grupe kojeg zelite izbrisati</h6>
                <br/>
                <select  className="form-control"  >
                                        <option  className="list-group-item" value="" selected="selected">Odaberite grupu</option>
                                        <option className="list-group-item" value="grupa1" >Grupa 1</option>
                                        <option className="list-group-item" value="grupa2" >Grupa 2</option>
                                        <option className="list-group-item" value="grupa3" >Grupa 3</option>
                                    </select>
                                    <br/>
                <select  multiple className="form-control"  >
                 <option  className="list-group-item" value="" selected="selected">Odaberite clana grupe</option>
                 <option className="list-group-item" value="grupa1" >Clan 1</option>
                 <option className="list-group-item" value="grupa2" >Clan 2</option>
                 <option className="list-group-item" value="grupa3" >Clan 3</option>
             </select>
             <br/>
                                    
              <button className="btn btn-primary" style={{float:"right", margin:"10px"}} onClick={this.izborVodje}>Dalje</button>
                 <button className="btn btn-primary" style={{float:"right", margin:"10px"}} onClick={this.izbrisiClana}>Izbrisi</button>
                 <button className="btn btn-primary" style={{float:"left", margin:"10px"}} onClick={this.uredjivanjeClanova}>Nazad</button>

              
                </div>
                </div>
             );
            }

            else if(this.state.forma=="izborVodje") return (
                    <IzborVodje/>
            )
            else if(this.state.forma=="uredjivanjeClanova") return (
                <InterfejsUredjivanjeClanovaGrupe/>
            )
        }

        izbrisiClana() {
            alert("Izbrisano!");
        }
        izborVodje() {
            this.setState({forma:"izborVodje"});
        }
        uredjivanjeClanova() {
            this.setState({forma:"uredjivanjeClanova"});
        }
}

export default BrisanjeClanova;