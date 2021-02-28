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
            greskaFoto: null,
            OK: false,
            msg: "",
            brojac: 0,
            novaSlikaPrikaz: null,
            noviInput: {
                ime: null,
                prezime: null,
                drzavljanstvo: null,
                foto: null
            },
        }
        this.handlePutEvent = this.handlePutEvent.bind(this);
    }

    handleClose = () => {
        this.props.saveState("modalShow", false);
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        let state = JSON.parse(JSON.stringify(this.state.noviInput));

        if (name == "foto") {
            state["foto"] = e.target.files[0];
        }
        else state[name] = value;
        this.setState({
            noviInput: state
        });
    }
    handleExit = () => {
        const { ime, prezime, drzavljanstvo, foto } = this.state.noviInput;
        let podaci = JSON.parse(JSON.stringify(this.props.podaciKorisnika));
        podaci.ime = ime ? ime : podaci.ime;
        podaci.prezime = prezime ? prezime : podaci.prezime;
        podaci.Drzavljanstvo = drzavljanstvo ? drzavljanstvo : podaci.Drzavljanstvo;
        podaci.fotka = this.state.novaSlikaPrikaz == null ? podaci.fotka : this.state.novaSlikaPrikaz;

        this.setState({
            greska: null,
            greskaFoto: null
        }, () => {
            this.props.saveState("podaciKorisnika", podaci);
        })
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

    handlePutEvent(event) {
        event.preventDefault();
        if (this.state.noviInput.ime == null && this.state.noviInput.drzavljanstvo == null && this.state.noviInput.foto == null) {
            this.setState({ greska: true });
        }
        else {
            if (this.state.noviInput.ime != null && this.state.noviInput.prezime != null) {
                axios
                    .put(
                        `https://si2019siera.herokuapp.com/studenti/update/imeprezime/` +
                        this.state.studentID,
                        {
                            ime: this.state.noviInput.ime,
                            prezime: this.state.noviInput.prezime
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
            if (this.state.noviInput.drzavljanstvo) {
                axios
                    .put(
                        `https://si2019siera.herokuapp.com/studenti/update/drzavljanstvo/` +
                        this.state.studentID,
                        {
                            drzavljanstvo: this.state.noviInput.drzavljanstvo
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
                    });;
            }
            if (this.state.noviInput.foto != null) {
                var tmp = this.state.noviInput.foto;
                const formData = new FormData();
                formData.append('foto', tmp);
                const config = {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                };
                axios
                    .put(
                        `https://si2019siera.herokuapp.com/studenti/update/foto/` + this.state.studentID, formData, config)
                    .then(res => {
                        if (res.data.success && res.data.userAutorizacija) {
                            this.setState({
                                greska: false,
                                greskaFoto: false,
                                novaSlikaPrikaz: "data:image/png;base64," + res.data.fotografija,
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
                        this.setState({ greskaFoto: true });
                    });
            }

        }

    }
    renderujPotvrdu() {
        if (this.state.greska == false) {
            return (
                <Potvrda
                    key={this.brojac}
                    successful="true"
                    msg="Zahtjev je uspješno poslan."
                />
            );
        }
        if (this.state.greska) {
            return (
                <Potvrda
                    key={this.brojac}
                    successful="false"
                    msg="Polje ne smije biti prazno."
                />
            );
        }
        if (this.state.greskaFoto) {
            return (
                <Potvrda
                    key={this.brojac}
                    successful="false"
                    msg="Greška prilikom procesiranja slike."
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

                            <label className="col-form-label" for="inputDefault" >Nova fotografija</label>
                            <br></br>
                            <input type="file" className="form-control-file" name="foto" aria-describedby="fileHelp"
                                onChange={this.handleChange}
                            />
                            <br></br>
                            <label className="col-form-label" for="inputDefault" >Ime</label>
                            <input type="text" className="form-control" name="ime"
                                onChange={this.handleChange}
                            />
                            <label className="col-form-label" for="inputDefault" >Prezime</label>
                            <input type="text" className="form-control" name="prezime"
                                onChange={this.handleChange}
                            />

                            <label className="col-form-label" for="inputDefault">Državljanstvo</label>
                            <input type="text" className="form-control" name="drzavljanstvo"
                                onChange={this.handleChange}
                            />
                            {this.state.OK ? "" : <div className= "invalid-feedback" style={{ marginTop: "10px" }}>{this.state.msg}</div>}
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <button type="submit" id="spasiBtn" className="btn btn-primary">{this.props.btnPotvrdi}</button>
                        <button type="button" className="btn btn-secondary" onClick={this.handleClose}>Zatvori</button>
                    </Modal.Footer>
                </form>
            </Modal>
        );
    }
}
export default withRouter(ModalComponent);
