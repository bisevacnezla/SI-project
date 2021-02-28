import React from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Potvrda from "./Potvrda";
import { withRouter } from "react-router-dom";
import jQuery from "jquery"
class ModalComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            studentID: (window.localStorage.getItem("id") != null && window.localStorage.getItem("username") != null) ? window.localStorage.getItem("id") : 2,
            username: window.localStorage.getItem("username") != null ? window.localStorage.getItem("username") : "stest1",
            token: window.localStorage.getItem("token"),
            greska: null,
            brojac: 0,
            OK: false,
            msg: "",
            noviInput: {
                adresa: null,
                email: null,
                brtel: null
            },
            greskaVisible: "hidden"
        }
    }
    handleClose = () => {
        this.props.saveState("modalShow", false);
    }
    //promjena podataka bez refreshanja
    handleChange = (e) => {

        const { name, value } = e.target;
        let state = JSON.parse(JSON.stringify(this.state.noviInput));
        state[name] = value;
        this.setState({
            noviInput: state
        });
    }
    handleExit = () => {

        const { adr, mail, telefon } = this.state.noviInput;
        let podaci = JSON.parse(JSON.stringify(this.props.podaciKontakt));
        podaci.adresa = adr ? adr : podaci.adresa;
        podaci.brtel = telefon ? telefon : podaci.brtel;
        podaci.email = mail ? mail : podaci.email;
        this.setState({
            greska: null
        }, () => {
            this.props.saveState("podaciKontakt", podaci);
        })
    }
    handlePutEvent = (event) => {
        event.preventDefault();
        if (this.state.noviInput.adresa == null && this.state.noviInput.email == null && this.state.noviInput.brtel == null) {
            this.setState({ greska: true });
        }
        else {
            if (this.state.noviInput.adresa) {
                axios
                    .put(
                        `https://si2019siera.herokuapp.com/studenti/update/adresa/` +
                        this.state.studentID,
                        {
                            adresa: this.state.noviInput.adresa
                        }
                    )
                    .then(res => {
                        if (res.data.success && res.data.userAutorizacija) {
                            this.setState({
                                greska: false,
                                OK: true,
                                msg: ""
                            });
                        }
                        else if (!res.data.userAutorizacija) {
                            //nema privilegiju
                            this.setState({
                                msg: "Nemate privilegiju da pristupite ovoj stranici.",
                                OK: false
                            })
                        }
                        else {
                            //kod nas greska
                            this.setState({
                                msg: "Došlo je do greške!",
                                OK: false
                            })
                        }

                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
            if (this.state.noviInput.email) {
                axios
                    .put(
                        `https://si2019siera.herokuapp.com/studenti/update/mail/` +
                        this.state.studentID,
                        {
                            mail: this.state.noviInput.email
                        }
                    )
                    .then(res => {
                        if (res.data.success && res.data.userAutorizacija) {
                            this.setState({
                                greska: false,
                                OK: true,
                                msg: ""
                            });
                        }
                        else if (!res.data.userAutorizacija) {
                            //nema privilegiju
                            this.setState({
                                msg: "Nemate privilegiju da pristupite ovoj stranici.",
                                OK: false
                            })
                        }
                        else {
                            //kod nas greska
                            this.setState({
                                msg: "Došlo je do greške!",
                                OK: false
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
            if (this.state.noviInput.brtel) {
                axios
                    .put(
                        `https://si2019siera.herokuapp.com/studenti/update/tel/` +
                        this.state.studentID,
                        {
                            tel: this.state.noviInput.brtel
                        }
                    )
                    .then(res => {
                        if (res.data.success && res.data.userAutorizacija) {
                            this.setState({
                                greska: false,
                                OK: true,
                                msg: ""
                            });
                        }
                        else if (!res.data.userAutorizacija) {
                            //nema privilegiju
                            this.setState({
                                msg: "Nemate privilegiju da pristupite ovoj stranici.",
                                OK: false
                            })
                        }
                        else {
                            //kod nas greska
                            this.setState({
                                msg: "Došlo je do greške!",
                                OK: false
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        }

    }
    handleAuth = (event) => {
        if (window.localStorage.getItem("id") != null) {
            axios({
                url: 'https://si2019romeo.herokuapp.com/users/validate',
                type: 'get',
                dataType: 'json',
                data: jQuery.param({
                  username: window.localStorage.getItem("username")
                }),
                beforeSend: function (xhr) {
                  xhr.setRequestHeader("Authorization", window.localStorage.getItem("token"));
                },
               
            })
            
            .then(res => {
                this.handlePutEvent(event);
            })
            .catch(res=>{
                this.props.history.push("/Romeo");
              })
        }
        else this.handlePutEvent(event)
    }

    renderujPotvrdu() {
        if (this.state.greska == false) {
            return (
                <Potvrda
                    key={this.brojac}
                    successful="true"
                    msg="Zahtjev je uspjesno poslan"
                />
            );
        } else if (this.state.greska == true) {
            return (
                <Potvrda
                    key={this.brojac}
                    successful="false"
                    msg="Polje ne smije biti prazno"
                />
            );
        }
        return null;
    }


    render() {
        ++this.brojac;
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={this.handleExit}
            >
                {this.renderujPotvrdu()}
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {this.props.naslovModala}
                    </Modal.Title>
                </Modal.Header>
                <form onSubmit={this.handleAuth}>
                    <Modal.Body>
                        <h4>{this.props.nazivPromjene}</h4>
                        <div className="form-group">

                            <br></br>
                            <label className="col-form-label" for="inputDefault" >Telefon</label>
                            <input type="text" className="form-control" name="brtel" onChange={this.handleChange} />

                            <label className="col-form-label" for="inputDefault" >Adresa</label>
                            <input type="text" className="form-control" name="adresa" onChange={this.handleChange} />

                            <label className="col-form-label" for="inputDefault">Email</label>
                            <input type="text" className="form-control" name="email" onChange={this.handleChange} />
                            {this.state.OK ? "" : <div className= "invalid-feedback" style={{ marginTop: "10px" }}>{this.state.msg}</div>}

                        </div>
                    </Modal.Body>
                    <Modal.Footer>

                        <button type="submit" id="spasiBtn" className="btn btn-primary">Spasi Promjene</button>
                        <button type="button" className="btn btn-secondary" onClick={this.handleClose}>Odustani</button>
                    </Modal.Footer>
                </form>
            </Modal>
        );
    }
}
export default withRouter(ModalComponent);

//
/*
PROPS: modalBody, onHide (funkcija), modalTitle, nazivPromjene, noviInput (json)
*/