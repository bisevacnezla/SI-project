import React from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Potvrda from "./Potvrda";
class Modal3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            korisnikID: 1,
            greska: 0,
            brojac: 0,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
   
  /*  renderujPotvrdu() {
        if (!this.state.greska) {
            return (
                <Potvrda
                    key={this.brojac}
                    successful="true"
                    msg="Zahtjev je uspješno poslan!"
                />
            );
        } else if (this.state.greska) {
            return (
                <Potvrda
                    key={this.brojac}
                    successful="false"
                    msg="Došlo je do greške! :("
                />
            );
        }
        return "";
    }*/
    handleSubmit(event) {
        event.preventDefault();
        //ovjde saljete post/put zahtjeve
        //ukoliko neki rezultira greskom, postavite greska na true
       
    }
    onConfirm = async e => {
        this.props.onConfirm && this.props.onConfirm(e);
    try {
        const idKorisnika = window.localStorage.getItem('id') || 1
      const {status} = await axios.post('http://si2019charlie.herokuapp.com/prijava/' + this.props.idIspit + '/' + idKorisnika)
      status===200 ? window.alert('Uspjesno prijavljen ispit') : window.alert('Greska pri prijavi na ispit')
      this.props.onChangeActiveId(3)
    } catch (error) {
      console.log(error)
    }
      };

    handleClose = () => {
        this.props.saveState("modalInfo", false);
}

    render() {
        ++this.brojac;
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
               
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {this.props.naslovModala}
                    </Modal.Title>
                </Modal.Header>
                <form onSubmit={this.handleSubmit}>
                    <Modal.Body>
                        <div class="form-group">
                            {this.props.tijeloModala}
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                    <button type="submit" id="potvrdiBtnCharlie" onClick={this.onConfirm} class="btn btn-primary">Prijavi se</button>
                        
                        <button type="button" class="btn btn-secondary" onClick={this.handleClose}>Nazad</button>

                    </Modal.Footer>
                </form>
            </Modal>
        );
    }
}
export default Modal3;
