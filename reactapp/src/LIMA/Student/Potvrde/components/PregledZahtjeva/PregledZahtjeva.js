import React, { Component, Fragment } from 'react';
import { Spinner, Collapse } from 'reactstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { potvrde } from '../../api';
import CreatePotvrdaModal from '../Modali/CreatePotvrdaModal';

class PregledZahtjeva extends Component {
    constructor(props){
        super(props);
        this.state = {
            obradjeniZahtjevi: null,
            neobradjeniZahtjevi: null,
            collapseObradjeni: true,
            collapseNeobradjeni: true,
            modalOpen: false,
            brojPreostalihBesplatnih: 5,
            svrhe: []
        }
    }
    componentDidMount(){
        let studentId = window.localStorage.getItem("id");
        potvrde.getPotvrdeStudent(studentId).then((data)=>{
            let obradjeniZahtjevi = [];
            let neobradjeniZahtjevi = [];
            data.map((zahtjev)=>{
                if(zahtjev.obradjen == true)obradjeniZahtjevi.push(zahtjev); else neobradjeniZahtjevi.push(zahtjev);
            })
            let brojPreostalihBesplatnih = 0;
            if(data.length < 5)brojPreostalihBesplatnih = 5 - data.length;
            this.setState({
                obradjeniZahtjevi: obradjeniZahtjevi,
                neobradjeniZahtjevi: neobradjeniZahtjevi,
                brojPreostalihBesplatnih: brojPreostalihBesplatnih
            })
        }).catch(err => {
            toast.error("Greska!");
        });
        potvrde.getSvrhe().then((data)=>{
            this.setState({
                svrhe: data
            })
        }).catch(err => {
            toast.error("Greska!");
        });
    }
    otkaziZahtjev(zahtjevId){
        potvrde.otkaziZahtjev(zahtjevId).then((res)=>{
            let neobradjeniZahtjevi = [];
            for(let i=0;i<this.state.neobradjeniZahtjevi.length;i++){
                if(this.state.neobradjeniZahtjevi[i].id != zahtjevId){
                    neobradjeniZahtjevi.push(this.state.neobradjeniZahtjevi[i]);
                }
            }
            toast.success("Uspješno otkazano.")
            this.setState({
                neobradjeniZahtjevi: neobradjeniZahtjevi
            })
        }).catch(error => {
            toast.error("Desila se greška.")
        })
    }
    kreirajZahtjev(svrhaId){
        let studentId = window.localStorage.getItem("id");
        potvrde.kreirajZahtjev(svrhaId, studentId).then((res)=>{
            let datumZahtjeva = res.datumZahtjeva;
            let svrhaId = res.idSvrhe;
            datumZahtjeva = datumZahtjeva.substring(0, 10);
            for(let i=0;i<this.state.svrhe.length;i++){
                if(this.state.svrhe[i].id == svrhaId)res.vrsta = this.state.svrhe[i].nazivSvrhe;
            }
            res.datumZahtjeva = datumZahtjeva;
            let neobradjeniZahtjevi = [...this.state.neobradjeniZahtjevi];
            neobradjeniZahtjevi.push(res);
            toast.success("Kreiranje zahtjeva uspjelo.");
            this.setState({
                neobradjeniZahtjevi: neobradjeniZahtjevi
            })
        }).catch((err)=>{
            toast.error("Kreiranje nije uspjelo.");
        })
    }
    renderObradjeni(){
        return (
            <Fragment>
                <h4 className="d-flex card-header border" style={{borderColor: '#f8f9fa', color: '#18bc9c'}} >
                    Obrađeni zahtjevi
                </h4>
                <Collapse isOpen={this.state.collapseObradjeni}>
                {
                    this.state.obradjeniZahtjevi ?
                        <div className="card-body border p-0" style={{borderColor: '#aaa'}}>
                            <table className="table table-bordered">
                                <thead className="thead-dark">
                                    <tr>
                                        <th key="datumZahtjeva">Datum zahtjeva</th>
                                        <th key="datumObrade">Datum obrade</th>
                                        <th key="vrsta">Vrsta</th>
                                        <th key="akcije">Akcije</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.obradjeniZahtjevi.map((zahtjev)=>{
                                        let putanja = `/LIMA/potvrde/id/${zahtjev.id}`;
                                        return (
                                            <tr className="card-body border p-0" key={zahtjev.id}>
                                                <td>{zahtjev.datumZahtjeva}</td>
                                                <td>{zahtjev.datumObrade}</td>
                                                <td>{zahtjev.vrsta}</td>
                                                <td className="d-flex justify-content-around">
                                                    <Link to={putanja}><div className="btn btn-primary">Pregled</div></Link>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                     : 
                    <div className="card-body border px-2 d-flex justify-content-center">
                        <Spinner />
                    </div>
                }
                </Collapse>
            </Fragment>
        )
    }
    renderNeobradjeni(){
        return (
            <Fragment>
                <h4 className="d-flex card-header border" style={{borderColor: '#f8f9fa', color: '#18bc9c'}} >
                    <div>Neobrađeni zahtjevi</div>
                    <div className="ml-auto btn btn-primary" onClick={()=>{this.setState({
                        modalOpen: !this.state.modalOpen
                    })}}>Kreiraj</div>
                </h4>
                <Collapse isOpen={this.state.collapseNeobradjeni}>
                    {
                    this.state.neobradjeniZahtjevi ?
                        <div className="card-body border p-0" style={{borderColor: '#aaa'}}>
                            <table className="table table-bordered">
                                <thead className="thead-dark">
                                    <tr>
                                        <th key="datumZahtjeva">Datum zahtjeva</th>
                                        <th key="vrsta">Vrsta</th>
                                        <th key="akcije">Akcije</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.neobradjeniZahtjevi.map((zahtjev)=>{
                                        let putanja = `/LIMA/potvrde/id/${zahtjev.id}`;
                                        return (
                                            <tr className="card-body border p-0" key={zahtjev.id}>
                                                <td>{zahtjev.datumZahtjeva}</td>
                                                <td>{zahtjev.vrsta}</td>
                                                <td className="d-flex justify-content-around">
                                                    <Link to={putanja}><div className="btn btn-primary">Pregled</div></Link>
                                                    <div className="btn btn-primary" onClick={()=>{
                                                        this.otkaziZahtjev(zahtjev.id);
                                                    }}>Otkazi</div>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                     : 
                    <div className="card-body border px-2 d-flex justify-content-center">
                        <Spinner />
                    </div> }
                    </Collapse>
            </Fragment>
        )
    }
    render(){
        return (
            <Fragment>
                <CreatePotvrdaModal 
                    isOpen={this.state.modalOpen} 
                    toggle={()=>{this.setState({modalOpen: !this.state.modalOpen})}} 
                    confirm={(svrhaId)=>this.kreirajZahtjev(svrhaId)}
                    brojPreostalihBesplatnih={this.state.brojPreostalihBesplatnih}
                    svrhe={this.state.svrhe}
                />
                {this.renderObradjeni()}
                {this.renderNeobradjeni()}
            </Fragment>
        )
    }
}

export default PregledZahtjeva;