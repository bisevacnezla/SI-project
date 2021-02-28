import React from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Potvrda from "./Potvrda";
class ModalUredi extends React.Component {
    constructor(props) {
        super(props);
        const {
            idIspit
          } = props;
        this.state = {
            korisnikID: 1,
            greska: 0,
            brojac: 0,
            rokPrijave: new Date(),
            termin: new Date(),
            sale: [],
            vrijemeTrajanja: 0,
            kapacitet: 0,
            napomena: "",
            idIspit: idIspit || 0
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
   
    handleRokPrijaveChange = e => {
        this.setState({
          rokPrijave: e.target
        });
      };
    
      handleTerminChange = e => {
        this.setState({
          termin: e.target
        });
      };
    
      handleSalaChange = e => {
        this.setState({
          sale: e.target
        });
      };
    
      onVrijemeTrajanjaChange = e => {
        this.setState({
          vrijemeTrajanja: e.target
        });
      };
    
      onKapacitetChange = e => {
        this.setState({
          kapacitet: e.target
        });
      };
    
      onNapomenaChange = e => {
        this.setState({
          napomena: e.target
        });
      };

    renderujPotvrdu() {
        if (!this.state.greska) {
            return (
                <Potvrda
                    key={this.brojac}
                    successful="true"
                    msg="Uspješno ste modifikovali informacije o ispitu!"
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
        //ovjde saljete post/put zahtjeve
        //ukoliko neki rezultira greskom, postavite greska na true
       
    }
    onConfirm = e => {
        this.props.onConfirm && this.props.onConfirm(e);
      };

    handleClose = () => {
        this.props.saveState("modalUredi", false);
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
                    
                        <button type="submit" id="potvrdiDugmeCharlie2" onClick={this.onConfirm} class="btn btn-primary">Potvrdi</button>
                        <button type="button" class="btn btn-secondary" onClick={this.handleClose}>Zatvori</button>

                    </Modal.Footer>
                </form>
            </Modal>
        );
    }
}
export default ModalUredi;
