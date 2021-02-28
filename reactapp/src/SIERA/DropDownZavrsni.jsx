import React from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { withRouter } from "react-router-dom"
import PrikaziStatus from "./PrikaziStatus";
import jQuery from "jquery"

class DropDownZavrsni extends React.Component {

    constructor() {
        super();
        this.state = {
            profesori: [],
            teme: [],
            studentId: (window.localStorage.getItem("id") != null && window.localStorage.getItem("username") != null) ? window.localStorage.getItem("id") : 2,
            username: window.localStorage.getItem("username") != null ? window.localStorage.getItem("username") : "stest1",
            token: window.localStorage.getItem("token"),
            profId: 1,
            temaId: null,
            otvori: false,
            selProf: null,
            selTema: null,
            greskaVisible: "hidden",
            succVisible: "hidden",
            selectClass: "custom-select",
            OK: null,
            msg: ""
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleChangeProf = this.handleChangeProf.bind(this);
        this.otvori = this.otvori.bind(this);
        this.handlePost = this.handlePost.bind(this);
        this.validateTema = this.validateTema.bind(this);
    }
    otvori() {
        try {
            let trenutniProf = this.state.profesori.find(x => x.id == this.state.profId);

            let trenutnaTema = this.state.teme.find(x => x.id == this.state.temaId);

            this.setState({
                otvori: true,
                selProf: trenutniProf.ime + " " + trenutniProf.prezime,
                selTema: trenutnaTema.naziv
            });
        }
        catch (err) {
            this.setState({
                otvori: false
            });

        }

    }
    handlePost(e) {
        e.preventDefault();
        axios
            .post("https://si2019siera.herokuapp.com/temeZavrsni/" + this.state.studentId + "/" + this.state.temaId, {
                isStudent: this.state.studentId,
                idTema: this.state.temaId
            })

            .then(res => {
                if (res.data.success && res.data.userAutorizacija) {
                    //radi sta hoces
                    this.setState({
                        msg: "",
                        OK: true
                    })

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
                this.handlePotvrda();
            })
            .catch(res => {
                console.log("greska u postu: " + res.data);
            });
    }
    handleGet = () => {
        axios
            .get("https://si2019siera.herokuapp.com/profesori")
            .then(res => {
                this.setState(
                    {
                        profesori: res.data.data,
                        profId: res.data.data[0].id,
                        selProf: res.data.data[0]
                    });
            })
            .catch(res => {
                console.log("Doslo je do greske! " + res.data);
            });
        //teme koje se vezu za 1 mentora
        axios
            .get("https://si2019siera.herokuapp.com/profesori/temeZavrsni/" + this.state.profId + "/" + this.state.studentId)
            .then(res => {
                console.log("res.data.data iz temeZavrsni: " + res.data.data)
                this.setState({
                    teme: res.data.data
                });
                if (this.state.teme.length == 0) {
                    this.setState({
                        temaId: null,
                        selTema: null
                    })
                }
                else {
                    this.setState({
                        temaId: res.data.data[0].id,
                        selTema: res.dara.data[0].naziv
                    })
                }
            })
            .catch(
                res => {
                    console.log("nesto ne valja");
                    console.log(res.error);
                }
            );
    }
    componentDidMount() {
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
                    this.handleGet();
                })
                .catch(res=>{
                    this.props.history.push("/Romeo");
                  })
        }
        else this.handleGet();

    }

    handleChangeProf(selectedId) {
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
                        axios
                        .get("https://si2019siera.herokuapp.com/profesori/temeZavrsni/" + selectedId + "/" + this.state.studentId)
                        .then(res => {
                            this.setState({
                                teme: res.data.data,
                                profId: selectedId
                            });
                            if (this.state.teme.length == 0) {
                                this.setState({
                                    temaId: null
                                })
                            }
                            else {
                                this.setState({
                                    temaId: res.data.data[0].id
                                })
                            }
                        })
                        .catch(
                            res => {
                                console.log("nesto ne valja");
                                console.log(res.error);
                            }
                        );
                    
                })
                .catch(res=>{
                    this.props.history.push("/Romeo");
                  })
        }
        else {
            axios
                .get("https://si2019siera.herokuapp.com/profesori/temeZavrsni/" + selectedId + "/" + this.state.studentId)
                .then(res => {
                    this.setState({
                        teme: res.data.data,
                        profId: selectedId

                    });
                    if (this.state.teme.length == 0) {
                        this.setState({
                            temaId: null
                        })
                    }
                    else {
                        this.setState({
                            temaId: res.data.data[0].id
                        })
                    }

                })
                .catch(
                    res => {
                        console.log("nesto ne valja");
                        console.log(res.error);
                    }
                );
        }


    }
    handleClick() {
        this.validateTema(this.state.temaId);
        this.otvori();

    }
    validateTema(id) {
        if (id == null) {
            this.setState({
                selectClass: "custom-select form-control is-invalid",
                greskaVisible: "visible"
            })
        }
        else {
            this.setState({
                selectClass: "custom-select",
                greskaVisible: "hidden"
            })
        }
    }
    handlePotvrda = () => {
        if (this.state.OK) {
            this.setState({
                greskaVisible: "hidden",
                succVisible: "visible"
            })

        }
        else this.setState({
            greskaVisible: "visible",
            succVisible: "hidden"
        })
    }
    render() {
        let zatvoriModal = () => this.setState({ otvori: false });
        return (
            <>
                <div className="container-fluid" style={{ marginTop: "30px" }}>

                    <h2 style={{ marginBottom: "30px" }}>Završni rad</h2>
                    <div className="card align-items-center">
                        <div className="card-body" style={{ minWidth: "100%" }}>
                            <div className="row justify-content-lg-around justify-content-md-center">
                                <div className="col-lg-4 col-sm-12 col-md-6 justify-content-sm-center ">
                                    <h4 className="card-title">Prijava završnog rada</h4>
                                    <h6 className="card-subtitle mb-2 text-muted">Ovdje možete vidjeti sve profesore koje možete odabrati za svog mentora, kao i teme koje nude.</h6>
                                    <div style={{ textAlign: "left" }}>
                                        <label className="col-form-label col-form-label-lg" htmlFor="inputLarge">Mentori</label>
                                    </div>

                                    <select className="custom-select" onChange={event => { this.handleChangeProf(event.target.value) }}>
                                        {this.state.profesori.map(
                                            (prof) =>
                                                <option key={prof.id} value={prof.id}>{prof.ime} {prof.prezime}</option>

                                        )}
                                    </select>

                                    <div style={{ textAlign: "left" }}>
                                        <label className="col-form-label col-form-label-lg" htmlFor="inputLarge">Teme</label>
                                    </div>
                                    <select className={this.state.selectClass} onChange={event => { this.validateTema(event.target.value) }} >

                                        {this.state.teme.map(
                                            (teme) =>
                                                <option key={teme.id} value={teme.id}>{teme.naziv}</option>
                                        )}
                                    </select>

                                    <div className="invalid-feedback" style={{ visibility: this.state.greskaVisible }}>Morate odabrati temu!</div>
                                    <div></div>
                                    <div className="d-flex align-items-end" style={{ flexDirection: "column" }}>
                                        <button type="button" className="btn btn-primary" style={{ marginTop: "20px" }} onClick={this.handleClick}>Prijavi završni</button>
                                    </div>
                                    {this.state.OK ? "" : <div className="invalid-feedback" style={{ marginTop: "10px" }}>{this.state.msg}</div>}

                                    <hr></hr>
                                    <h4 className="card-title">Status</h4>
                                    <div className="d-flex align-items-end" style={{ flexDirection: "column" }}>
                                        <PrikaziStatus />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={this.state.otvori}
                    onHide={zatvoriModal}
                >

                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Prijava završnog rada
                </Modal.Title>
                    </Modal.Header>
                    <form onSubmit={this.handlePost}>
                        <Modal.Body>
                            <h4>Da li ste sigurni da želite prijaviti završni rad?</h4>
                            <div className="form-group">
                                <div className="form-group">
                                    <label className="col-form-label" htmlFor="inputDefault">Mentor: {this.state.selProf}</label>
                                    <br></br>
                                    <label className="col-form-label" htmlFor="inputDefault">Tema: {this.state.selTema}</label>
                                </div>
                                <div className="valid-feedback" style={{ visibility: this.state.succVisible }} >Zahtjev je uspješno poslan.</div>
                                <div className="invalid-feedback" style={{ visibility: this.state.greskaVisible }}>Došlo je do greške!</div>
                            </div>

                        </Modal.Body>
                        <Modal.Footer>
                            <button type="submit" id="spasiBtn" className="btn btn-primary">Potvrdi</button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </>

        );
    }
}

export default withRouter(DropDownZavrsni);
