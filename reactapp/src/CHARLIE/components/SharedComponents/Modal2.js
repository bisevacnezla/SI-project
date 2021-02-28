import React from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Potvrda from "./Potvrda";
class Modal2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            korisnikID: 1,
            // greska: 0,
            brojac: 0,
            greska:undefined
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
   
    renderujPotvrdu() {
        if(this.state.greska === undefined) return ""
        else if (!this.state.greska) {
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
    }
    handleSubmit(event) {
        event.preventDefault();
        // this.props.handleSubmit();
        //ovjde saljete post/put zahtjeve
        //ukoliko neki rezultira greskom, postavite greska na true
       
    }
    onConfirm = e => {
        if (this.props.onConfirm) 
            this.setState({greska:this.props.onConfirm(e)});
      };

    handleClose = () => {
        this.props.saveState("modalShow", false);
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
                {this.renderujPotvrdu()}
                <Modal.Header>
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
                    
                        <button type="submit" id="potvrdiBtnCharlie" onClick={this.onConfirm} class="btn btn-primary">{this.props.potvrdiBtnCharlie}</button>
                        <button type="button" class="btn btn-secondary" onClick={this.handleClose}>Zatvori</button>

                    </Modal.Footer>
                </form>
            </Modal>
        );
    }
}
export default Modal2;
