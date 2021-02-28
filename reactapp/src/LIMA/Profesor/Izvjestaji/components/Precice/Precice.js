import React, { Component, Fragment } from 'react';
import { Icon } from '@opuscapita/react-icons';
import { Spinner } from 'reactstrap';
import { toast } from 'react-toastify';

import Precica from './Precica.js';
import { sacuvaniIzvjestaji } from '../../api.js';
import DodajIzvjestajModal from '../Modali/DodajIzvjestajModal.js';

class Precice extends Component {
    constructor(props){
        super(props)
        this.state = {
            createModal: false,
            izvjestaji: null
        }
    }
    toggleCreateModal(){
        this.setState({
            createModal: !this.state.createModal
        })
    }
    componentDidMount(){
        sacuvaniIzvjestaji.get().then((izvjestaji)=>{
            this.setState({
                izvjestaji: izvjestaji
            })
        })
    }
    deleteIzvjestajLink(izvjestaj){
        sacuvaniIzvjestaji.delete(1, izvjestaj).then((res)=>{
            let izvjestaji = [...this.state.izvjestaji];
            let index = izvjestaji.indexOf(izvjestaj);
            if (index > -1) {
                izvjestaji.splice(index, 1);
            }
            this.setState({
                izvjestaji: izvjestaji
            }, ()=>{
                toast.success("Usjesno obrisana precica.")
            });
        }).catch((res)=>{
            toast.error(`Brisanje precice nije uspjelo. ${res.message}`)
        })
    }
    addIzvjestajLink(izvjestaj){
        sacuvaniIzvjestaji.put(1, izvjestaj).then((res)=>{
            let izvjestaji = [...this.state.izvjestaji];
            izvjestaji.push(izvjestaj);
            this.setState({
                izvjestaji: izvjestaji
            }, ()=>{
                toast.success("Usjesno kreirana precica.")
            });
        }).catch((res)=>{
            toast.error(`Kreiranje precice nije uspjelo. ${res.message}`)
        })
    }
    renderIzvjestajiLinks(){
        if(this.state.izvjestaji.length == 0)return <div className="card-body border px-2 d-flex justify-content-center">Nemate sacuvanih izvjestaja.</div>
        return this.state.izvjestaji.map((izvjestaj)=>{
            return <div className="card-body border p-0" key={`${izvjestaj.godinaId}${izvjestaj.predmetId}`}>
                <Precica izvjestaj={izvjestaj} deleteIzvjestaj={(izvjestaj)=>{this.deleteIzvjestajLink(izvjestaj)}}/>
            </div>
        })
    }
    render(){
        return (
            <Fragment>
                <DodajIzvjestajModal toggle={()=>{this.toggleCreateModal()}} isOpen={this.state.createModal} addIzvjestaj={(izvjestaj)=>{this.addIzvjestajLink(izvjestaj)}}/>
                <h4 className="d-flex card-header border align-items-center" style={{borderColor: '#f8f9fa', color: '#18bc9c'}}>
                    <div className="w-100">Sacuvani izvjestaji</div>
                    <div onClick={()=>{this.toggleCreateModal()}} className="ml-auto btn btn-primary" style={{width: '100px'}} >   
                        Dodaj
                    </div>
                </h4>
                {
                    this.state.izvjestaji ?
                    this.renderIzvjestajiLinks() :
                    <div className="card-body border px-2 d-flex justify-content-center">
                        <Spinner />
                    </div>
                }
            </Fragment>
        )
    }
}


export default Precice;