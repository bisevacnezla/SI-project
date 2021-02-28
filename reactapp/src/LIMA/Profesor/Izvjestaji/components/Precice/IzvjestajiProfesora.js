import React, { Component, Fragment } from 'react';
import { Spinner, Collapse, FormGroup, Label, Input } from 'reactstrap';
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";

import { predmeti } from '../../../../Student/Izvjestaji/api.js';
import { permuteDomain } from 'tough-cookie';

class IzvjestajiProfesora extends Component {
    constructor(props){
        super(props)
        this.state = {
            predmetiGodine: null,
            groupBy: 'godina', //ili predmet,
            grouped: [],
            collapseItems: {}
        }
    }
    toggleCreateModal(){
        this.setState({
            createModal: !this.state.createModal
        })
    }
    componentDidMount(){
        let profesorId = window.localStorage.getItem("id");
        predmeti.getPredmetiProfesoraPoGodinama(profesorId).then((data)=>{
            let predmetiGodine = [];
            data.map((godinaPredmeti)=>{ 
                godinaPredmeti.predmeti.map((predmet)=>{
                    predmetiGodine.push({ 
                        predmetNaziv: predmet.naziv, 
                        predmetId: predmet.id, 
                        godinaId: godinaPredmeti.godinaId, 
                        godinaNaziv: godinaPredmeti.godinaNaziv 
                    })
                })
            })
            this.setState({
                predmetiGodine: predmetiGodine
            }, ()=>{ this.groupStavke('predmet')})
        }).catch(err => {
            toast.error("Greska!")
        });
    }
    groupStavke(groupBy){
        let { predmetiGodine } = this.state;
        let grouped = {};
        let collapseItems = {};
        if(groupBy == "godina"){
            predmetiGodine.map((stavka)=>{
                if(!(stavka.godinaId in grouped)){
                    grouped[stavka.godinaId] = {
                        naziv: stavka.godinaNaziv,
                        id: stavka.godinaId,
                        stavke: [{
                            godinaId: stavka.godinaId, 
                            predmetId: stavka.predmetId,
                            naziv: stavka.predmetNaziv,
                        }]
                    }
                } else {
                    grouped[stavka.godinaId].stavke.push({
                        godinaId: stavka.godinaId, 
                        predmetId: stavka.predmetId,
                        naziv: stavka.predmetNaziv,
                    })
                }
            })
        } else if(groupBy == "predmet"){
            predmetiGodine.map((stavka)=>{
                if(!(stavka.predmetId in grouped)){
                    grouped[stavka.predmetId] = {
                        naziv: stavka.predmetNaziv,
                        id: stavka.predmetId,
                        stavke: [{
                            godinaId: stavka.godinaId, 
                            predmetId: stavka.predmetId,
                            naziv: stavka.godinaNaziv,
                        }]
                    }
                } else {
                    grouped[stavka.predmetId].stavke.push({
                        godinaId: stavka.godinaId, 
                        predmetId: stavka.predmetId,
                        naziv: stavka.godinaNaziv,
                    })
                }
            })
        }
        let nizGrouped = [];
        for (var key in grouped) {
            collapseItems[key] = false;
            nizGrouped.push(grouped[key]);
        }
        this.setState({
            collapseItems: collapseItems,
            grouped: nizGrouped,
            groupBy: groupBy
        })
    }
    renderIzvjestajiLinks(){
        let { predmetiGodine, grouped } = this.state;
        
        if(predmetiGodine.length == 0)return <div className="card-body border px-2 d-flex justify-content-center">Nemate predmeta.</div>

        return grouped.map((bigStavka)=>{
            return (
                <Fragment key={bigStavka.id}>
                    <h6 className="card-header btn-light border" style={{borderColor: '#dddddd', cursor: "pointer"}} onClick={()=>{
                        let newCollapse = this.state.collapseItems;
                        newCollapse[bigStavka.id] = !newCollapse[bigStavka.id];
                        this.setState({
                            collapseItems: newCollapse
                        })
                    }}>
                        {bigStavka.naziv}
                    </h6>
                    <Collapse isOpen={this.state.collapseItems[bigStavka.id]}>
                            <div className="card-body border p-0" style={{borderColor: '#aaa'}}>
                                {
                                    bigStavka.stavke.map((izvjestaj)=>{
                                        let { naziv, godinaId, predmetId } = izvjestaj;
                                        let putanja = `/Lima/izvjestaji/godina=${godinaId}&predmet=${predmetId}`;
                                        return <div className="card-body border p-0" key={`${izvjestaj.godinaId}${izvjestaj.predmetId}`}>
                                            <div className="d-flex align-items-center w-100 card-header py-1" style={{backgroundColor: "##ffb7b7"}}>
                                                <div className="mr-auto">{naziv}</div>
                                                <Link to={putanja+"&tabelarno=false"}><div className="btn btn-primary mr-2">Grafički prikaz</div></Link>
                                                <Link to={putanja+"&tabelarno=true"}><div className="btn btn-primary">Tabelarni prikaz</div></Link>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                    </Collapse>
                </Fragment>
            )
        });
    }
    render(){
        return (
            <div className="pb-2">
                <div className="d-flex card-header border align-items-center" style={{borderColor: '#f8f9fa'}}>
                    <h4 className="m-0" style={{color: '#18bc9c'}}>Vaši predmeti</h4>
                    <div className="ml-auto" style={{width:'120px'}}>
                        <label className="m-0">Grupiši po:</label>
                        <select className="ml-auto form-control" value={this.state.groupBy} onChange={(e)=>{this.groupStavke(e.target.value)}}>
                            <option value={"predmet"}>Predmet</option>
                            <option value={"godina"}>Godina</option>
                        </select>
                    </div>
                </div>
                {
                    this.state.predmetiGodine ?
                    this.renderIzvjestajiLinks():
                    <div className="card-body border px-2 d-flex justify-content-center">
                        <Spinner />
                    </div>
                }
            </div>
        )
    }
}


export default IzvjestajiProfesora;