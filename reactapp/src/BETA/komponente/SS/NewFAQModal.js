import React from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Potvrda from "../helpers/Potvrda.js";
import {standardHeaders} from '../helpers/getStandardHeaders';

class ModalComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            greska: null,
            brojac: 0,
            noviInput: {
                naziv: null,
                tekst: null,
                issues: []
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange = (event) => {
        const { name, value } = event.target;
        let state = JSON.parse(JSON.stringify(this.state.noviInput));
        state[name] = value;
        this.setState({
            noviInput: state
        });
        //timeout?
    }
    handleClose = () => {
        this.props.saveState("modalShow", false);
    }
    handleExit = () => {
        const { nazivNovi, tekstNovi } = this.state.noviInput;
        let podaci = JSON.parse(JSON.stringify(this.props.noviFAQ));
        console.log("novi naziv: " + nazivNovi);
        console.log("novi tekst: " + tekstNovi);
        //setState od handlechange jos uvijek nije updateovao noviInput. 
        //treba neki workaround :(

        podaci.naziv = nazivNovi;
        podaci.tekst = tekstNovi;
        podaci.issues.push({
            naziv: podaci.naziv,
            tekst: podaci.tekst
        })
        this.props.saveState("noviFAQ", podaci);
    }
    handleSubmit(event) {
        event.preventDefault();
        //ukoliko neki rezultira greskom, postavite greska na true
        if (this.state.noviInput.naziv != null && this.state.noviInput.tekst != null) {
            const { naziv, tekst } = this.state.noviInput;
            axios.post('https://si2019beta.herokuapp.com/frequentIssue/add', null, { ...standardHeaders(), params: { naziv, tekst } })
                .then(result => {
                    if (result.data === "Uspjesan upis!") { this.setState({ greska: false }); }
                    console.log("result.data: " + result.data);

                })
                .catch(err => {
                    console.log(err);
                    this.setState({ greska: true });
                });
        }

    }



    renderujPotvrdu() {
        if (this.state.greska == false) {
            return (
                <Potvrda
                    key={this.brojac}
                    successful="true"
                    msg="Uspjesno ste objavili rjesenje upita"
                />
            );
        }
        else if (this.state.greska) {
            return (
                <Potvrda
                    key={this.brojac}
                    successful="false"
                    msg="Vaš objava nije uspjela! Pokusajte ponovo!"
                />
            );
        }
        return null;
    }

    render() {
        if (!this.props.show) {
            return null;
        }
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={this.handleExit}
            > {this.renderujPotvrdu()}

                <Modal.Header closeButton>

                    <Modal.Title id="contained-modal-title-vcenter">
                        {this.props.naslovModala}
                    </Modal.Title>

                </Modal.Header>

                <form onSubmit={this.handleSubmit}>
                    <Modal.Body>

                        <div className="form-group">
                            <>
                                <label className="col-form-label" for="inputDefault" >Upit:</label>
                                <input type="text"
                                    className="form-control"
                                    name="naziv"
                                    onChange={this.handleChange}
                                    placeholder="Naslov upita"
                                />
                                <label className="col-form-label" for="inputDefault" >Odgovor:</label>
                                <textarea
                                    className="form-control"
                                    name="tekst"
                                    onChange={this.handleChange}
                                    rows="10"
                                    placeholder="Odgovor na upit"></textarea>

                            </>
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <button type="submit"
                            id="spasiBtn"
                            class="btn btn-primary"
                            disabled={this.state.noviInput.tekst == null || this.state.noviInput.naziv == null}
                        >{this.props.btnPotvrdi}
                        </button>

                    </Modal.Footer>
                </form>
            </Modal>
        );
    }
}
export default ModalComponent;
