import React from 'react';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody, Input } from 'reactstrap';
import { toast } from 'react-toastify';

import { predmeti, godine } from '../../api.js';

class DodajIzvjestajModal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            izvjestaj: {
                naziv: "Predmet",
                predmetId: 0,
                godinaId: 0
            },
            godine: [],
            predmeti: []
        };
    }
    componentDidMount(){
        predmeti.get().then((predmeti)=>{
            let predmetId = 0;
            if(predmeti.length > 0)predmetId = predmeti[0].id;
            this.setState({
                predmeti: predmeti,
                izvjestaj: {...this.state.izvjestaj, predmetId: predmetId}
            })
        }).catch(err => {
            toast.error("Greska!");
        });
        godine.get().then((godine)=>{
            let godinaId = 0;
            if(godine.length > 0)godinaId = godine[0].id;
            this.setState({
                godine: godine,
                izvjestaj: {...this.state.izvjestaj, godinaId: godinaId}
            })
        }).catch(err => {
            toast.error("Greska!");
        });
    }
    nazivIzvjestajaChange(nazivIzvjestaja){
        this.setState({
            izvjestaj: {...this.state.izvjestaj, naziv: nazivIzvjestaja}
        });
    }
    godinaIzvjestajaChange(godinaIzvjestaja){
        this.setState({
            izvjestaj: {...this.state.izvjestaj, godinaId: godinaIzvjestaja}
        });
    }
    predmetIzvjestajaChange(predmetIzvjestaja){
        this.setState({
            izvjestaj: {...this.state.izvjestaj, predmetId: predmetIzvjestaja}
        });
    }
    render() {
        return (
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} className={this.props.className}>
                <ModalHeader toggle={this.props.toggle}>Dodavanje izvjestaja</ModalHeader>
                <ModalBody>
                    <div className="row d-flex align-items-center mb-2">
                        <label className="col-4">Naziv izvjestaja:</label>
                        <Input className="form-control col-6 mr-2" type="text" value={this.state.izvjestaj.naziv} onChange={(e)=>{this.nazivIzvjestajaChange(e.target.value)}} />
                    </div>
                    <div className="row d-flex align-items-center mb-2">
                        <label className="col-4">Predmet:</label>
                        <select className="form-control col-6 mr-2" value={this.state.izvjestaj.predmetId} onChange={(e)=>{this.predmetIzvjestajaChange(e.target.value)}}>
                            {this.state.predmeti.map((predmet)=>{
                                return <option value={predmet.id} key={predmet.id}>{predmet.naziv}</option>
                            })}
                        </select>
                    </div>
                    <div className="row d-flex align-items-center mb-2">
                        <label className="col-4">Godina:</label>
                        <select className="form-control col-6 mr-2" value={this.state.izvjestaj.godinaId} onChange={(e)=>{this.godinaIzvjestajaChange(e.target.value)}}>
                            {this.state.godine.map((godina)=>{
                                return <option value={godina.id} key={godina.id}>{godina.naziv}</option>
                            })}
                        </select>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={()=>{
                            this.props.addIzvjestaj(this.state.izvjestaj);
                            this.props.toggle();
                        }}>Da</Button>{' '}
                    <Button color="secondary" onClick={()=>{
                            this.props.toggle();
                        }}>Ne</Button>
                </ModalFooter>
            </Modal>
        );
    }
}
export default DodajIzvjestajModal;