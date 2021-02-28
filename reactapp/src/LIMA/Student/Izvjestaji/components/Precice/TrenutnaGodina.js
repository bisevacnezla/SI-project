import React, { Component, Fragment } from 'react';
import { Icon } from '@opuscapita/react-icons';
import { Spinner, Collapse } from 'reactstrap';
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";

import { predmeti, godine } from '../../api.js';

class TrenutnaGodina extends Component {
    constructor(props){
        super(props)
        this.state = {
            polozeni: null,
            nepolozeni: null,
            collapsePolozeni: false,
            collapseNepolozeni: false
        }
    }
    toggleCreateModal(){
        this.setState({
            createModal: !this.state.createModal
        })
    }
    componentDidMount(){
        let studentId = window.localStorage.getItem("id");
        godine.getTrenutnaGodina().then((godina)=>{
            predmeti.getPredmetiStudenta(studentId).then((data)=>{
                let { polozeni , nepolozeni } = data;
                this.setState({
                    polozeni: polozeni.map((predmet)=>{ return { naziv: predmet.naziv, predmetId: predmet.id, godinaId: godina.id }}),
                    nepolozeni: nepolozeni.map((predmet)=>{ return { naziv: predmet.naziv, predmetId: predmet.id, godinaId: godina.id }})
                })
            })
        }).catch(err => {
            toast.error("Greska!");
        });
    }
    renderIzvjestajiLinks(){
        let { polozeni, nepolozeni } = this.state;
        if(polozeni.length + nepolozeni.length == 0)return <div className="card-body border px-2 d-flex justify-content-center">Nemate predmeta.</div>
        return (
            <Fragment>
                <h6 className="card-header btn-light border" style={{borderColor: '#dddddd', cursor: 'pointer'}} onClick={()=>{
                        this.setState({collapsePolozeni: !this.state.collapsePolozeni})
                    }}>
                    {"Polozeni predmeti"}
                </h6>
                <Collapse isOpen={this.state.collapsePolozeni}>
                        <div className="card-body border p-0" style={{borderColor: '#aaa'}}>
                            {
                                polozeni.map((izvjestaj)=>{
                                    let { naziv, godinaId, predmetId } = izvjestaj;
                                    let putanja = `/Lima/izvjestaji/godina=${godinaId}&predmet=${predmetId}`;
                                    return <div className="card-body border p-0" key={`${izvjestaj.godinaId}${izvjestaj.predmetId}`}>
                                        <div className="d-flex align-items-center w-100 LIMA-btn-green card-header py-0" style={{backgroundColor: "##ffb7b7"}}>
                                            <Link to={putanja} className="d-flex align-items-center w-100" style={{minHeight: 50, color: 'black'}}>{naziv}</Link>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                </Collapse>
                <h6 className="card-header btn-light border" style={{borderColor: '#dddddd', cursor: 'pointer'}} onClick={()=>{
                        this.setState({collapseNepolozeni: !this.state.collapseNepolozeni})
                    }}>
                    {"Nepolozeni predmeti"}
                </h6>
                <Collapse isOpen={this.state.collapseNepolozeni}>
                        <div className="card-body border p-0" style={{borderColor: '#aaa'}}>
                            {
                                nepolozeni.map((izvjestaj)=>{
                                    let { naziv, godinaId, predmetId } = izvjestaj;
                                    let putanja = `/Lima/izvjestaji/godina=${godinaId}&predmet=${predmetId}`;
                                    return <div className="card-body border p-0" key={`${izvjestaj.godinaId}${izvjestaj.predmetId}`}>
                                        <div className="d-flex align-items-center w-100 LIMA-btn-red card-header py-0">
                                            <Link to={putanja} className="d-flex align-items-center w-100" style={{minHeight: 50, color: 'black'}}>{naziv}</Link>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                </Collapse>
            </Fragment>
        );
    }
    render(){
        return (
            <div className="pb-2">
                <h4 className="d-flex card-header border" style={{borderColor: '#f8f9fa', color: '#18bc9c'}}>
                    Predmeti ove godine
                </h4>
                {
                    this.state.polozeni ?
                    this.renderIzvjestajiLinks() :
                    <div className="card-body border px-2 d-flex justify-content-center">
                        <Spinner />
                    </div>
                }
            </div>
        )
    }
}


export default TrenutnaGodina;