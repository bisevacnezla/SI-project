import React, { Component } from 'react';
import axios from 'axios';
import "./bootstrap.min.css";

import ListaTrenutnihPredmeta from "./listaTrenutnihPredmeta";
import ListaOdslusanihPredmeta from "./listaOdslusanihPredmeta";

class Predmeti extends Component {
    state = {
        vidljiv: false,
        znak: "+"
    }

    toggle() {
        this.setState({
            vidljiv: !this.state.vidljiv,
            znak: !this.state.vidljiv ? "-" : "+"
        });
    }

    render() {
        return (
            <div className="container-fluid" style={{ marginTop: "30px" }}>
                <h2 style={{ marginBottom: "30px" }}>Predmeti</h2>
                <div className="d-flex align-items-center" style={{ flexDirection: "column" }}>
                    <div className="row">
                        <div className="col-lg-12 col-md align-self-stretch" style={{ boxSizing: "border-box", padding: "10px" }}>
                            <div className="d-flex justify-content-start">
                                <h4>Lista trenutnih predmeta</h4>
                            </div>
                            <div className="d-flex justify-content-start" style={{ marginLeft: "20px" }}>
                                <ListaTrenutnihPredmeta />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 col-md align-self-stretch" style={{ boxSizing: "border-box", padding: "10px" }}>
                            <div className="d-flex justify-content-start">
                                <input
                                    type="button"
                                    className="btn btn-primary btn-sm"
                                    onClick={() => this.toggle()}
                                    value={this.state.znak}
                                    style={{ marginBottom: "8px", marginRight: "4px" }}
                                />
                                <h4>Lista odslusanih predmeta</h4>
                            </div>
                            <div className="d-flex justify-content-start" style={{ marginLeft: "20px" }}>
                                {this.state.vidljiv ? <ListaOdslusanihPredmeta /> : ""}
                            </div>
                        </div>
                    </div>
                </div>
            </div>);
    }
}

export default Predmeti;