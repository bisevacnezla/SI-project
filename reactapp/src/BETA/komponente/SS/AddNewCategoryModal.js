import React from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Potvrda from "../helpers/Potvrda.js";
import {standardHeaders} from '../helpers/getStandardHeaders';

class AddNewCategoryModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            greska: null,
            greskaVecPostoji: false,
            brojac: 0,
            naziv: '',

        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit(event) {

        event.preventDefault();
        const naziv = this.state.naziv;
        axios.post('https://si2019beta.herokuapp.com/category/add', { naziv }, standardHeaders())
            .then((result) => {
                if (result.data === "Successfully added category!") {
                    this.setState({ greska: false, greskaVecPostoji:false });
                }
                else if (result.data === "Category already exists!") {
                    this.setState({ greskaVecPostoji: true, greska:false });
                }
                else {
                    this.setState({ greska: true });
                }

            })
            .catch(err => {
                console.log(err);
                this.setState({ greska: true });
            });
    }





    renderujPotvrdu() {
        if (this.state.greskaVecPostoji) {
            return (
                <Potvrda
                    key={this.brojac}
                    successful="false"
                    msg="Kategorija već postoji!"
                />
            );
        }
        else {
            if (this.state.greska == false) {
                return (
                    <Potvrda
                        key={this.brojac}
                        successful="true"
                        msg="Uspješno ste dodali kategoriju"
                    />
                );
            }
            else if (this.state.greska) {
                return (
                    <Potvrda
                        key={this.brojac}
                        successful="false"
                        msg="Neuspješno dodavanje kategorije! Pokušajte ponovo."
                    />
                );
            }
            return null;
        }
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
                                <label className="col-form-label" for="inputDefault" >Ime kategorije: </label>
                                <input type="text"
                                    className="form-control"
                                    name="naziv"
                                    onChange={this.handleChange}
                                    placeholder="Nova kategorija"
                                />


                            </>
                        </div>

                    </Modal.Body>
                    <Modal.Footer>

                        <button type="submit"
                            id="spasiBtn"
                            class="btn btn-primary"
                            disabled={this.state.naziv == ""}
                        >{this.props.btnPotvrdi}
                        </button>

                    </Modal.Footer>
                </form>
            </Modal>
        );
    }
}
export default AddNewCategoryModal;
