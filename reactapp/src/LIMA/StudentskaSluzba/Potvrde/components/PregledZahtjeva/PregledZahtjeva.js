import React, { Component, Fragment } from 'react';
import { Spinner, Collapse } from 'reactstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { potvrde } from '../../../../Student/Potvrde/api';

class PregledZahtjeva extends Component {
    constructor(props){
        super(props);
        this.state = {
            obradjeniZahtjevi: null,
            neobradjeniZahtjevi: null,
            collapseObradjeni: false,
            collapseNeObradjeni: false
        }
    }
    componentDidMount(){
        let uposlenikId = window.localStorage.getItem("id");
        potvrde.getPotvrdeSluzba(uposlenikId).then((data)=>{
            let obradjeniZahtjevi = [];
            let neobradjeniZahtjevi = [];
            data.map((zahtjev)=>{
                if(zahtjev.obradjen == true)obradjeniZahtjevi.push(zahtjev); else neobradjeniZahtjevi.push(zahtjev);
            })
            this.setState({
                obradjeniZahtjevi: obradjeniZahtjevi,
                neobradjeniZahtjevi: neobradjeniZahtjevi
            })
        }).catch(err => {
            toast.error("Greska!");
        });
    }
    obradiZahtjev(zahtjevId){
        potvrde.obradiZahtjev(zahtjevId).then((res)=>{
            let datumObrade = res.datumObrade;
            let d = new Date(parseInt(datumObrade));
            datumObrade = `${d.getFullYear()}-${d.getMonth()}-${d.getDay()}`;
            let obradjeniZahtjevi = [...this.state.obradjeniZahtjevi];
            let neobradjeniZahtjevi = [];
            for(let i=0;i<this.state.neobradjeniZahtjevi.length;i++){
                if(this.state.neobradjeniZahtjevi[i].id != zahtjevId){
                    neobradjeniZahtjevi.push(this.state.neobradjeniZahtjevi[i]);
                } else {
                    let noviZahtjev = this.state.neobradjeniZahtjevi[i];
                    noviZahtjev.datumObrade = datumObrade;
                    obradjeniZahtjevi.push(noviZahtjev);
                }
            }
            toast.success("Uspješna obrada.")
            this.setState({
                obradjeniZahtjevi: obradjeniZahtjevi,
                neobradjeniZahtjevi: neobradjeniZahtjevi
            })
        }).catch(error => {
            toast.error("Desila se greška.")
        })
    }
    renderObradjeni(){
        return (
            <Fragment>
                <h4 className="d-flex card-header border" style={{borderColor: '#f8f9fa', color: '#18bc9c', cursor: 'pointer'}} onClick={()=>{
                    this.setState({collapseObradjeni: !this.state.collapseObradjeni})
                }} >
                    Obrađeni zahtjevi
                </h4>
                <Collapse isOpen={this.state.collapseObradjeni}>
                {
                    this.state.obradjeniZahtjevi ?
                        <div className="card-body border p-0" style={{borderColor: '#aaa'}}>
                            <table className="table table-bordered">
                                <thead className="thead-dark">
                                    <tr>
                                        <th key="imeiprezime">Ime i prezime</th>
                                        <th key="indeks">Indeks</th>
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
                                                <td>{`${zahtjev.info.ime} ${zahtjev.info.prezime}`}</td>
                                                <td>{zahtjev.info.indeks}</td>
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
                <h4 className="d-flex card-header border" style={{borderColor: '#f8f9fa', color: '#18bc9c', cursor: 'pointer'}} onClick={()=>{
                    this.setState({collapseNeobradjeni: !this.state.collapseNeobradjeni})
                }} >
                    Neobrađeni zahtjevi
                </h4>
                <Collapse isOpen={this.state.collapseNeobradjeni}>
                    {
                    this.state.neobradjeniZahtjevi ?
                        <div className="card-body border p-0" style={{borderColor: '#aaa'}}>
                            <table className="table table-bordered">
                                <thead className="thead-dark">
                                    <tr>
                                        <th key="imeiprezime">Ime i prezime</th>
                                        <th key="indeks">Indeks</th>
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
                                                <td>{`${zahtjev.info.ime} ${zahtjev.info.prezime}`}</td>
                                                <td>{zahtjev.info.indeks}</td>
                                                <td>{zahtjev.datumZahtjeva}</td>
                                                <td>{zahtjev.vrsta}</td>
                                                <td className="d-flex justify-content-around">
                                                    <Link to={putanja}><div className="btn btn-primary">Pregled</div></Link>
                                                    <div className="btn btn-primary" onClick={()=>{
                                                        this.obradiZahtjev(zahtjev.id);
                                                    }}>Obradi</div>
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
                {this.renderObradjeni()}
                {this.renderNeobradjeni()}
            </Fragment>
        )
    }
}

export default PregledZahtjeva;