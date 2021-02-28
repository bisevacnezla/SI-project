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
    onConfirm = e => {
        this.props.onConfirm && this.props.onConfirm(e);
      };

    handleClose = () => {
        this.props.saveState("isEmptyState", false);
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
                    
                        
                        <button type="button" class="btn btn-secondary" onClick={this.handleClose}>Nazad</button>

                    </Modal.Footer>
                </form>
            </Modal>
        );
    }
}
export default Modal3;
